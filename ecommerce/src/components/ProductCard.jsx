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

        whileHover={{
          y: -10,
          scale: 1.02
        }}

        transition={{
          duration: 0.3
        }}
      >

        <img
          src={product.imagen}
          alt={product.nombre}
          style={styles.image}
        />

        <div style={styles.info}>

          <h3 style={styles.title}>
            {product.nombre}
          </h3>

          <p style={styles.price}>
            ${product.precio}
          </p>

          <button
            style={styles.button}
          >

            Ver detalle

          </button>

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
      "0 4px 15px rgba(0,0,0,0.08)",
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