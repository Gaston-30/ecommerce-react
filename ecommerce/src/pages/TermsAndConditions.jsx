import { motion } from "framer-motion"

export default function TermsAndConditions() {
  return (
    <motion.div
      style={s.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={s.container}>
        <h1 style={s.title}>Términos y Condiciones</h1>
        <p style={s.date}>Última actualización: junio 2026</p>

        <Section title="1. Aceptación">
          <p>Al usar este sitio web y realizar compras en Blanco Hogar aceptás estos términos. Si no estás de acuerdo, por favor no uses el sitio.</p>
        </Section>

        <Section title="2. Productos y precios">
          <ul style={s.list}>
            <li>Los precios están expresados en pesos argentinos (ARS).</li>
            <li>Se aplica un <strong>15% de descuento</strong> pagando con transferencia bancaria o efectivo.</li>
            <li>Los precios pueden modificarse sin previo aviso.</li>
            <li>El stock es limitado y puede agotarse.</li>
          </ul>
        </Section>

        <Section title="3. Medios de pago">
          <p>Aceptamos pagos a través de MercadoPago (tarjetas de crédito, débito, transferencia bancaria y efectivo vía Rapipago/Pago Fácil).</p>
        </Section>

        <Section title="4. Envíos">
          <ul style={s.list}>
            <li>Enviamos a todo el país a través de Correo Argentino.</li>
            <li>El costo de envío se calcula según el código postal del destinatario.</li>
            <li>Para entregas en Coronel Baigorria, la entrega se coordina directamente con la vendedora.</li>
            <li>Los plazos de entrega son aproximados y pueden variar.</li>
          </ul>
        </Section>

        <Section title="5. Devoluciones">
          <p>Aceptamos devoluciones dentro de los 30 días de recibido el producto, siempre que esté en perfectas condiciones y con su embalaje original. Para iniciar una devolución contactanos por WhatsApp.</p>
        </Section>

        <Section title="6. Responsabilidad">
          <p>Blanco Hogar no se responsabiliza por demoras en el envío imputables al servicio de correos, ni por daños ocurridos durante el transporte una vez entregado el paquete a la empresa de correos.</p>
        </Section>

        <Section title="7. Contacto">
          <p>Para consultas sobre tu compra podés contactarnos por <a href="https://wa.me/5493584829701" style={s.link}>WhatsApp</a> o visitarnos en Vélez Sarsfield 365, Coronel Baigorria, Córdoba.</p>
        </Section>
      </div>
    </motion.div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#3E2C23", marginBottom: "12px" }}>{title}</h2>
      <div style={{ color: "#555", fontSize: "15px", lineHeight: "1.8" }}>{children}</div>
    </div>
  )
}

const s = {
  page: { backgroundColor: "#F8F5F2", minHeight: "100vh", padding: "40px 20px" },
  container: { maxWidth: "760px", margin: "0 auto", backgroundColor: "white", borderRadius: "20px", padding: "clamp(24px, 5vw, 60px)", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" },
  title: { fontSize: "clamp(24px, 4vw, 36px)", fontWeight: "700", color: "#3E2C23", marginBottom: "8px" },
  date: { color: "#aaa", fontSize: "13px", marginBottom: "40px" },
  list: { paddingLeft: "20px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" },
  link: { color: "#8B5E3C", fontWeight: "600" }
}