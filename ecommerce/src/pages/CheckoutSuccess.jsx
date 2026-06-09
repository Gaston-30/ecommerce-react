import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import { supabase } from "../supabase"
import { useAuth } from "../context/AuthContext"

function CheckoutSuccess() {
  const { clearCart } = useCart()
  const { user } = useAuth()
  const [esBaigorria, setEsBaigorria] = useState(false)

  useEffect(() => {
    if (!user?.id) return

    const procesarCompra = async () => {

      const itemsComprados = JSON.parse(localStorage.getItem("ultimaCompra")) || []
      const compraProcesada = localStorage.getItem("compraProcesada")

      // Verificar Baigorria
      const { data: dirCP } = await supabase
        .from("addresses")
        .select("codigo_postal")
        .eq("user_id", user.id)
        .eq("es_principal", true)
        .single()

      if (dirCP && parseInt(dirCP.codigo_postal) === 5811) {
        setEsBaigorria(true)
      }

      if (compraProcesada) return

      localStorage.setItem("compraProcesada", "true")

      // Descontar stock
      for (const item of itemsComprados) {
        const { error } = await supabase.rpc("decrementar_stock", {
          producto_id: item.id,
          cantidad: item.quantity
        })
        if (error) console.error("Error descontando stock:", error)
      }

      clearCart()

      // Traer perfil y dirección
      const [perfilRes, dirRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("addresses").select("*").eq("user_id", user.id).eq("es_principal", true).single()
      ])

      const profile = perfilRes.data
      const address = dirRes.data

      console.log("PERFIL:", profile)
      console.log("DIRECCION:", address)

      // Mandar email
      await fetch("http://localhost:3000/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsComprados,
          comprador: {
            nombre_completo: profile?.nombre_completo,
            dni: profile?.dni,
            email: user.email
          },
          direccion: address,
          metodoPago: localStorage.getItem("metodoPago") || "tarjeta",
          shipping: parseInt(localStorage.getItem("shippingCosto") || "0"),
          subtotal: itemsComprados.reduce((acc, item) => acc + item.precio * item.quantity, 0)
        })
      })

      localStorage.removeItem("cartItems")
      localStorage.removeItem("ultimaCompra")
    }

    procesarCompra()

  }, [user?.id])

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

        {esBaigorria && (
          <div style={{
            backgroundColor: "#F0F7E6",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "20px",
            border: "1px solid #B8DCA0"
          }}>
            <p style={{ fontSize: "14px", color: "#4A7C2F", margin: "0 0 8px", fontWeight: "600" }}>
              📍 Recordá coordinar la entrega
            </p>
            <p style={{ fontSize: "13px", color: "#555", margin: "0 0 12px" }}>
              Como sos de Coronel Baigorria, coordiná con nosotros cuándo y dónde recibir tu pedido.
            </p>
            
            <a
              href="https://wa.me/5493584829701?text=Hola!%20Acabo%20de%20realizar%20un%20pedido%20y%20quiero%20coordinar%20la%20entrega%20en%20Coronel%20Baigorria"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#25D366",
                color: "white",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              💬 Contactar por WhatsApp
            </a>
          </div>
        )}

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