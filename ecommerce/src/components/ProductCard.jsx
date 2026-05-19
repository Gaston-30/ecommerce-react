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

        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow:
          "0 18px 40px rgba(0,0,0,0.12)"
        }}
      >

        <motion.img
          src={product.imagen}
          alt={product.nombre}
          style={styles.image}
          whileHover={{
            scale: 1.08
          }}

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

            whileHover={{
            scale: 1.04
            }}

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

const styles = {

  link: {
    textDecoration: "none",
    color: "black"
  },

  card: {
    width:
    window.innerWidth < 768
      ? "100%"
      : "240px",
    backgroundColor: "white",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
    transition: "0.3s",
    cursor: "pointer"
  },

  image: {
    width: "100%",
    height:
    window.innerWidth < 768
      ? "180px"
      : "260px",
    objectFit: "cover"
  },

  info: {
    padding: "18px"
  },

  title: {
    color: "#3E2C23",
    marginBottom: "10px"
  },

  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#8B5E3C"
  },

  button: {
    marginTop: "15px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#8B5E3C",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  }

}

export default ProductCard