import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

function ProductCard({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const isMobile = window.innerWidth <= 768

  return (
    <Link to={`/product/${product.id}`} style={styles.link}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        viewport={{ once: true }}
        whileHover={!isMobile ? { y: -8, scale: 1.02, boxShadow: "0 18px 40px rgba(0,0,0,0.12)" } : {}}
      >
        <div style={styles.imageWrapper}>
          {/* SKELETON mientras carga */}
          {!imgLoaded && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={styles.imageSkeleton}
            />
          )}
          <motion.img
            src={product.imagenes?.[0]}
            alt={product.nombre}
            style={{ ...styles.image, opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
            whileHover={!isMobile ? { scale: 1.08 } : {}}
            transition={{ duration: 0.3 }}
          />
          <span style={{
            ...styles.badge,
            backgroundColor: product.stock > 0 ? "rgba(255,255,255,0.9)" : "rgba(220,50,50,0.85)",
            color: product.stock > 0 ? "#4A7C2F" : "white"
          }}>
            {product.stock > 0 ? "✓ En stock" : "Sin stock"}
          </span>
        </div>

        <div style={styles.info}>
          <h3 style={styles.title}>{product.nombre}</h3>
          <p style={styles.price}>${product.precio.toLocaleString()}</p>
          <motion.button
            style={styles.button}
            whileHover={!isMobile ? { scale: 1.04, backgroundColor: "#6B4430" } : {}}
            whileTap={{ scale: 0.96 }}
          >
            Ver detalle
          </motion.button>
        </div>
      </motion.div>
    </Link>
  )
}

const isMobile = window.innerWidth <= 768

const styles = {
  link: {
    textDecoration: "none",
    color: "black",
    display: "block",
    width: isMobile ? "160px" : "240px",
    flexShrink: 0
  },
  card: {
    width: isMobile ? "160px" : "240px",
    minWidth: isMobile ? "160px" : "240px",
    maxWidth: isMobile ? "160px" : "240px",
    backgroundColor: "white",
    borderRadius: "18px",
    overflow: "hidden",
    boxSizing: "border-box",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    transition: "0.3s",
    cursor: "pointer",
    flexShrink: 0
  },
  imageWrapper: {
    position: "relative",
    overflow: "hidden",
    height: isMobile ? "160px" : "260px",
  },
  imageSkeleton: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#E8E0D8"
  },
  image: {
    width: "100%",
    height: isMobile ? "160px" : "260px",
    objectFit: "cover",
    transition: "opacity 0.3s"
  },
  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#8B5E3C",
    fontSize: "10px",
    fontWeight: "600",
    padding: "4px 8px",
    borderRadius: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backdropFilter: "blur(4px)"
  },
  info: { padding: "18px" },
  title: {
    color: "#3E2C23",
    marginBottom: "10px",
    fontSize: isMobile ? "14px" : "18px"
  },
  price: {
    fontSize: isMobile ? "15px" : "18px",
    fontWeight: "bold",
    color: "#8B5E3C"
  },
  button: {
    marginTop: "15px",
    padding: isMobile ? "10px" : "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#8B5E3C",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
    width: "100%",
    fontSize: isMobile ? "13px" : "15px"
  }
}

export default ProductCard