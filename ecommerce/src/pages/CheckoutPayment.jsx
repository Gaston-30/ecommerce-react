import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import useShipping from "../hooks/useShipping"
import { supabase } from "../supabase"

function CheckoutPayment() {
  const { cartItems, subtotal } = useCart()
  const { user } = useAuth()
  const { zona } = useShipping()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [profile, setProfile] = useState(null)
  const [address, setAddress] = useState(null)
  const isMobile = window.innerWidth <= 768

  const shipping = zona?.costo || 0
  const total = subtotal + shipping

  useEffect(() => {
    if (!user) { navigate("/login"); return }
    if (cartItems.length === 0) { navigate("/cart"); return }

    // Cargar perfil y dirección principal
    supabase.from("profiles").select("*").eq("id", user.id).single()
      .then(({ data }) => setProfile(data))

    supabase.from("addresses").select("*").eq("user_id", user.id).eq("es_principal", true).single()
      .then(({ data }) => setAddress(data))
  }, [user])

  const handlePay = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:3000/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          shipping: shipping,
          buyer: { email: user.email }
        })
      })

      const data = await res.json()

      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        setError("No se pudo iniciar el pago")
      }
    } catch (err) {
      setError("Error al conectar con el servidor de pagos")
    }

    setLoading(false)
  }

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={styles.container}>

        {/* RESUMEN FINAL */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>📦 Resumen del pedido</h2>

          {cartItems.map(item => (
            <div key={item.id} style={styles.itemRow}>
              <img src={item.imagenes?.[0]} alt={item.nombre} style={styles.itemImg} />
              <div style={styles.itemInfo}>
                <p style={styles.itemName}>{item.nombre}</p>
                <p style={styles.itemQty}>x{item.quantity}</p>
              </div>
              <p style={styles.itemPrice}>${(item.precio * item.quantity).toLocaleString()}</p>
            </div>
          ))}

          <hr style={styles.hr} />

          <div style={styles.row}>
            <span style={styles.rowLabel}>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div style={styles.row}>
            <span style={styles.rowLabel}>Envío</span>
            <span>{shipping === 0 ? "A coordinar" : `$${shipping.toLocaleString()}`}</span>
          </div>
          <div style={{ ...styles.row, marginTop: "8px" }}>
            <strong style={{ fontSize: "18px", color: "#3E2C23" }}>Total</strong>
            <strong style={{ fontSize: "22px", color: "#8B5E3C" }}>${total.toLocaleString()}</strong>
          </div>
        </div>

        {/* DIRECCIÓN */}
        {address && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>📍 Dirección de entrega</h2>
            <p style={styles.addressText}>{address.direccion}</p>
            <p style={styles.addressSub}>{address.ciudad} · CP {address.codigo_postal}</p>
            <p style={styles.addressSub}>📞 {address.telefono}</p>
            <button
              style={styles.changeBtn}
              onClick={() => navigate("/perfil")}
            >
              Cambiar dirección
            </button>
          </div>
        )}

        {/* MÉTODOS DE PAGO INFO */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>💳 Métodos de pago</h2>
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>
            Al hacer clic en "Pagar con MercadoPago" serás redirigido a la plataforma segura de MercadoPago donde podés pagar con:
          </p>
          <div style={styles.methodsGrid}>
            {["💳 Tarjetas de débito", "💳 Naranja X", "💳 Cordobesa", "🏦 Transferencia bancaria", "💰 Efectivo (Rapipago/Pago Fácil)"].map((m, i) => (
              <div key={i} style={styles.methodChip}>{m}</div>
            ))}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.error}
          >
            ⚠️ {error}
          </motion.p>
        )}

        {/* BOTÓN PAGAR */}
        <motion.button
          style={styles.payBtn}
          onClick={handlePay}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Redirigiendo...
            </motion.span>
          ) : (
            <>
              <img
                src="https://www.mercadopago.com/org-img/MP3/home/logomp.gif"
                alt="MP"
                style={{ height: "24px", filter: "brightness(10)" }}
                onError={(e) => e.target.style.display = "none"}
              />
              Pagar con MercadoPago
            </>
          )}
        </motion.button>

        <button style={styles.backBtn} onClick={() => navigate("/checkout/confirm")}>
          ← Volver
        </button>

      </div>
    </motion.div>
  )
}

const isMobile = window.innerWidth <= 768

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#F8F5F2", padding: isMobile ? "20px 16px 40px" : "40px 20px" },
  container: { maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" },
  card: { backgroundColor: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 15px rgba(0,0,0,0.06)" },
  sectionTitle: { color: "#3E2C23", fontSize: "18px", marginBottom: "16px" },
  itemRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  itemImg: { width: "56px", height: "56px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: "15px", color: "#3E2C23", fontWeight: "500", margin: 0 },
  itemQty: { fontSize: "13px", color: "#888", margin: "4px 0 0" },
  itemPrice: { fontSize: "16px", fontWeight: "600", color: "#3E2C23" },
  hr: { border: "none", borderTop: "1px solid rgba(0,0,0,0.06)", margin: "16px 0" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0" },
  rowLabel: { color: "#666", fontSize: "15px" },
  addressText: { fontSize: "16px", color: "#3E2C23", fontWeight: "500", margin: "0 0 4px" },
  addressSub: { fontSize: "14px", color: "#888", margin: "4px 0" },
  changeBtn: { background: "none", border: "none", color: "#8B5E3C", fontSize: "13px", cursor: "pointer", textDecoration: "underline", padding: 0, marginTop: "8px" },
  methodsGrid: { display: "flex", flexWrap: "wrap", gap: "8px" },
  methodChip: { padding: "8px 14px", backgroundColor: "#F8F5F2", borderRadius: "20px", fontSize: "13px", color: "#3E2C23", fontWeight: "500" },
  payBtn: {
    width: "100%", padding: "18px", border: "none", borderRadius: "14px",
    backgroundColor: "#009EE3", color: "white", fontSize: "18px",
    fontWeight: "700", cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center", gap: "12px",
    boxShadow: "0 8px 25px rgba(0,158,227,0.3)"
  },
  backBtn: { background: "none", border: "none", color: "#999", fontSize: "14px", cursor: "pointer", textAlign: "center" },
  error: { color: "#e53e3e", fontSize: "14px", textAlign: "center", backgroundColor: "#fff5f5", padding: "12px", borderRadius: "10px" }
}

export default CheckoutPayment