import { useState } from "react"

import LoginModal from "./LoginModal"

function Navbar({ setSelectedCategory }) {

  const [menuOpen, setMenuOpen] = useState(false)

  const [loginOpen, setLoginOpen] = useState(false)

  const categorias = [
    "Velas",
    "Alfombras",
    "Sahumerios"
  ]

  return (

    <>
      <nav style={styles.navbar}>

        <button
          style={styles.iconButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <h2>Tienda</h2>

        <button
          style={styles.iconButton}
          onClick={() => setLoginOpen(true)}
        >
          👤
        </button>

      </nav>

      {menuOpen && (

        <div style={styles.menu}>

          <button
            style={styles.categoryButton}
            onClick={() => setSelectedCategory("")}
          >
            Todas
          </button>

          {categorias.map((categoria, index) => (

            <button
              key={index}
              style={styles.categoryButton}
              onClick={() => setSelectedCategory(categoria)}
            >
              {categoria}
            </button>

          ))}

        </div>

      )}

      <LoginModal
        isOpen={loginOpen}
        setIsOpen={setLoginOpen}
      />
    </>
  )
}

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "15px 20px",

    backgroundColor: "#E8D9C8"
  },

  iconButton: {
    fontSize: "24px",
    border: "none",
    background: "none",
    cursor: "pointer"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    backgroundColor: "#f5eee6",
    gap: "10px"
  },

  categoryButton: {
    padding: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#D6B79A"
  }

}

export default Navbar