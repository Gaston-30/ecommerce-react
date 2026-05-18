import {

  FaInstagram,
  FaPhone,
  FaMapMarkerAlt

} from "react-icons/fa"

function Footer() {

  return (

    <footer style={styles.footer}>

      <h2 style={styles.title}>
        Contacto
      </h2>

      <div style={styles.content}>

        <div style={styles.item}>

          <FaPhone />

          <span>
            +54 9 3584 82-9701
          </span>

        </div>

        <a
          href="https://instagram.com/blancohogar.decohome"
          target="_blank"
          rel="noopener noreferrer"

          style={styles.link}
        >

          <div style={styles.item}>

            <FaInstagram />

            <span>
              @blancohogar.decohome
            </span>

          </div>

        </a>

        <div>

          <h3>
            Encontranos en:
          </h3>

          <div style={styles.item}>

            <FaMapMarkerAlt />

            <span>
              Vélez Sarsfield 365
            </span>

          </div>

        </div>

      </div>

    </footer>

  )
}

const styles = {

  footer: {

    marginTop: "100px",

    backgroundColor: "#E8D9C8",

    padding: "60px 40px",

    color: "#3E2C23"
  },

  title: {

    textAlign: "center",

    marginBottom: "40px",

    fontSize: "34px"
  },

  content: {

    display: "flex",

    flexDirection: "column",

    gap: "25px",

    alignItems: "center"
  },

  item: {

    display: "flex",

    alignItems: "center",

    gap: "12px",

    fontSize: "20px"
  },

  link: {
    textDecoration: "none",
    color: "#3E2C23"
  }

}

export default Footer