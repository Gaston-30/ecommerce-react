import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function ProductCard({ product }) {

  return (

    <Link
      to={`/product/${product.id}`}
      style={styles.link}
    >

      <motion.div

        style={styles.card}

        initial={{ opacity: 0, y: 20 }}

        whileInView={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.25 }}

        viewport={{ once: true }}

        whileHover={
          !isMobile
            ? {
                y: -8,
                scale: 1.02,
                boxShadow:
                  "0 18px 40px rgba(0,0,0,0.12)"
              }
            : {}
        }
      >

        <motion.img
          src={product.imagenes?.[0]}
          alt={product.nombre}
          style={styles.image}
          whileHover={
            !isMobile
              ? { scale: 1.08 }
              : {}
          }       

          transition={{
            duration: 0.3
          }}
        />

        <div style={styles.info}>

          <h3 style={styles.title}>
            {product.nombre}
          </h3>

          <p style={styles.price}>
            ${product.precio}
          </p>

          <motion.button
            style={styles.button}

            whileHover={
              !isMobile
                ? { scale: 1.04 }
                : {}
            }

            whileTap={{
              scale: 0.96
            }}
          >

            Ver detalle

          </motion.button>

        </div>

      </motion.div>

    </Link>
  )
}

const isMobile =
  window.matchMedia("(max-width: 768px)").matches

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
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
    transition: "0.3s",
    cursor: "pointer",
    flexShrink: 0
  },

  image: {
    width: "100%",
    height:
      isMobile
        ? "160px"
        : "260px",
    objectFit: "cover"
  },

  info: {
    padding: "18px"
  },

  title: {
    color: "#3E2C23",
    marginBottom: "10px",
    fontSize:
      isMobile
        ? "14px"
        : "18px"
  },

  price: {
    fontSize:
      isMobile
        ? "15px"
        : "18px",
    fontWeight: "bold",
    color: "#8B5E3C"
  },

  button: {
    marginTop: "15px",
    padding:
      isMobile
        ? "10px"
        : "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#8B5E3C",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
    width: "100%",
    fontSize:
      isMobile
        ? "13px"
        : "15px"
  },

}

export default ProductCard