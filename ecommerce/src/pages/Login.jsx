import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"

function Login() {
  const { signIn, signInWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const err = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError("Correo o contraseña incorrectos")
    } else {
      navigate("/")
    }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    const err = await resetPassword(resetEmail)
    if (err) setError("No se pudo enviar el correo")
    else setResetSent(true)
  }

  const handleGoogle = async () => {
    const err = await signInWithGoogle()
    if (err) setError("Error al iniciar con Google")
  }

  return (
    <div style={styles.page}>

      {/* FONDO DECORATIVO */}
      <div style={styles.bgDecor} />

      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 style={styles.title}>Bienvenido</h1>
          <p style={styles.subtitle}>Iniciá sesión para continuar</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={styles.error}
            >
              ⚠️ {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!showReset ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputWrapper}>
                  <label style={styles.label}>Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <label style={styles.label}>Contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>

                <button
                  type="button"
                  style={styles.forgotLink}
                  onClick={() => setShowReset(true)}
                >
                  ¿Olvidaste tu contraseña?
                </button>

                <motion.button
                  type="submit"
                  style={styles.button}
                  whileHover={{ scale: 1.02, backgroundColor: "#6B4430" }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                >
                  {loading ? (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      Ingresando...
                    </motion.span>
                  ) : "Ingresar"}
                </motion.button>
              </form>

              <div style={styles.divider}>
                <span style={styles.dividerLine} />
                <span style={styles.dividerText}>o</span>
                <span style={styles.dividerLine} />
              </div>

              <motion.button
                style={styles.googleButton}
                onClick={handleGoogle}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: "20px", height: "20px" }} />
                Continuar con Google
              </motion.button>

              <p style={styles.registerLink}>
                ¿No tenés cuenta?{" "}
                <Link to="/register" style={{ color: "#8B5E3C", fontWeight: "600" }}>
                  Crear cuenta
                </Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="reset"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {resetSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "20px 0" }}
                >
                  <span style={{ fontSize: "50px" }}>📧</span>
                  <p style={{ ...styles.success, marginTop: "16px" }}>
                    ¡Listo! Revisá tu correo para restablecer tu contraseña.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleReset} style={styles.form}>
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6", marginBottom: "8px" }}>
                    Ingresá tu correo y te mandamos un link para restablecer tu contraseña.
                  </p>
                  <div style={styles.inputWrapper}>
                    <label style={styles.label}>Tu correo</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      style={styles.input}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    style={styles.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Enviar correo
                  </motion.button>
                </form>
              )}
              <button
                type="button"
                style={styles.forgotLink}
                onClick={() => { setShowReset(false); setResetSent(false) }}
              >
                ← Volver al login
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F5F2",
    position: "relative",
    overflow: "hidden",
    padding: "20px"
  },
  bgDecor: {
    position: "absolute",
    width: "500px", height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(214,183,154,0.3) 0%, transparent 70%)",
    top: "-100px", right: "-100px",
    pointerEvents: "none"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "white",
    padding: "48px 40px",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    position: "relative",
    zIndex: 1
  },
  title: { textAlign: "center", color: "#3E2C23", fontSize: "32px", fontWeight: "700", marginBottom: "8px" },
  subtitle: { textAlign: "center", color: "#888", fontSize: "15px", marginBottom: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  inputWrapper: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#3E2C23", letterSpacing: "0.3px" },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1.5px solid rgba(0,0,0,0.08)",
    backgroundColor: "#FAFAF9",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s",
    color: "#3E2C23"
  },
  button: {
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#8B5E3C",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "4px"
  },
  googleButton: {
    width: "100%",
    padding: "14px",
    border: "1.5px solid rgba(0,0,0,0.08)",
    borderRadius: "12px",
    backgroundColor: "white",
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontWeight: "500",
    color: "#3E2C23",
    marginBottom: "20px"
  },
  divider: { display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" },
  dividerLine: { flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.08)" },
  dividerText: { color: "#999", fontSize: "13px" },
  forgotLink: {
    background: "none", border: "none",
    color: "#8B5E3C", fontSize: "13px",
    cursor: "pointer", textAlign: "left", padding: 0
  },
  registerLink: { textAlign: "center", color: "#666", fontSize: "14px", marginTop: "4px" },
  error: { color: "#e53e3e", fontSize: "14px", textAlign: "center", backgroundColor: "#fff5f5", padding: "10px", borderRadius: "8px", marginBottom: "16px" },
  success: { color: "#38a169", fontSize: "14px", textAlign: "center" }
}

export default Login