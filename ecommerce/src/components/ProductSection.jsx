import { useState } from "react"
import { motion } from "framer-motion"
import ProductCard from "./ProductCard"

function ProductSection({ title, products }) {

  const [startIndex, setStartIndex] =
    useState(0)

  const isMobile =
    window.innerWidth <= 768

  const visibleProducts = isMobile

    ? products

    : products.slice(
        startIndex,
        startIndex + 3
      )

  const nextProducts = () => {

    if (startIndex + 3 < products.length) {

      setStartIndex(startIndex + 1)
    }
  }

  const prevProducts = () => {

    if (startIndex > 0) {

      setStartIndex(startIndex - 1)
    }
  }

  return (

    <motion.section

      style={styles.section}

      initial={{
        opacity: 0,
        y: 50
      }}

      whileInView={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.8
      }}

      viewport={{
        once: true
      }}
    >

      <h2 style={styles.title}>
        {title}
      </h2>

      <div style={styles.carouselContainer}>

        {!isMobile && (

          <button
            onClick={prevProducts}
            style={styles.arrow}
          >

            ←

          </button>

        )}

        <div style={styles.productsContainer}>

          {visibleProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

        {!isMobile && (

          <button
            onClick={nextProducts}
            style={styles.arrow}
          >

            →

          </button>

        )}

      </div>

    </motion.section>
  )
}

const styles = {

  section: {

    padding: "70px 20px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center"
  },

  title: {

    fontSize: "34px",

    marginBottom: "40px",

    fontWeight: "600",

    color: "#3E2C23",

    textAlign: "center"
  },

  carouselContainer: {

    display: "flex",

    alignItems: "center",

    gap: "25px",

    width: "100%"
  },

  productsContainer: {

    display: "flex",

    gap: "20px",

    overflowX: "auto",

    scrollBehavior: "smooth",

    paddingBottom: "10px",

    width: "100%",

    scrollbarWidth: "none",

    flexWrap: "nowrap",
  },

  arrow: {

    width: "50px",

    height: "50px",

    borderRadius: "50%",

    border: "none",

    backgroundColor: "#D6B79A",

    color: "#3E2C23",

    fontSize: "22px",

    cursor: "pointer",

    transition: "0.3s",

    boxShadow:
      "0 2px 8px rgba(0,0,0,0.15)"
  }
}

export default ProductSection