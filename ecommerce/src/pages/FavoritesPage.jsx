import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import { PageSkeleton } from "../components/Skeleton"

function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites()
  const isMobile = window.innerWidth < 768

  return (
    <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <h1 style={styles.title}>⭐ Mis favoritos</h1>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.empty}
        >
          <span style={{ fontSize: "60px" }}>🤍</span>
          <h2 style={{ color: "#3E2C23", marginTop: "16px" }}>No tenés favoritos todavía</h2>
          <p style={{ color: "#888", marginTop: "8px" }}>Explorá nuestros productos y guardá los que más te gusten</p>
          <Link to="/products" style={styles.emptyBtn}>Ver productos</Link>
        </motion.div>
      ) : (
        <AnimatePresence>
          {favorites.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              style={styles.card}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "flex", gap: "20px", flex: 1, alignItems: "center", flexDirection: isMobile ? "column" : "row" }}>
                <img src={product.imagenes?.[0]} alt={product.nombre} style={styles.image} />
                <div style={styles.info}>
                  <h2 style={{ color: "#3E2C23", fontSize: isMobile ? "16px" : "20px" }}>{product.nombre}</h2>
                  <p style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>{product.categoria}</p>
                  <p style={styles.price}>${product.precio.toLocaleString()}</p>
                </div>
              </Link>

              <motion.button
                style={styles.removeButton}
                onClick={() => removeFromFavorites(product.id)}
                whileHover={{ scale: 1.05, backgroundColor: "#e53e3e", color: "white" }}
                whileTap={{ scale: 0.95 }}
              >
                🗑️ Eliminar
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

const isMobile = window.innerWidth < 768

const styles = {
  page: { padding: isMobile ? "20px 16px" : "40px", maxWidth: "900px", margin: "0 auto", minHeight: "70vh" },
  title: { marginBottom: "30px", color: "#3E2C23", textAlign: isMobile ? "center" : "left", fontSize: isMobile ? "28px" : "36px", fontWeight: "700" },
  card: {
    display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center",
    gap: "20px", backgroundColor: "#fff", padding: isMobile ? "16px" : "20px",
    borderRadius: "16px", marginBottom: "16px", boxShadow: "0 2px 15px rgba(0,0,0,0.06)",
    textAlign: isMobile ? "center" : "left"
  },
  image: { width: isMobile ? "100%" : "120px", maxWidth: isMobile ? "300px" : "120px", height: isMobile ? "200px" : "120px", objectFit: "cover", borderRadius: "12px", flexShrink: 0 },
  info: { flex: 1 },
  price: { fontSize: "22px", fontWeight: "700", color: "#8B5E3C", marginTop: "8px" },
  removeButton: { padding: "10px 18px", border: "1px solid #D6B79A", borderRadius: "10px", backgroundColor: "transparent", color: "#8B5E3C", cursor: "pointer", fontSize: "14px", fontWeight: "500", transition: "0.2s", whiteSpace: "nowrap" },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" },
  emptyBtn: { marginTop: "24px", padding: "14px 32px", backgroundColor: "#8B5E3C", color: "white", borderRadius: "50px", textDecoration: "none", fontWeight: "600", fontSize: "15px" }
}

export default FavoritesPage