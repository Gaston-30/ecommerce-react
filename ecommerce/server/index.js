import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import supabase from "./supabase.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀")
})

app.get("/products", async (req, res) => {

  const { data, error } = await supabase
    .from("products")
    .select("*")

  if (error) {
    return res.status(500).json({
      error: error.message
    })
  }

  res.json(data)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})