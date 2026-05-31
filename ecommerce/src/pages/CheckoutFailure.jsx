import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

function CheckoutFailure() {
  const navigate = useNavigate()
  return (
    <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={styles.card}>
        <span style={{ fontSize: "60px" }}>❌</span>
        <h1 style={styles.title}>Pago no completado</h1>
        <p style={styles.subtitle}>Hubo un problema con tu pago. Podés intentarlo de nuevo.</p>
        <motion.button style={styles.btn} onClick={() => navigate("/checkout/payment")} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          Intentar de nuevo
        </motion.button>
        <Link to="/cart" style={styles.link}>Volver al carrito</Link>
      </div>
    </motion.div>
  )
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F8F5F2", padding: "20px" },
  card: { backgroundColor: "white", borderRadius: "24px", padding: "48px 40px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", maxWidth: "440px", width: "100%", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" },
  title: { fontSize: "32px", fontWeight: "700", color: "#3E2C23" },
  subtitle: { fontSize: "16px", color: "#666", lineHeight: "1.6" },
  btn: { padding: "14px 32px", backgroundColor: "#8B5E3C", color: "white", border: "none", borderRadius: "50px", fontWeight: "600", fontSize: "16px", cursor: "pointer" },
  link: { color: "#8B5E3C", fontSize: "14px" }
}

export default CheckoutFailure