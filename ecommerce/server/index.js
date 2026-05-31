import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import supabase from "./supabase.js"
import { MercadoPagoConfig, Preference } from "mercadopago"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Inicializar MercadoPago
const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀")
})

app.get("/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

app.post("/create-preference", async (req, res) => {
  const { items, shipping, buyer } = req.body

  try {
    const preference = new Preference(mp)
    const response = await preference.create({
      body: {
        items: items.map(item => ({
          id: String(item.id),
          title: item.nombre,
          quantity: item.quantity,
          unit_price: Number(item.precio),
          currency_id: "ARS"
        })),
        shipments: {
          cost: shipping,
          mode: "not_specified"
        },
        payer: {
          email: buyer.email
        },
        back_urls: {
          success: "http://localhost:5173/checkout/success",
          failure: "http://localhost:5173/checkout/failure",
          pending: "http://localhost:5173/checkout/pending"
        },
        auto_return: "approved",
        statement_descriptor: "DECO Y HOGAR"
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