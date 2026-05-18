function Register() {

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Crear Cuenta
      </h1>

      <input
        type="email"
        placeholder="Correo"
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Contraseña"
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Repetir contraseña"
        style={styles.input}
      />

      <button style={styles.button}>
        Registrarse
      </button>

    </div>

  )
}

const styles = {

  container: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
    margin: "50px auto"
  },

  input: {
    padding: "10px"
  },

  button: {
    padding: "10px",
    backgroundColor: "#8B5E3C",
    color: "white",
    border: "none"
  },

  title: {
  lineHeight: "1.5",
  letterSpacing: "1px"
  },

}

export default Register