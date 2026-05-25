import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { supabase } from "../supabase"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

const ZONAS_ENVIO = {
  CABA: { nombre: "Ciudad de Buenos Aires", costo: 3500 },
  GBA: { nombre: "Gran Buenos Aires", costo: 5500 },
  INTERIOR: { nombre: "Interior del país", costo: 8500 }
}

const getZona = (codigoPostal) => {
  const cp = parseInt(codigoPostal)
  if (cp >= 1000 && cp <= 1499) return ZONAS_ENVIO.CABA
  if (cp >= 1600 && cp <= 1999) return ZONAS_ENVIO.GBA
  return ZONAS_ENVIO.INTERIOR
}

function CheckoutConfirm() {
  const { user } = useAuth()
  const { cartItems, subtotal } = useCart()
  const navigate = useNavigate()

  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const [metodoEntrega, setMetodoEntrega] = useState("envio") // "envio" o "acuerdo"

  useEffect(() => {
    if (!user) { navigate("/login"); return }

    supabase.from("addresses").select("*").eq("user_id", user.id).order("es_principal", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setAddresses(data)
          setSelectedAddress(data.find(a => a.es_principal) || data[0])
        }
        setLoadingAddresses(false)
      })
  }, [user])

  const zona = selectedAddress ? getZona(selectedAddress.codigo_postal) : null
  const costoEnvio = metodoEntrega === "envio" ? (zona?.costo || 0) : 0
  const total = subtotal + costoEnvio
  const isMobile = window.innerWidth <= 768

  if (cartItems.length === 0) {
    navigate("/cart")
    return null
  }

  if (loadingAddresses) return <p style={{ textAlign: "center", marginTop: "100px" }}>Cargando...</p>

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={styles.container}>

        {/* COLUMNA IZQUIERDA */}
        <div style={styles.left}>

          {/* PRODUCTOS */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Productos</h2>
            {cartItems.map(product => (
              <div key={product.id} style={styles.productRow}>
                <img src={product.imagenes?.[0]} alt={product.nombre} style={styles.productImg} />
                <div style={styles.productInfo}>
                  <p style={styles.productName}>{product.nombre}</p>
                  <p style={styles.productQty}>x{product.quantity}</p>
                </div>
                <p style={styles.productPrice}>${(product.precio * product.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* MÉTODO DE ENTREGA */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Método de entrega</h2>

            <div
              style={{ ...styles.optionCard, border: metodoEntrega === "envio" ? "2px solid #8B5E3C" : "1px solid rgba(0,0,0,0.08)" }}
              onClick={() => setMetodoEntrega("envio")}
            >
              <div style={styles.optionLeft}>
                <div style={{ ...styles.radio, backgroundColor: metodoEntrega === "envio" ? "#8B5E3C" : "white" }} />
                <div>
                  <p style={styles.optionTitle}>🚚 Envío a domicilio</p>
                  {selectedAddress && (
                    <p style={styles.optionSubtitle}>{selectedAddress.direccion}, {selectedAddress.ciudad}</p>
                  )}
                </div>
              </div>
              {zona && (
                <p style={styles.optionPrice}>${zona.costo.toLocaleString()}</p>
              )}
            </div>

            <div
              style={{ ...styles.optionCard, border: metodoEntrega === "acuerdo" ? "2px solid #8B5E3C" : "1px solid rgba(0,0,0,0.08)" }}
              onClick={() => setMetodoEntrega("acuerdo")}
            >
              <div style={styles.optionLeft}>
                <div style={{ ...styles.radio, backgroundColor: metodoEntrega === "acuerdo" ? "#8B5E3C" : "white" }} />
                <div>
                  <p style={styles.optionTitle}>🤝 Acordar con el vendedor</p>
                  <p style={styles.optionSubtitle}>Te contactamos para coordinar la entrega</p>
                </div>
              </div>
              <p style={styles.optionPrice}>Gratis</p>
            </div>
          </div>

          {/* SELECCIÓN DE DIRECCIÓN */}
          {metodoEntrega === "envio" && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Dirección de entrega</h2>

              {addresses.length === 0 ? (
                <div style={styles.noAddress}>
                  <p style={{ color: "#888", fontSize: "14px" }}>No tenés direcciones guardadas.</p>
                  <button style={styles.linkBtn} onClick={() => navigate("/perfil")}>
                    + Agregar dirección
                  </button>
                </div>
              ) : (
                addresses.map(address => (
                  <div
                    key={address.id}
                    style={{
                      ...styles.addressCard,
                      border: selectedAddress?.id === address.id ? "2px solid #8B5E3C" : "1px solid rgba(0,0,0,0.08)"
                    }}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div style={styles.optionLeft}>
                      <div style={{ ...styles.radio, backgroundColor: selectedAddress?.id === address.id ? "#8B5E3C" : "white" }} />
                      <div>
                        {address.es_principal && <span style={styles.badge}>⭐ Principal</span>}
                        <p style={styles.addressText}>{address.direccion}</p>
                        <p style={styles.addressSubtext}>{address.ciudad} · CP {address.codigo_postal}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {addresses.length > 0 && (
                <button style={styles.linkBtn} onClick={() => navigate("/perfil")}>
                  + Agregar otra dirección
                </button>
              )}

              {zona && (
                <div style={styles.zonaInfo}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                    📍 Zona: <strong>{zona.nombre}</strong> · Costo de envío: <strong>${zona.costo.toLocaleString()}</strong>
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* RESUMEN */}
        <div style={isMobile ? styles.mobileSummary : styles.summary}>
          <h2 style={styles.sectionTitle}>Resumen</h2>

          <div style={styles.row}>
            <span>Productos</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div style={styles.row}>
            <span>Envío</span>
            <span>{costoEnvio === 0 ? "Gratis" : `$${costoEnvio.toLocaleString()}`}</span>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.06)", margin: "10px 0" }} />

          <div style={styles.row}>
            <strong>Total</strong>
            <strong>${total.toLocaleString()}</strong>
          </div>

          <motion.button
            style={styles.confirmBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/checkout/payment")}
          >
            Ir al pago
          </motion.button>

          <button style={styles.backBtn} onClick={() => navigate("/cart")}>
            ← Volver al carrito
          </button>
        </div>

      </div>
    </motion.div>
  )
}

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#F8F5F2", padding: window.innerWidth <= 768 ? "20px 16px 200px" : "40px 20px" },
  container: { maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: window.innerWidth <= 768 ? "column" : "row", gap: "30px", alignItems: "flex-start" },
  left: { flex: 1, display: "flex", flexDirection: "column", gap: "20px" },
  section: { backgroundColor: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" },
  sectionTitle: { color: "#3E2C23", marginBottom: "16px", fontSize: "18px" },
  productRow: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" },
  productImg: { width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px" },
  productInfo: { flex: 1 },
  productName: { fontSize: "15px", color: "#3E2C23", fontWeight: "500", margin: 0 },
  productQty: { fontSize: "13px", color: "#888", margin: "4px 0 0" },
  productPrice: { fontSize: "16px", fontWeight: "600", color: "#3E2C23" },
  optionCard: { padding: "16px", borderRadius: "12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", transition: "0.2s" },
  optionLeft: { display: "flex", alignItems: "center", gap: "12px" },
  radio: { width: "18px", height: "18px", borderRadius: "50%", border: "2px solid #8B5E3C", flexShrink: 0, transition: "0.2s" },
  optionTitle: { fontSize: "15px", fontWeight: "500", color: "#3E2C23", margin: 0 },
  optionSubtitle: { fontSize: "13px", color: "#888", margin: "4px 0 0" },
  optionPrice: { fontSize: "15px", fontWeight: "600", color: "#8B5E3C" },
  addressCard: { padding: "14px", borderRadius: "12px", cursor: "pointer", marginBottom: "10px", transition: "0.2s" },
  addressText: { fontSize: "15px", color: "#3E2C23", fontWeight: "500", margin: 0 },
  addressSubtext: { fontSize: "13px", color: "#888", margin: "4px 0 0" },
  badge: { fontSize: "11px", color: "#8B5E3C", fontWeight: "600" },
  zonaInfo: { marginTop: "12px", padding: "12px", backgroundColor: "#F8F5F2", borderRadius: "10px" },
  noAddress: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px 0" },
  linkBtn: { background: "none", border: "none", color: "#8B5E3C", fontSize: "14px", cursor: "pointer", textDecoration: "underline", padding: 0 },
  summary: { width: "320px", position: "sticky", top: "100px", backgroundColor: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" },
  mobileSummary: { position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: "white", padding: "20px", boxShadow: "0 -2px 10px rgba(0,0,0,0.1)", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", zIndex: 999, boxSizing: "border-box" },
  row: { display: "flex", justifyContent: "space-between", margin: "12px 0" },
  confirmBtn: { width: "100%", marginTop: "16px", padding: "15px", border: "none", borderRadius: "12px", backgroundColor: "#8B5E3C", color: "white", fontSize: "16px", cursor: "pointer", fontWeight: "600" },
  backBtn: { width: "100%", marginTop: "10px", background: "none", border: "none", color: "#999", fontSize: "14px", cursor: "pointer" },
}

export default CheckoutConfirm