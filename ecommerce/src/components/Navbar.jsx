import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { useNavigate } from "react-router-dom"
import { useFilter } from "../context/FilterContext"

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [showCategories, setShowCategories] =
    useState(false)

  const [search, setSearch] =
    useState("")

  const isMobile = window.innerWidth <= 768

  const { totalItems } = useCart()

  const { favorites } =
    useFavorites()

  const categorias = [

    "Velas",

    "Alfombras",

    "Sahumerios"
  ]
  
  const navigate = useNavigate()

  const {
  setSelectedCategory,
  setSearchQuery
  } = useFilter()

  return (

    <>

      <nav
        style={{
          ...styles.navbar,

          padding: isMobile
            ? "15px"
            : "18px 35px",

          gap: isMobile
            ? "15px"
            : "0px"
        }}
      >

        {/* IZQUIERDA */}

        <div style={styles.left}>

          <button

            style={styles.iconButton}

            onClick={() =>
              setMenuOpen(true)
            }

            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "scale(1.15)"
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "scale(1)"
            }}
          >

            ☰

          </button>

          <Link
            to="/"
            style={styles.logo}
          >

            <img
              src="/logo.png"
              alt="Logo"
              style={styles.logo}
            />

          </Link>

        </div>

        {/* CENTRO */}

        {!isMobile && (

          <div style={styles.center}>

            <Link
              to="/"
              style={styles.navLink}
            >
              Inicio
            </Link>

            <Link
              to="/products"
              style={styles.navLink}
            >
              Productos
          </Link>

          <Link
            to="/contacto"
            style={styles.navLink}
          >
            Contacto
          </Link>

        </div>

      )}

        {/* DERECHA */}

        <div style={styles.right}>

          <input

            type="text"

            placeholder="Buscar..."

            value={search}

            onChange={(e) => {
              setSearch(e.target.value)
              setSearchQuery(e.target.value)

            }}

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                navigate(

                  "/search/"
                )
              }
            }}

            style={{
              ...styles.search,

              width: isMobile
                ? "120px"
                : "180px"
            }}
          />

          {/* LOGIN */}

          <Link
            to="/login"
            style={styles.iconContainer}
          >

            <button

              style={styles.iconButton}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.15)"
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "scale(1)"
              }}
            >

              👤

            </button>

          </Link>

          {/* FAVORITOS */}

          <Link
            to="/favorites"
            style={styles.iconContainer}
          >

            <button

              style={styles.iconButton}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.15)"
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "scale(1)"
              }}
            >

              ⭐

            </button>

            {favorites.length > 0 && (

              <span style={styles.badge}>

                {favorites.length}

              </span>

            )}

          </Link>

          {/* CARRITO */}

          <Link
            to="/cart"
            style={styles.iconContainer}
          >

            <button

              style={styles.iconButton}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.15)"
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "scale(1)"
              }}
            >

              🛒

            </button>

            {totalItems > 0 && (

              <span style={styles.badge}>

                {totalItems}

              </span>

            )}

          </Link>

        </div>

      </nav>

      {/* SIDEBAR */}

      <div

        style={{
          ...styles.sidebar,

          transform: menuOpen

            ? "translateX(0)"

            : "translateX(-100%)"
        }}
      >

        <button

          style={styles.closeButton}

          onClick={() =>
            setMenuOpen(false)
          }
        >

          ✕

        </button>

        {isMobile && (

          <>

            <Link
              to="/"
              style={styles.mobileLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Inicio

            </Link>

            <Link
              to="/products"
              style={styles.mobileLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Productos

            </Link>

            <Link
              to="/contacto"
              style={styles.mobileLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Contacto

            </Link>

          </>

        )}

        <button

          style={styles.categoryButton}

          onClick={() =>
            setShowCategories(
              !showCategories
            )
          }
        >

          Categorías

          {" "}

          {showCategories ? "▲" : "▼"}

        </button>

        {showCategories && (

          <>

            <button

              style={styles.subCategoryButton}

              onClick={() => {

                setSelectedCategory("")

                navigate("/")

                setMenuOpen(false)
              }}
            >

              Todas

            </button>

            {categorias.map((categoria) => (

              <button

                key={categoria}

                style={styles.subCategoryButton}

                onClick={() => {

                  setSelectedCategory(categoria)

                  navigate("/")

                  setMenuOpen(false)
                }}
              >

                {categoria}

              </button>

            ))}

          </>

        )}

      </div>

      </>
    )
  }

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#F5EEE6",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 999
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },

  center: {
    display: "flex",
    gap: "35px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap"
  },

  logo: {
    height: "55px",
    width: "55px",
    objectFit: "cover",
    borderRadius: "50%"
  },

  navLink: {
    textDecoration: "none",
    color: "#3E2C23",
    fontWeight: "500",
    transition: "0.3s"
  },

  search: {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },

  iconButton: {
    fontSize: "24px",
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: "0.3s"
  },

  iconContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none"
  },

  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    minWidth: "18px",
    height: "18px",
    padding: "2px",
    borderRadius: "50%",
    backgroundColor: "#8B5E3C",
    color: "white",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "260px",
    height: "100vh",
    backgroundColor: "#f5eee6",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    transition: "0.35s ease",
    zIndex: 1000
  },

  closeButton: {
    alignSelf: "flex-end",
    border: "none",
    background: "none",
    fontSize: "20px",
    cursor: "pointer"
  },

  categoryButton: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#D6B79A",
    cursor: "pointer",
    transition: "0.3s",
    color: "#3E2C23",
    fontWeight: "500",
    fontSize: "16px",
  },

  subCategoryButton: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#E8D9C8",
    color: "#3E2C23",
    cursor: "pointer",
    transition: "0.3s",
    marginLeft: "10px"
  },

  mobileLink: {
    textDecoration: "none",
    backgroundColor: "#D6B79A",
    color: "#3E2C23",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "500",
    textAlign: "center"
  },

}

export default Navbar