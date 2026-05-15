function LoginModal({ isOpen, setIsOpen }) {

  if (!isOpen) return null

  return (

    <div style={styles.overlay}>

      <div style={styles.modal}>

        <button
          style={styles.closeButton}
          onClick={() => setIsOpen(false)}
        >
          X
        </button>

        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          style={styles.input}
        />

        <button style={styles.loginButton}>
          Ingresar
        </button>

        <button style={styles.registerButton}>
          ¿No tienes cuenta? Crear cuenta
        </button>

      </div>

    </div>
  )
}

const styles = {

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",

    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "10px",
    fontSize: "16px"
  },

  loginButton: {
    padding: "10px",
    backgroundColor: "#8B5E3C",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  registerButton: {
    padding: "10px",
    backgroundColor: "#C8A27A",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  closeButton: {
    alignSelf: "flex-end",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "16px"
  }

}

export default LoginModal