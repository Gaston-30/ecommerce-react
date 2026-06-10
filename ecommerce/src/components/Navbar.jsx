import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { useNavigate } from "react-router-dom"
import { useFilter } from "../context/FilterContext"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import useProfile from "../hooks/useProfile"

function Navbar() {
  const { user } = useAuth()
  const { profile } = useProfile()

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

  const [scrolled, setScrolled] = useState(false)

useEffect(() => {

  const handleScroll = () => {
    setScrolled(window.scrollY > 20)
  }

  window.addEventListener("scroll", handleScroll)

  return () =>
    window.removeEventListener("scroll", handleScroll)

  }, [])

  return (

    <>

      <nav
        style={{
          ...styles.navbar,

          backgroundColor:
            scrolled
              ? "rgba(255,255,255,0.95)"
              : "transparent",

          backdropFilter:
            scrolled
              ? "blur(10px)"
              : "none",

          boxShadow:
            scrolled
              ? "0 4px 20px rgba(0,0,0,0.08)"
              : "none",

          transition: "0.3s"
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

        {!isMobile && (
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
        )}
        
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

            style={{...styles.search}}
          />

          {/* LOGIN */}

          <Link
            to={user ? "/perfil" : "/login"}
            style={{ ...styles.iconContainer, gap: "8px", textDecoration: "none" }}
          >
            <button
              style={styles.iconButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {profile?.avatar_url
                ? <img src={profile.avatar_url} alt="avatar" style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
                : "👤"
              }
            </button>
            {user && profile?.nombre_completo && (
              <span style={{ fontSize: "14px", color: "#3E2C23", fontWeight: "500", textDecoration: "underline" }}>
                {profile.nombre_completo}
              </span>
            )}
          </Link>

          {/* FAVORITOS */}

          <motion.div

            whileTap={{ scale: 0.9 }}

            animate={{
              y:
                favorites.length > 0
                  ? [0, -5, 0]
                  : 0
            }}

            transition={{
              duration: 0.4
            }}
          >

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

                <motion.span

                  style={styles.badge}

                  key={favorites.length}

                  initial={{
                    scale: 0
                  }}

                  animate={{
                    scale: 1.2
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >

                  {favorites.length}

                </motion.span>

              )}

            </Link>

          </motion.div>

          {/* CARRITO */}

          <motion.div

            whileTap={{ scale: 0.9 }}

            animate={{
              y:
                totalItems > 0
                  ? [0, -5, 0]
                  : 0
            }}

            transition={{
              duration: 0.4
            }}
          >

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

                <motion.span

                  style={styles.badge}

                  key={totalItems}

                  initial={{
                    scale: 0
                  }}

                  animate={{
                    scale: 1.2
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >

                  {totalItems}

                </motion.span>

              )}

            </Link>

          </motion.div>

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
    flexWrap: "nowrap",
    padding:
      window.innerWidth < 768
        ? "12px 14px"
        : "20px 30px",
    backgroundColor: "#F5EEE6",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 999,
    width: "100%",
    transition: "0.3s",
    backdropFilter: "blur(10px)",
    overflow: "hidden"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap:
      window.innerWidth < 768
        ? "10px"
        : "20px",
    flexShrink: 0
  },

  center: {
    display: "flex",
    gap: "35px"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap:
      window.innerWidth < 768
        ? "4px"
        : "12px",
    flexShrink: 1,
    minWidth: 0
  },

  logo: {
    height:
      window.innerWidth < 768
        ? "42px"
        : "58px",
    width:
      window.innerWidth < 768
        ? "42px"
        : "58px",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
    flexShrink: 0
  },

  navLink: {
    textDecoration: "none",
    color: "#3E2C23",
    fontWeight: "500",
    fontSize: "15px",
    position: "relative",
    transition: "0.3s"
  },

  search: {
    width:
      window.innerWidth < 768
        ? "90px"
        : "180px",
    padding:
      window.innerWidth < 768
        ? "8px 10px"
        : "12px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(0,0,0,0.08)",
    outline: "none",
    backgroundColor:
      "rgba(255,255,255,0.8)",
    backdropFilter:
      "blur(10px)",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.04)",
    fontSize:
      window.innerWidth < 768
        ? "12px"
        : "14px",
    transition: "0.3s",
    minWidth: 0
  },

  iconButton: {
    fontSize:
      window.innerWidth < 768
        ? "18px"
        : "24px",
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: "0.3s",
    padding:
      window.innerWidth < 768
        ? "4px"
        : "8px",
    borderRadius: "12px",
    flexShrink: 0
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
    minWidth:
      window.innerWidth < 768
        ? "14px"
        : "18px",
    height:
      window.innerWidth < 768
        ? "14px"
        : "18px",
    padding: "2px",
    borderRadius: "50%",
    backgroundColor: "#8B5E3C",
    color: "white",
    fontSize:
      window.innerWidth < 768
        ? "9px"
        : "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.15)"
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "260px",
    minHeight: "100vh",
    backgroundColor: "#f5eee6",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    transition:
    "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    zIndex: 1000,
    boxShadow:
      "0 0 30px rgba(0,0,0,0.1)"
  },

  closeButton: {
    alignSelf: "flex-end",
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer"
  },

  categoryButton: {
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "#D6B79A",
    cursor: "pointer",
    transition: "0.3s",
    color: "#3E2C23",
    fontWeight: "500",
    fontSize: "16px",
    textAlign: "center",
  },

  subCategoryButton: {
    width: "90%",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#E8D9C8",
    color: "#3E2C23",
    cursor: "pointer",
    transition: "0.3s",
    marginLeft: "10px",
    fontWeight: "500",
    fontSize: "15px",
    textAlign: "center",
  },

  mobileLink: {
    width: "100%",
    textDecoration: "none",
    backgroundColor: "#D6B79A",
    color: "#3E2C23",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: "500",
    fontSize: "16px",
    textAlign: "center",
    boxSizing: "border-box"
  },

}

export default Navbar