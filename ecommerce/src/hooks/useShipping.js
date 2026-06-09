import { useState, useEffect } from "react"
import { supabase } from "../supabase"
import { useAuth } from "../context/AuthContext"

const ZONAS_ENVIO = {
  CABA: { nombre: "Ciudad de Buenos Aires", costo: 3500 },
  GBA: { nombre: "Gran Buenos Aires", costo: 5500 },
  BAIGORRIA: { nombre: "Coronel Baigorria", costo: 0, esLocal: true },
  INTERIOR: { nombre: "Interior del país", costo: 8500 }
}

export const getZona = (codigoPostal) => {
  const cp = parseInt(codigoPostal)
  if (cp >= 1000 && cp <= 1499) return ZONAS_ENVIO.CABA
  if (cp >= 1600 && cp <= 1999) return ZONAS_ENVIO.GBA
  if (cp === 5811) return ZONAS_ENVIO.BAIGORRIA
  return ZONAS_ENVIO.INTERIOR
}

function useShipping() {
  const { user } = useAuth()
  const [zona, setZona] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cpManual, setCpManual] = useState("")

  useEffect(() => {
    if (!user) { setLoading(false); return }

    supabase
      .from("addresses")
      .select("codigo_postal")
      .eq("user_id", user.id)
      .eq("es_principal", true)
      .single()
      .then(({ data }) => {
        if (data) setZona(getZona(data.codigo_postal))
        setLoading(false)
      })
  }, [user])

  const calcularDesdeCP = (cp) => {
    setCpManual(cp)
    if (cp.length >= 4) setZona(getZona(cp))
  }

  return { zona, loading, cpManual, calcularDesdeCP, user }
}

export default useShipping