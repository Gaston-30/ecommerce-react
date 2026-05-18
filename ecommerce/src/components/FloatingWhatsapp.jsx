import { FaWhatsapp } from "react-icons/fa"

function FloatingWhatsApp() {

  return (

    <a
      href="https://wa.me/5493584829701"
      target="_blank"
      rel="noopener noreferrer"

      style={styles.whatsapp}
    >

      <FaWhatsapp style={styles.icon} />

    </a>

  )
}

const styles = {

  whatsapp: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#25D366",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.25)",
    zIndex: 9999
  },

  icon: {
    fontSize: "34px",
    color: "white"
  }

}

export default FloatingWhatsApp