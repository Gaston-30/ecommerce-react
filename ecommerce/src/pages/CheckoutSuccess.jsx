import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useCart } from "../context/CartContext"

function CheckoutSuccess() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={styles.card}
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          style={styles.iconWrapper}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <span style={{ fontSize: "60px" }}>✅</span>
        </motion.div>
        <h1 style={styles.title}>¡Pago exitoso!</h1>
        <p style={styles.subtitle}>Tu pedido fue confirmado. Te enviamos un correo con los detalles.</p>
        <p style={styles.info}>Nos pondremos en contacto para coordinar el envío.</p>
        <Link to="/" style={styles.btn}>Volver al inicio</Link>
      </motion.div>
    </motion.div>
  )
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F8F5F2", padding: "20px" },
  card: { backgroundColor: "white", borderRadius: "24px", padding: "48px 40px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", maxWidth: "440px", width: "100%" },
  iconWrapper: { marginBottom: "20px" },
  title: { fontSize: "32px", fontWeight: "700", color: "#3E2C23", marginBottom: "12px" },
  subtitle: { fontSize: "16px", color: "#666", lineHeight: "1.6", marginBottom: "8px" },
  info: { fontSize: "14px", color: "#888", marginBottom: "32px" },
  btn: { display: "inline-block", padding: "14px 32px", backgroundColor: "#8B5E3C", color: "white", borderRadius: "50px", textDecoration: "none", fontWeight: "600", fontSize: "16px" }
}

export default CheckoutSuccess