import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import supabase from "./supabase.js"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { Resend } from "resend"
import PDFDocument from "pdfkit"
import { Readable } from "stream"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

const resend = new Resend(process.env.RESEND_API_KEY)

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀")
})

app.get("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*")
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.post("/purchase-success", async (req, res) => {
  const { items } = req.body
  try {
    for (const item of items) {
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single()

      await supabase
        .from("products")
        .update({ stock: Math.max(product.stock - item.quantity, 0) })
        .eq("id", item.id)
    }
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.post("/create-preference", async (req, res) => {
  const { items, shipping, buyer, metodoPago } = req.body

  const descuento = metodoPago === "transferencia" ? 0.15 : 0

  const itemsConDescuento = items.map(item => ({
    id: String(item.id),
    title: item.nombre,
    quantity: item.quantity,
    unit_price: Number((item.precio * (1 - descuento)).toFixed(2)),
    currency_id: "ARS"
  }))

  const excluded = metodoPago === "transferencia"
    ? [{ id: "credit_card" }, { id: "debit_card" }]
    : [{ id: "bank_transfer" }, { id: "ticket" }]

  try {
    const preference = new Preference(mp)
    const response = await preference.create({
      body: {
        items: itemsConDescuento,
        shipments: {
          cost: shipping,
          mode: "not_specified"
        },
        payer: {
          email: buyer.email
        },
        payment_methods: {
          excluded_payment_types: excluded
        },
        back_urls: {
          success: "https://wand-probably-whenever.ngrok-free.dev/checkout/success",
          failure: "https://wand-probably-whenever.ngrok-free.dev/checkout/failure",
          pending: "https://wand-probably-whenever.ngrok-free.dev/checkout/pending"
        },
        statement_descriptor: "BLANCO HOGAR"
      }
    })
    res.json({ id: response.id, init_point: response.init_point })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al crear preferencia" })
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

app.post("/send-order-email", async (req, res) => {
  const { items, comprador, direccion, metodoPago, shipping, subtotal } = req.body

  const descuento = metodoPago === "transferencia" ? 0.15 : 0
  const subtotalConDescuento = subtotal * (1 - descuento)
  const total = subtotalConDescuento + shipping
  const esBaigorria = parseInt(direccion?.codigo_postal) === 5811

  try {
    // ── Generar PDF ──────────────────────────────────────────────
    const doc = new PDFDocument({ margin: 40, size: "A6" })
    const chunks = []

    doc.on("data", chunk => chunks.push(chunk))

    await new Promise((resolve) => {
      doc.on("end", resolve)

      // Encabezado
      doc.fontSize(16).font("Helvetica-Bold").text("BLANCO HOGAR", { align: "center" })
      doc.fontSize(10).font("Helvetica").text("Coronel Baigorria, Córdoba", { align: "center" })
      doc.moveDown(0.5)
      doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke()
      doc.moveDown(0.5)

      // Destinatario
      doc.fontSize(12).font("Helvetica-Bold").text("DESTINATARIO")
      doc.fontSize(10).font("Helvetica")
      doc.text(`Nombre: ${comprador.nombre_completo || "No especificado"}`)
      doc.text(`DNI: ${comprador.dni || "No especificado"}`)
      doc.text(`Dirección: ${direccion?.direccion || ""}`)
      doc.text(`Ciudad: ${direccion?.ciudad || ""} - CP ${direccion?.codigo_postal || ""}`)
      doc.text(`Teléfono: ${direccion?.telefono || ""}`)
      doc.moveDown(0.5)
      doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke()
      doc.moveDown(0.5)

      // Productos
      doc.fontSize(12).font("Helvetica-Bold").text("PRODUCTOS")
      doc.fontSize(10).font("Helvetica")
      items.forEach(item => {
        const precioItem = item.precio * (1 - descuento)
        doc.text(`• ${item.nombre} x${item.quantity} — $${(precioItem * item.quantity).toLocaleString("es-AR", { maximumFractionDigits: 0 })}`)
      })
      doc.moveDown(0.5)
      doc.moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke()
      doc.moveDown(0.5)

      // Totales
      doc.fontSize(10).font("Helvetica")
      doc.text(`Subtotal: $${subtotalConDescuento.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`)
      if (descuento > 0) doc.text(`Descuento (15% transferencia): aplicado`)
      doc.text(`Envío: ${shipping === 0 ? "A coordinar" : "$" + shipping.toLocaleString("es-AR")}`)
      doc.fontSize(12).font("Helvetica-Bold")
      doc.text(`TOTAL: $${total.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`)
      doc.moveDown(0.5)

      // Método de pago
      doc.fontSize(10).font("Helvetica")
      doc.text(`Método de pago: ${metodoPago === "transferencia" ? "Transferencia / Efectivo" : "Tarjeta"}`)

      // Baigorria
      if (esBaigorria) {
        doc.moveDown(0.5)
        doc.fontSize(10).font("Helvetica-Bold").fillColor("#2D7A00")
        doc.text("📍 ENTREGA LOCAL — Coronel Baigorria")
        doc.fontSize(9).font("Helvetica").fillColor("black")
        doc.text("Coordinar entrega o retiro en local con el comprador.")
      }

      doc.end()
    })

    const pdfBuffer = Buffer.concat(chunks)

    // ── Armar HTML del email ──────────────────────────────────────
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3E2C23;">
        <div style="background: linear-gradient(135deg, #3E2C23, #8B5E3C); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🛍️ Nueva venta</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Blanco Hogar</p>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

          ${esBaigorria ? `
          <div style="background: #F0F7E6; border: 1px solid #B8DCA0; border-radius: 10px; padding: 14px; margin-bottom: 20px;">
            <p style="color: #4A7C2F; font-weight: bold; margin: 0 0 4px;">📍 Cliente de Coronel Baigorria</p>
            <p style="color: #555; font-size: 14px; margin: 0;">Coordinar entrega a domicilio o retiro en el local.</p>
          </div>` : ""}

          <h2 style="font-size: 16px; border-bottom: 2px solid #F0E8DF; padding-bottom: 8px;">👤 Datos del comprador</h2>
          <p><strong>Nombre:</strong> ${comprador.nombre_completo || "No especificado"}</p>
          <p><strong>DNI:</strong> ${comprador.dni || "No especificado"}</p>
          <p><strong>Email:</strong> ${comprador.email}</p>

          <h2 style="font-size: 16px; border-bottom: 2px solid #F0E8DF; padding-bottom: 8px; margin-top: 20px;">📍 Dirección de entrega</h2>
          <p><strong>Dirección:</strong> ${direccion?.direccion}</p>
          <p><strong>Ciudad:</strong> ${direccion?.ciudad} — CP ${direccion?.codigo_postal}</p>
          <p><strong>Teléfono:</strong> ${direccion?.telefono}</p>

          <h2 style="font-size: 16px; border-bottom: 2px solid #F0E8DF; padding-bottom: 8px; margin-top: 20px;">📦 Productos</h2>
          ${items.map(item => `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F5EEE6;">
              <span>${item.nombre} x${item.quantity}</span>
              <strong>$${(item.precio * (1 - descuento) * item.quantity).toLocaleString("es-AR", { maximumFractionDigits: 0 })}</strong>
            </div>
          `).join("")}

          <div style="margin-top: 16px; padding: 16px; background: #F8F3ED; border-radius: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Subtotal${descuento > 0 ? " (con 15% desc.)" : ""}:</span>
              <span>$${subtotalConDescuento.toLocaleString("es-AR", { maximumFractionDigits: 0 })}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Envío:</span>
              <span>${shipping === 0 ? "A coordinar" : "$" + shipping.toLocaleString("es-AR")}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; color: #8B5E3C; border-top: 2px solid #D6B79A; padding-top: 8px;">
              <span>TOTAL:</span>
              <span>$${total.toLocaleString("es-AR", { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          <p style="margin-top: 16px; color: #666; font-size: 14px;">
            <strong>Método de pago:</strong> ${metodoPago === "transferencia" ? "💳 Transferencia / Efectivo" : "💳 Tarjeta"}
          </p>

          <p style="margin-top: 24px; font-size: 13px; color: #999; text-align: center;">
            La etiqueta para el paquete está adjunta en el PDF.
          </p>
        </div>
      </div>
    `

    // ── Mandar el email ───────────────────────────────────────────
    await resend.emails.send({
      from: "Blanco Hogar <onboarding@resend.dev>",
      to: "qtimpor5000@gmail.com",  // ← cambiar por el email real
      subject: `🛍️ Nueva venta — ${comprador.nombre_completo || comprador.email}`,
      html,
      attachments: [
        {
          filename: "etiqueta-envio.pdf",
          content: pdfBuffer.toString("base64")
        }
      ]
    })

    res.json({ success: true })

  } catch (error) {
    console.error("Error al enviar email:", error)
    res.status(500).json({ error: error.message })
  }
})