import { useState } from "react"
import { motion } from "framer-motion"
import ProductCard from "../components/ProductCard"
import useProducts from "../hooks/useProducts"
import FiltersPanel from "../components/FiltersPanel"
import { ProductCardSkeleton } from "../components/Skeleton"

function ProductsPage() {
  const { products: productsData, loading } = useProducts()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const productsPerPage = 24
  const isMobile = window.innerWidth < 768

  if (loading) return (
    <div style={styles.container}>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ height: "40px", width: "250px", backgroundColor: "#E8E0D8", borderRadius: "8px", margin: "0 auto 40px" }}
      />
      <div style={styles.content}>
        <div style={{ width: isMobile ? "100%" : "220px", flexShrink: 0 }}>
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ height: "300px", backgroundColor: "#E8E0D8", borderRadius: "16px" }} />
        </div>
        <div style={{ ...styles.grid, flex: 1 }}>
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  )

  let filteredProducts = [...productsData]
  if (minPrice !== "") filteredProducts = filteredProducts.filter(p => p.precio >= Number(minPrice))
  if (maxPrice !== "") filteredProducts = filteredProducts.filter(p => p.precio <= Number(maxPrice))
  if (sortBy === "low-high") filteredProducts.sort((a, b) => a.precio - b.precio)
  if (sortBy === "high-low") filteredProducts.sort((a, b) => b.precio - a.precio)
  if (sortBy === "newest") filteredProducts.reverse()
  if (sortBy === "oldest") filteredProducts.sort((a, b) => a.id - b.id)

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <motion.div style={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 style={styles.title}>Todos los productos</h1>
      <p style={styles.count}>{filteredProducts.length} productos encontrados</p>

      <div style={styles.content}>
        <FiltersPanel sortBy={sortBy} setSortBy={setSortBy} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />

        <div style={{ flex: 1 }}>
          <div style={styles.grid}>
            {currentProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <motion.button
                style={{ ...styles.pageButton, opacity: currentPage === 1 ? 0.4 : 1 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >←</motion.button>

              <span style={styles.pageText}>{currentPage} / {totalPages}</span>

              <motion.button
                style={{ ...styles.pageButton, opacity: currentPage === totalPages ? 0.4 : 1 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >→</motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const isMobile = window.innerWidth < 768

const styles = {
  container: { padding: isMobile ? "20px 16px" : "40px", backgroundColor: "#F8F5F2", minHeight: "100vh" },
  title: { textAlign: "center", marginBottom: "8px", color: "#3E2C23", fontSize: isMobile ? "28px" : "36px", fontWeight: "700" },
  count: { textAlign: "center", color: "#888", fontSize: "14px", marginBottom: "32px" },
  content: { display: "flex", gap: isMobile ? "8px" : "35px", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" },
  grid: { display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(180px, 1fr))", gap: isMobile ? "12px" : "25px", width: "100%", justifyItems: "center",},
  pagination: { display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "50px" },
  pageButton: { width: "45px", height: "45px", borderRadius: "50%", border: "none", backgroundColor: "#8B5E3C", color: "white", cursor: "pointer", fontSize: "20px" },
  pageText: { fontSize: "16px", fontWeight: "600", color: "#3E2C23" }
}

export default ProductsPage