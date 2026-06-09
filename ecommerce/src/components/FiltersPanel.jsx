import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function FiltersPanel({ sortBy, setSortBy, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  const isMobile = window.innerWidth < 768
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div style={{ width: isMobile ? "100%" : "260px", flexShrink: 0 }}>

      {isMobile && (
        <motion.button
          style={styles.toggleButton}
          onClick={() => setShowFilters(!showFilters)}
          whileTap={{ scale: 0.97 }}
          whileHover={{ backgroundColor: "#C9A882" }}
        >
          Filtros {showFilters ? "▲" : "▼"}
        </motion.button>
      )}

      <AnimatePresence>
        {(!isMobile || showFilters) && (
          <motion.div
            style={styles.filters}
            initial={isMobile ? { opacity: 0, y: -8 } : false}
            animate={isMobile ? { opacity: 1, y: 0 } : {}}
            exit={isMobile ? { opacity: 0, y: -8 } : {}}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <h3 style={{ color: "#3E2C23", fontSize: "16px", fontWeight: "700", margin: 0 }}>
              Filtros
            </h3>

            <select
              style={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Ordenar por</option>
              <option value="low-high">Menor precio</option>
              <option value="high-low">Mayor precio</option>
              <option value="newest">Más nuevos</option>
              <option value="oldest">Más viejos</option>
            </select>

            <input
              type="number"
              placeholder="Precio mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={styles.input}
            />

            <input
              type="number"
              placeholder="Precio máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={styles.input}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const isMobile = window.innerWidth < 768

const styles = {
  toggleButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#D6B79A",
    color: "#3E2C23",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    fontFamily: "inherit",
    marginBottom: "6px"
  },
  filters: {
    width: "100%",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: isMobile ? "relative" : "sticky",
    top: isMobile ? "0" : "120px",
    zIndex: 10,
    boxSizing: "border-box"
  },
  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #E0D5CC",
    fontSize: "14px",
    color: "#3E2C23",
    outline: "none",
    backgroundColor: "#FAFAF8",
    fontFamily: "inherit"
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #E0D5CC",
    fontSize: "14px",
    color: "#3E2C23",
    outline: "none",
    backgroundColor: "#FAFAF8",
    fontFamily: "inherit"
  }
}

export default FiltersPanel