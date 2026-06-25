import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import ProductCard from "./ProductCard"

function ProductSection({ title, products }) {
  const isMobile = window.innerWidth <= 768
  const scrollRef = useRef(null)
  const [startIndex, setStartIndex] = useState(0)

  // Duplicar productos para scroll infinito en mobile
  const infiniteProducts = isMobile
    ? [...products, ...products, ...products]
    : products

  const visibleProducts = isMobile
    ? infiniteProducts
    : products.slice(startIndex, startIndex + 4)

  useEffect(() => {
    if (!isMobile) return
    const el = scrollRef.current
    if (!el) return

    // Empezar en el medio (segunda copia)
    const cardWidth = 174 // 160px + 14px gap
    el.scrollLeft = cardWidth * products.length

    const handleScroll = () => {
      const total = cardWidth * products.length
      if (el.scrollLeft <= total * 0.5) {
        el.scrollLeft += total
      }
      if (el.scrollLeft >= total * 1.5) {
        el.scrollLeft -= total
      }
    }

    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [products, isMobile])

  const nextProducts = () => {
    if (startIndex + 4 < products.length) setStartIndex(startIndex + 1)
  }
  const prevProducts = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1)
  }

  return (
    <motion.section
      style={styles.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 style={styles.title}>{title}</h2>

      <div style={styles.carouselContainer}>
        {!isMobile && (
          <motion.button
            onClick={prevProducts}
            style={styles.arrow}
            whileHover={{ backgroundColor: "#8B5E3C", color: "white", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18 }}
          >‹</motion.button>
        )}

        <div ref={scrollRef} style={styles.productsContainer}>
          {visibleProducts.map((product, i) => (
            <ProductCard key={`${product.id}-${i}`} product={product} />
          ))}
        </div>

        {!isMobile && (
          <motion.button
            onClick={nextProducts}
            style={styles.arrow}
            whileHover={{ backgroundColor: "#8B5E3C", color: "white", scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18 }}
          >›</motion.button>
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
    width: "100%",
    justifyContent: "center",
  },
  productsContainer: {
    display: "flex",
    gap: "14px",
    overflowX: "auto",
    scrollBehavior: "auto",
    paddingBottom: "10px",
    width: "100%",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    flexWrap: "nowrap",
    justifyContent: "center",
  },
  arrow: {
    width: "32px",
    height: "80px",
    borderRadius: "8px",
    border: "1.5px solid #D6B79A",
    backgroundColor: "white",
    color: "#8B5E3C",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }
}

export default ProductSection