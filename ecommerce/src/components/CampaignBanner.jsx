import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import { motion } from "framer-motion"

function CampaignBanner() {

  const [promo, setPromo] = useState(null)
  const [contador, setContador] = useState("")

    useEffect(() => {

    const cargarPromo = async () => {

        const ahora = new Date().toISOString()


       const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .lte("fecha_inicio", ahora)
        .gte("fecha_fin", ahora)
        .eq("activa", true)
        .order("fecha_inicio", { ascending: false })
        .limit(1)

        console.log(data)
        console.log(error)

        if (data && data.length > 0) {
        setPromo(data[0])
        }
    }

    cargarPromo()

    }, [])

  useEffect(() => {

    if (!promo) return

    const interval = setInterval(() => {

      const ahora = new Date()

      const fin = new Date(
        promo.fecha_fin
      )

      const diferencia =
        fin - ahora

      if (diferencia <= 0) {
        setContador("Finalizada")
        return
      }

      const dias = Math.floor(
        diferencia /
        (1000 * 60 * 60 * 24)
      )

      const horas = Math.floor(
        (diferencia %
          (1000 * 60 * 60 * 24))
          /
        (1000 * 60 * 60)
      )

      const minutos = Math.floor(
        (diferencia %
          (1000 * 60 * 60))
          /
        (1000 * 60)
      )

      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000)
      setContador(`${dias}d ${horas}h ${minutos}m ${segundos}s`)

    }, 1000)

    return () =>
      clearInterval(interval)

  }, [promo])

  if (!promo) return null

  const irANovedades = () => {

    document
      .getElementById("novedades")
      ?.scrollIntoView({
        behavior: "smooth"
      })
  }

  return (
  <motion.section
    style={styles.banner}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Destello decorativo izquierda */}
    <div style={styles.glow} />

    {/* Nombre de la promo */}
    <div style={styles.left}>
      <span style={styles.tag}>🎁 OFERTA</span>
      <span style={styles.titulo}>{promo.nombre.toUpperCase()}</span>
    </div>

    {/* Separador */}
    <div style={styles.divider} />

    {/* Contador */}
    <div style={styles.center}>
      <span style={styles.contadorLabel}>TERMINA EN</span>
      <span style={styles.contador}>{contador}</span>
    </div>

    {/* Separador */}
    <div style={styles.divider} />

    {/* Botón */}
    <motion.button
      style={styles.btn}
      onClick={() => document.getElementById("novedades")?.scrollIntoView({ behavior: "smooth" })}
      whileHover={{ scale: 1.05, backgroundColor: "#3E2C23", color: "white" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      Ver productos →
    </motion.button>
  </motion.section>
)
}
const styles = {
  banner: {
    background: "linear-gradient(135deg, #3E2C23 0%, #6B4430 50%, #8B5E3C 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "clamp(16px, 3vw, 40px)",
    flexWrap: "wrap",
    padding: "14px clamp(16px, 4vw, 40px)",
    position: "relative",
    overflow: "hidden",
    minHeight: "60px",
  },
  glow: {
    position: "absolute",
    left: "-60px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.06)",
    pointerEvents: "none",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    padding: "3px 10px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  titulo: {
    fontWeight: "700",
    color: "white",
    fontSize: "clamp(13px, 1.5vw, 15px)",
    letterSpacing: "0.08em",
  },
  divider: {
    width: "1px",
    height: "28px",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  contadorLabel: {
    fontSize: "9px",
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.12em",
    fontWeight: "600",
  },
  contador: {
    color: "white",
    fontWeight: "700",
    fontSize: "clamp(15px, 1.8vw, 18px)",
    letterSpacing: "0.05em",
    fontVariantNumeric: "tabular-nums",
  },
  btn: {
    padding: "9px 22px",
    backgroundColor: "white",
    color: "#3E2C23",
    border: "none",
    borderRadius: "50px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "inherit",
    letterSpacing: "0.02em",
    transition: "all 0.18s ease",
    whiteSpace: "nowrap",
  },
}

export default CampaignBanner