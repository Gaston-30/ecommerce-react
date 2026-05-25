import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const err = await signIn(email, password)
    if (err) {
      setError("Correo o contraseña incorrectos")
    } else {
      navigate("/")
    }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    const err = await resetPassword(resetEmail)
    if (err) {
      setError("No se pudo enviar el correo")
    } else {
      setResetSent(true)
    }
  }

  const handleGoogle = async () => {
    const err = await signInWithGoogle()
    if (err) setError("Error al iniciar con Google")
  }

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={styles.card}>
        <h1 style={styles.title}>Iniciar Sesión</h1>

        {error && <p style={styles.error}>{error}</p>}

        {!showReset ? (
          <>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Ingresar
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                style={{ width: "20px", height: "20px" }}
              />
              Continuar con Google
            </motion.button>

            <Link to="/register" style={styles.link}>
              ¿No tenés cuenta? Crear cuenta
            </Link>
          </>
        ) : (
          <form onSubmit={handleReset} style={styles.form}>
            {resetSent ? (
              <p style={styles.success}>
                ✅ Te enviamos un correo para restablecer tu contraseña
              </p>
            ) : (
              <>
                <p style={styles.resetText}>
                  Ingresá tu correo y te mandamos un link para restablecer tu contraseña.
                </p>
                <input
                  type="email"
                  placeholder="Tu correo"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  style={styles.input}
                  required
                />
                <motion.button
                  type="submit"
                  style={styles.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Enviar correo
                </motion.button>
              </>
            )}
            <button
              type="button"
              style={styles.forgotLink}
              onClick={() => { setShowReset(false); setResetSent(false) }}
            >
              ← Volver al login
            </button>
          </form>
        )}
      </div>
    </motion.div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F5F2"
  },
  card: {
    width: "400px",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  title: {
    textAlign: "center",
    color: "#3E2C23",
    marginBottom: "8px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.08)",
    backgroundColor: "rgba(255,255,255,0.9)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
    fontSize: "15px",
    outline: "none"
  },
  button: {
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#8B5E3C",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600"
  },
  googleButton: {
    padding: "14px",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
    backgroundColor: "white",
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontWeight: "500",
    color: "#3E2C23"
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "rgba(0,0,0,0.08)"
  },
  dividerText: {
    color: "#999",
    fontSize: "14px"
  },
  link: {
    textAlign: "center",
    color: "#8B5E3C",
    fontSize: "14px"
  },
  forgotLink: {
    background: "none",
    border: "none",
    color: "#8B5E3C",
    fontSize: "13px",
    cursor: "pointer",
    textAlign: "left",
    padding: 0
  },
  error: {
    color: "#e53e3e",
    fontSize: "14px",
    textAlign: "center"
  },
  success: {
    color: "#38a169",
    fontSize: "14px",
    textAlign: "center"
  },
  resetText: {
    color: "#666",
    fontSize: "14px",
    lineHeight: "1.5"
  }
}

export default Login