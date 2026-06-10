import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted")
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookiesAccepted", "true")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={s.banner}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div style={s.inner}>
            <div style={s.text}>
              <p style={s.title}>🍪 Usamos cookies</p>
              <p style={s.sub}>
                Guardamos tu sesión y carrito para mejorar tu experiencia. Al continuar aceptás nuestra{" "}
                <Link to="/privacidad" style={s.link}>Política de Privacidad</Link>
                {" "}y los{" "}
                <Link to="/terminos" style={s.link}>Términos y Condiciones</Link>.
              </p>
            </div>
            <div style={s.buttons}>
              <motion.button
                style={s.btnAccept}
                onClick={accept}
                whileHover={{ scale: 1.03, backgroundColor: "#6B4430" }}
                whileTap={{ scale: 0.97 }}
              >
                Aceptar
              </motion.button>
              <motion.button
                style={s.btnDecline}
                onClick={accept}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Cerrar
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const s = {
  banner: {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "clamp(300px, 90vw, 680px)",
    backgroundColor: "white",
    borderRadius: "18px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
    zIndex: 9998,
    border: "1px solid #EDE4D9"
  },
  inner: {
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap"
  },
  text: { flex: 1, minWidth: "200px" },
  title: { fontWeight: "700", color: "#3E2C23", fontSize: "15px", marginBottom: "4px" },
  sub: { color: "#888", fontSize: "13px", lineHeight: "1.6" },
  link: { color: "#8B5E3C", fontWeight: "600", textDecoration: "underline" },
  buttons: { display: "flex", gap: "10px", flexShrink: 0 },
  btnAccept: {
    padding: "10px 22px",
    backgroundColor: "#8B5E3C",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit"
  },
  btnDecline: {
    padding: "10px 22px",
    backgroundColor: "#F5EEE6",
    color: "#3E2C23",
    border: "none",
    borderRadius: "50px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit"
  }
}