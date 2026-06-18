import { motion } from "framer-motion"

export default function PrivacyPolicy() {
  return (
    <motion.div
      style={s.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={s.container}>
        <h1 style={s.title}>Política de Privacidad</h1>
        <p style={s.date}>Última actualización: junio 2026</p>

        <Section title="1. Responsable del tratamiento">
          <p>Blanco Hogar (en adelante "nosotros"), con domicilio en Vélez Sarsfield 365, Coronel Baigorria, Córdoba, Argentina. CUIT: 23-33149730-4. Contacto: <a href="mailto:blancohogar@gmail.com" style={s.link}>blancohogar@gmail.com</a></p>
        </Section>

        <Section title="2. Datos que recopilamos">
          <p>Al registrarte y realizar compras en nuestra tienda, recopilamos:</p>
          <ul style={s.list}>
            <li>Nombre completo y DNI</li>
            <li>Dirección de correo electrónico</li>
            <li>Dirección de entrega y código postal</li>
            <li>Número de teléfono</li>
            <li>Historial de compras y productos favoritos</li>
          </ul>
        </Section>

        <Section title="3. Finalidad del tratamiento">
          <p>Utilizamos tus datos para:</p>
          <ul style={s.list}>
            <li>Procesar y coordinar tus pedidos</li>
            <li>Calcular el costo de envío según tu ubicación</li>
            <li>Enviarte confirmaciones de compra</li>
            <li>Mejorar tu experiencia en la tienda</li>
          </ul>
        </Section>

        <Section title="4. Almacenamiento">
          <p>Tus datos son almacenados de forma segura en Supabase (supabase.com), plataforma que cumple con estándares internacionales de seguridad. No vendemos ni compartimos tus datos con terceros, salvo los necesarios para procesar pagos a través de MercadoPago.</p>
        </Section>

        <Section title="5. Tus derechos">
          <p>De acuerdo a la Ley 25.326 de Protección de Datos Personales de Argentina, tenés derecho a acceder, rectificar y suprimir tus datos personales. Para ejercer estos derechos podés contactarnos por WhatsApp o email.</p>
        </Section>

        <Section title="6. Cookies">
          <p>Utilizamos cookies para mantener tu sesión iniciada y recordar tu carrito de compras. No utilizamos cookies de publicidad ni de seguimiento de terceros.</p>
        </Section>

        <Section title="7. Contacto">
          <p>Para cualquier consulta sobre el tratamiento de tus datos podés contactarnos a través de nuestro <a href="https://wa.me/5493584829701" style={s.link}>WhatsApp</a>.</p>
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