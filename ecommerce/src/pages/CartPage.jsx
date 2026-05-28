import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import useShipping from "../hooks/useShipping"
import { useAuth } from "../context/AuthContext"

function CartPage() {
  const [error, setError] = useState(false)
  const { cartItems, subtotal, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const { user } = useAuth()
  const { zona } = useShipping()
  const shipping = zona ? zona.costo : (subtotal > 0 ? 3500 : 0)
  const total = subtotal + shipping
  const navigate = useNavigate()
  const isMobile = window.innerWidth <= 768

  return (
    <motion.div
      style={{ ...styles.page, paddingBottom: isMobile ? "220px" : "40px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div style={styles.left}>
        <h1 style={styles.title}>🛒 Mi carrito</h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.empty}
          >
            <span style={{ fontSize: "60px" }}>🛒</span>
            <h2 style={{ color: "#3E2C23", marginTop: "16px" }}>Tu carrito está vacío</h2>
            <p style={{ color: "#888", marginTop: "8px" }}>Agregá productos para comenzar tu compra</p>
            <Link to="/products" style={styles.emptyBtn}>Ver productos</Link>
          </motion.div>
        ) : (
          <AnimatePresence>
            {cartItems.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                style={styles.card}
              >
                <img src={product.imagenes?.[0]} alt={product.nombre} style={styles.image} />

                <div style={styles.info}>
                  <h2 style={{ color: "#3E2C23", fontSize: isMobile ? "16px" : "18px" }}>{product.nombre}</h2>
                  <p style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>Color: Beige</p>

                  <div style={styles.quantity}>
                    <motion.button
                      style={styles.qtyButton}
                      onClick={() => decreaseQuantity(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >-</motion.button>
                    <span style={{ fontWeight: "600", minWidth: "24px", textAlign: "center" }}>
                      {product.quantity}
                    </span>
                    <motion.button
                      style={styles.qtyButton}
                      onClick={() => increaseQuantity(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >+</motion.button>
                  </div>

                  <motion.button
                    style={styles.removeButton}
                    onClick={() => removeFromCart(product.id)}
                    whileHover={{ color: "#e53e3e" }}
                  >
                    🗑️ Eliminar
                  </motion.button>
                </div>

                <h2 style={styles.price}>
                  ${(product.precio * product.quantity).toLocaleString()}
                </h2>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {cartItems.length > 0 && (
        <div style={isMobile ? styles.mobileSummary : styles.summary}>
          <h2 style={{ color: "#3E2C23", marginBottom: "20px" }}>Resumen</h2>

          <div style={styles.row}>
            <span style={{ color: "#666" }}>Productos</span>
            <span style={{ fontWeight: "600" }}>${subtotal.toLocaleString()}</span>
          </div>

          <div style={styles.row}>
            <span style={{ color: "#666" }}>Envío</span>
            <span style={{ textAlign: "right", maxWidth: "60%", fontSize: "14px", color: "#666" }}>
              {zona
                ? `$${zona.costo.toLocaleString()} · ${zona.nombre}`
                : user
                  ? "Se calcula en el checkout"
                  : "Ingresá tu CP en el checkout"
              }
            </span>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.06)", margin: "16px 0" }} />

          <div style={styles.row}>
            <strong style={{ fontSize: "18px", color: "#3E2C23" }}>Total</strong>
            <strong style={{ fontSize: "20px", color: "#8B5E3C" }}>${total.toLocaleString()}</strong>
          </div>

          <motion.button
            style={styles.checkoutButton}
            onClick={() => navigate("/checkout/confirm")}
            whileHover={{ scale: 1.02, backgroundColor: "#6B4430" }}
            whileTap={{ scale: 0.97 }}
          >
            Confirmar compra
          </motion.button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.errorText}
            >
              Añadí productos al carrito
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  )
}

const isMobile = window.innerWidth < 768

const styles = {
  page: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "40px",
    padding: isMobile ? "20px 16px" : "40px",
    alignItems: "flex-start",
    backgroundColor: "#F8F5F2",
    minHeight: "100vh"
  },
  left: { flex: 3, width: "100%" },
  title: {
    marginBottom: "30px",
    color: "#3E2C23",
    fontSize: isMobile ? "28px" : "36px",
    fontWeight: "700",
    textAlign: isMobile ? "center" : "left"
  },
  card: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "center" : "center",
    textAlign: isMobile ? "center" : "left",
    gap: "20px",
    backgroundColor: "#fff",
    padding: isMobile ? "16px" : "20px",
    borderRadius: "16px",
    marginBottom: "16px",
    boxShadow: "0 2px 15px rgba(0,0,0,0.06)",
    width: "100%",
    boxSizing: "border-box"
  },
  image: {
    width: isMobile ? "100%" : "130px",
    maxWidth: isMobile ? "300px" : "130px",
    height: isMobile ? "200px" : "130px",
    objectFit: "cover",
    borderRadius: "12px",
    flexShrink: 0
  },
  info: { flex: 1, width: "100%" },
  quantity: { display: "flex", alignItems: "center", gap: "14px", marginTop: "14px", justifyContent: isMobile ? "center" : "flex-start" },
  qtyButton: {
    width: "32px", height: "32px", border: "none", borderRadius: "8px",
    backgroundColor: "#F8F5F2", cursor: "pointer", fontSize: "18px",
    fontWeight: "600", color: "#3E2C23"
  },
  removeButton: {
    marginTop: "12px", border: "none", background: "none",
    color: "#8B5E3C", cursor: "pointer", fontSize: "14px", fontWeight: "500"
  },
  price: { color: "#8B5E3C", fontSize: "20px", fontWeight: "700", alignSelf: "center" },
  summary: {
    flex: 1, position: "sticky", top: "100px",
    backgroundColor: "#fff", padding: "28px",
    borderRadius: "16px", boxShadow: "0 2px 15px rgba(0,0,0,0.06)"
  },
  mobileSummary: {
    position: "fixed", bottom: 0, left: 0, width: "100%",
    backgroundColor: "white", padding: "20px",
    boxShadow: "0 -2px 20px rgba(0,0,0,0.1)",
    borderTopLeftRadius: "20px", borderTopRightRadius: "20px",
    zIndex: 999, boxSizing: "border-box"
  },
  row: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", margin: "12px 0", gap: "10px"
  },
  checkoutButton: {
    width: "100%", marginTop: "20px", padding: "16px",
    border: "none", borderRadius: "12px",
    backgroundColor: "#8B5E3C", color: "white",
    fontSize: "16px", fontWeight: "600", cursor: "pointer"
  },
  errorText: { color: "#e53e3e", marginTop: "10px", textAlign: "center", fontSize: "14px" },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 20px", textAlign: "center" },
  emptyBtn: {
    marginTop: "24px", padding: "14px 32px",
    backgroundColor: "#8B5E3C", color: "white",
    borderRadius: "50px", textDecoration: "none",
    fontWeight: "600", fontSize: "15px"
  }
}

export default CartPage