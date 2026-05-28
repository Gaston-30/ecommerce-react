import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Link } from "react-router-dom"

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const isMobile = window.innerWidth < 768

  return (
    <section ref={ref} style={styles.hero}>

      {/* FONDO CON PARALLAX */}
      <motion.div style={{ ...styles.background, y }} />

      {/* OVERLAY OSCURO */}
      <div style={styles.darkOverlay} />

      {/* CONTENIDO */}
      <motion.div style={{ ...styles.content, opacity }}>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={styles.eyebrow}
        >
          ✦ Nueva colección 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          style={styles.title}
        >
          Deco <br />
          <span style={styles.titleAccent}>&amp; Hogar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={styles.subtitle}
        >
          Diseño cálido para transformar tus espacios
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          style={styles.buttons}
        >
          <Link to="/products" style={styles.btnPrimary}>
            Ver productos
          </Link>
          <Link to="/contacto" style={styles.btnSecondary}>
            Contactanos
          </Link>
        </motion.div>

      </motion.div>

      {/* SCROLL INDICATOR */}
      {!isMobile && (
        <motion.div
          style={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            style={styles.scrollDot}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      )}

      {/* DECORATIVE SHAPE */}
      <div style={styles.bottomShape} />

    </section>
  )
}

const isMobile = window.innerWidth < 768

const styles = {
  hero: {
    height: isMobile ? "85vh" : "92vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative"
  },
  background: {
    position: "absolute",
    inset: "-20%",
    backgroundImage: "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    scale: 1.1
  },
  darkOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(30,15,8,0.75) 0%, rgba(62,44,35,0.55) 60%, rgba(139,94,60,0.3) 100%)"
  },
  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    color: "white",
    padding: isMobile ? "0 24px" : "0 40px",
    maxWidth: "800px"
  },
  eyebrow: {
    fontSize: isMobile ? "12px" : "13px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#D6B79A",
    fontWeight: "500",
    display: "block",
    marginBottom: "20px"
  },
  title: {
    fontSize: isMobile ? "64px" : "110px",
    fontWeight: "700",
    lineHeight: "0.95",
    letterSpacing: "-2px",
    margin: "0 0 24px",
    textShadow: "0 4px 30px rgba(0,0,0,0.3)"
  },
  titleAccent: {
    color: "#D6B79A",
    fontStyle: "italic",
    fontWeight: "300"
  },
  subtitle: {
    fontSize: isMobile ? "16px" : "20px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.6",
    marginBottom: "40px",
    fontWeight: "300"
  },
  buttons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  btnPrimary: {
    padding: isMobile ? "14px 28px" : "16px 40px",
    backgroundColor: "#8B5E3C",
    color: "white",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    transition: "0.3s",
    boxShadow: "0 8px 25px rgba(139,94,60,0.4)"
  },
  btnSecondary: {
    padding: isMobile ? "14px 28px" : "16px 40px",
    backgroundColor: "transparent",
    color: "white",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "500",
    border: "1px solid rgba(255,255,255,0.5)",
    transition: "0.3s"
  },
  scrollIndicator: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "24px",
    height: "40px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    paddingTop: "6px"
  },
  scrollDot: {
    width: "4px",
    height: "8px",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "2px"
  },
  bottomShape: {
    position: "absolute",
    bottom: "-2px",
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#F8F5F2",
    clipPath: "ellipse(55% 100% at 50% 100%)"
  }
}

export default Hero