import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function CheckoutPending() {
  return (
    <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={styles.card}>
        <span style={{ fontSize: "60px" }}>⏳</span>
        <h1 style={styles.title}>Pago pendiente</h1>
        <p style={styles.subtitle}>Tu pago está siendo procesado. Te avisaremos por correo cuando se confirme.</p>
        <Link to="/" style={styles.btn}>Volver al inicio</Link>
      </div>
    </motion.div>
  )
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F8F5F2", padding: "20px" },
  card: { backgroundColor: "white", borderRadius: "24px", padding: "48px 40px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", maxWidth: "440px", width: "100%", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" },
  title: { fontSize: "32px", fontWeight: "700", color: "#3E2C23" },
  subtitle: { fontSize: "16px", color: "#666", lineHeight: "1.6" },
  btn: { display: "inline-block", padding: "14px 32px", backgroundColor: "#8B5E3C", color: "white", borderRadius: "50px", textDecoration: "none", fontWeight: "600", fontSize: "16px" }
}

export default CheckoutPending