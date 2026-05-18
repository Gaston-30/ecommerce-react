import { useNavigate } from "react-router-dom"
import { useState } from "react"

function CheckoutAddress() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    direccion: "",

    ciudad: "",

    codigoPostal: "",

    telefono: ""
  })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    navigate("/checkout/payment")
  }

  return (

    <div style={styles.page}>

      <form
        style={styles.form}
        onSubmit={handleSubmit}
      >

        <h1 style={styles.title}>
          Dirección de entrega
        </h1>

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"

          value={formData.direccion}

          onChange={handleChange}

          style={styles.input}

          required
        />

        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"

          value={formData.ciudad}

          onChange={handleChange}

          style={styles.input}

          required
        />

        <input
          type="text"
          name="codigoPostal"
          placeholder="Código postal"

          value={formData.codigoPostal}

          onChange={handleChange}

          style={styles.input}

          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"

          value={formData.telefono}

          onChange={handleChange}

          style={styles.input}

          required
        />

        <button
          type="submit"
          style={styles.button}
        >

          Continuar

        </button>

      </form>

    </div>
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

  form: {

    width: "400px",

    backgroundColor: "white",

    padding: "40px",

    borderRadius: "20px",

    boxShadow:
      "0 2px 15px rgba(0,0,0,0.08)",

    display: "flex",

    flexDirection: "column",

    gap: "20px"
  },

  title: {

    textAlign: "center",

    color: "#3E2C23"
  },

  input: {

    padding: "15px",

    borderRadius: "10px",

    border: "1px solid #ccc",

    fontSize: "15px"
  },

  button: {

    padding: "15px",

    border: "none",

    borderRadius: "10px",

    backgroundColor: "#8B5E3C",

    color: "white",

    fontSize: "16px",

    cursor: "pointer",

    transition: "0.3s"
  }

}

export default CheckoutAddress