import { useParams, useNavigate } from "react-router-dom"

import { useState } from "react"

import useProducts from "../hooks/useProducts"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { useAuth } from "../context/AuthContext"
import useShipping from "../hooks/useShipping"

import { motion } from "framer-motion"

function ProductDetail() {


  const { id } = useParams()

  const navigate = useNavigate()

  const { user } = useAuth()

  const { products, loading } = useProducts()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    
  const [quantity, setQuantity] = useState(1)  

  const [inCart, setInCart] = useState(false)

  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null)
  
  const { zona, loading: loadingZona, cpManual, calcularDesdeCP } = useShipping()

  const {

    addToFavorites,

    removeFromFavorites,

    isFavorite

  } = useFavorites()

  const { addToCart } = useCart()

  if (loading) return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "120px minmax(300px, 500px) 1fr",
      gap: isMobile ? "20px" : "40px",
      padding: isMobile ? "16px" : "80px 20px",
      maxWidth: "1400px",
      margin: "0 auto"
    }}>
      <div className="skeleton" style={{ borderRadius: "12px", height: isMobile ? "80px" : "400px" }} />
      <div className="skeleton" style={{ borderRadius: "20px", height: isMobile ? "260px" : "500px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="skeleton" style={{ height: "36px", borderRadius: "8px", width: "70%" }} />
        <div className="skeleton" style={{ height: "52px", borderRadius: "8px", width: "50%" }} />
        <div className="skeleton" style={{ height: "20px", borderRadius: "8px", width: "80%" }} />
        <div className="skeleton" style={{ height: "20px", borderRadius: "8px", width: "60%" }} />
        <div className="skeleton" style={{ height: "80px", borderRadius: "12px" }} />
        <div className="skeleton" style={{ height: "48px", borderRadius: "14px" }} />
        <div className="skeleton" style={{ height: "48px", borderRadius: "14px" }} />
      </div>
    </div>
  )

  const product = products.find(
    (p) => p.id === Number(id)
  )

  if (!product) {
    return <h1>Producto no encontrado</h1>
  }

  const selectedImage = product.imagenes[selectedImageIndex]
  const precioMostrado = varianteSeleccionada ? varianteSeleccionada.precio : product.precio  
  const cuotas = (product.precio / 6).toFixed(2)

  return (

    <div style={styles.container}>

        <div style={styles.gallery}>

          {product.imagenes.map((img, index) => (

            <img

              key={index}

              src={img}

              alt="miniatura"

              style={{

                ...styles.thumbnail,

                border:
                  selectedImage === img
                  ? "2px solid #8B5E3C"
                  : "2px solid transparent"

              }}

              onClick={() => setSelectedImageIndex(index)}

            />

          ))}

      </div>

      <motion.img
        src={selectedImage}
        alt={product.nombre}
        style={styles.image}
        whileHover={
          !isMobile
            ? { scale: 1.02 }
            : {}
        }
      />

      <div style={styles.info}>

        <h1>{product.nombre}</h1>

        <h2 style={styles.price}>
          ${precioMostrado.toLocaleString("es-AR")}
        </h2>

        {product.variantes && product.variantes.length > 0 && (
          <div>
            <p style={{ fontWeight: "600", color: "#3E2C23", marginBottom: "10px", fontSize: "15px" }}>
              Medida:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {product.variantes.map((v, i) => {
                const agotada = v.stock === 0
                const seleccionada = varianteSeleccionada?.medida === v.medida
                return (
                  <motion.button
                    key={i}
                    onClick={() => !agotada && setVarianteSeleccionada(v)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: seleccionada ? "2px solid #8B5E3C" : "1.5px solid #D6B79A",
                      backgroundColor: agotada ? "#F5F5F5" : seleccionada ? "#F5EEE6" : "white",
                      color: agotada ? "#BBBBBB" : seleccionada ? "#8B5E3C" : "#3E2C23",
                      fontSize: "14px",
                      fontWeight: seleccionada ? "700" : "500",
                      cursor: agotada ? "not-allowed" : "pointer",
                      textDecoration: agotada ? "line-through" : "none",
                      fontFamily: "inherit",
                      transition: "all 0.18s ease",
                    }}
                    whileHover={!agotada ? { scale: 1.05 } : {}}
                    whileTap={!agotada ? { scale: 0.97 } : {}}
                  >
                    {v.medida}
                    {agotada && (
                      <span style={{ fontSize: "10px", display: "block", color: "#BBBBBB" }}>
                        Sin stock
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
            {varianteSeleccionada && (
              <motion.p
                key={varianteSeleccionada.precio}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: "12px", fontSize: "13px", color: "#888" }}
              >
                Stock disponible: {varianteSeleccionada.stock} unidades
              </motion.p>
            )}
          </div>
        )}
        <p style={styles.installments}>

          💳 Hasta 3 cuotas sin interés

        </p>

        <p style={styles.discount}>

          15% OFF pagando por transferencia o efectivo

        </p>

        <div style={styles.shippingBox}>
          <p style={{ fontWeight: "600", color: "#3E2C23", marginBottom: "8px", fontSize: "15px" }}>
            🚚 Envío
          </p>
          {loadingZona ? (
            <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>Calculando...</p>
          ) : zona ? (
            <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>
              {zona.esLocal
                ? "A coordinar con el vendedor"
                : `${zona.nombre} — `}
              {!zona.esLocal && <strong>${zona.costo.toLocaleString()}</strong>}
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
                Ingresá tu código postal para ver el costo:
              </p>
              <input
                type="text"
                placeholder="Ej: 5000"
                value={cpManual}
                onChange={(e) => calcularDesdeCP(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "14px", outline: "none", width: "140px" }}
              />
            </div>
          )}


     
          {product.colores && product.colores.length > 0 && (
            <div>
              <h3>Colores disponibles</h3>
              <div style={styles.colors}>
                {product.colores.map((color, i) => (
                  <div
                    key={i}
                    style={{ ...styles.color, backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        <div style={styles.quantityContainer}>
          <motion.button
            style={styles.qtyBtn}
            whileHover={{ scale: 1.1, backgroundColor: "#E8D5C0" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { if (quantity > 1) setQuantity(quantity - 1) }}
          >
            −
          </motion.button>

          <span style={{ fontSize: "16px", fontWeight: "600", color: "#3E2C23", minWidth: "24px", textAlign: "center" }}>
            {quantity}
          </span>

          <motion.button
            style={styles.qtyBtn}
            whileHover={{ scale: 1.1, backgroundColor: "#E8D5C0" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { if (quantity < product.stock) setQuantity(quantity + 1) }}
          >
            +
          </motion.button>
                  

          <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
            {product.stock} unidades disponibles
          </p>
        </div>

        <motion.button
          style={{
            ...styles.cartButton,
            opacity: (product.variantes?.length > 0 && !varianteSeleccionada) ? 0.5 : 1,
            cursor: (product.variantes?.length > 0 && !varianteSeleccionada) ? "not-allowed" : "pointer"
          }}
          onClick={() => {
            if (product.variantes?.length > 0 && !varianteSeleccionada) return
            if (!user) { navigate("/register"); return }
            if (inCart) { navigate("/cart"); return }
            addToCart({ ...product, precio: precioMostrado }, quantity)
            setInCart(true)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          {product.variantes?.length > 0 && !varianteSeleccionada
            ? "Seleccioná una medida"
            : inCart ? "Ver en carrito →" : "Agregar al carrito"
          }
        </motion.button>

        <motion.button

          style={styles.favoriteButton}

          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}

          onClick={() => {
            if (!user) { navigate("/register"); return }
            if (isFavorite(product.id)) {
              navigate("/favorites")
            } else {
              addToFavorites(product)
            }
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >

          {isFavorite(product.id)

            ? "❤️ Ver favoritos →"

            : "🤍 Agregar a favoritos"}

        </motion.button>
      
              <div style={styles.securityInfo}>

          <p>🔒 Compra segura</p>

          <p>📦 Envíos a todo el país</p>

        </div>

      </div>

      <div style={styles.descriptionBox}>

        <h2>
          Descripción
        </h2>

        <p>
          {product.descripcion}
        </p>

      </div>


            <div style={styles.similarSection}>
              <h2>Productos similares</h2>
                <div style={styles.similarGrid}>
                  {products
                    .filter((p) => p.id !== product.id && p.categoria === product.categoria)
                    .slice(0, 4)
                    .map((p) => (
                      <div key={p.id} style={styles.cardWrapper}>
                        <ProductCard product={p} />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
  )
}

const isMobile =
  window.matchMedia("(max-width: 768px)").matches

const styles = {

  container: {
    display: "grid",
    gridTemplateColumns:
      isMobile
        ? "1fr"
        : "120px minmax(300px, 500px) 1fr",
    gridTemplateAreas:
      isMobile
        ? `
          "image"
          "gallery"
          "info"
          "description"
          "similar"
        `
        : `
          "gallery image info"
          "description description description"
          "similar similar similar"
        `,
    gap:
      isMobile
        ? "16px"
        : "40px",
    padding:
      isMobile
        ? "16px"
        : "80px 20px",
    width: "100%",
    maxWidth: isMobile ? "100%" : "1400px",
    margin: "0 auto",
    alignItems: "center",
    overflowX: "hidden",
    boxSizing: "border-box"
  },

 image: {
    width: "100%",
    maxWidth:
      isMobile
        ? "100%"
        : "500px",
    minWidth: 0,
    height:
      isMobile
        ? "260px"
        : "500px",
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.12)",
    transition: "0.3s",
    gridArea: "image",
    justifySelf: "stretch",
    alignSelf: "center",      
    display: "block",
    boxSizing: "border-box"
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    gridArea: "info",
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
    boxSizing: "border-box",    
  },

  cartButton: {
    padding: isMobile ? "10px" : "14px",
    backgroundColor: "#8B5E3C",
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize:
      isMobile
        ? "14px"
        : "15px",
    fontWeight: "600",
    width: isMobile ? "100%" : "320px",
    maxWidth:
      isMobile
        ? "100%"
        : "320px"
  },

  colors: {
    display: "flex",
    gap: "10px"
  },

  color: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid black",
    cursor: "pointer"
  },

  favoriteButton: {
    padding: isMobile ? "10px" : "14px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "#D6B79A",
    color: "#3E2C23",
    cursor: "pointer",
    fontSize:
      isMobile
        ? "14px"
        : "16px",
    transition: "0.3s",
    width: isMobile ? "100%" : "320px",
    maxWidth:
      isMobile
        ? "100%"
        : "320px"
  },
    
  price: {
    fontSize:
      isMobile
        ? "28px"
        : "42px",
    color: "#3E2C23",
    fontWeight: "700"
  },

  installments: {
    color: "#666",
    fontSize: "16px"
  },

  discount: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: "15px"
  },

  securityInfo: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#666",
    fontSize: "14px"
  },

  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "fit-content",
    maxWidth: "100%"
  },

  qtyBtn: {
    width: "32px",
    height: "32px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#F8F5F2",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    color: "#3E2C23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  },

  gallery: {
    position: "relative",
    display: "flex",
    flexDirection:
      isMobile
        ? "row"
        : "column",
    gap: "12px",
    overflowX:
      isMobile
        ? "auto"
        : "visible",
    width:
      isMobile
        ? "100%"
        : "auto",
    justifyContent:
      isMobile
        ? "flex-start"
        : "center",
    alignSelf: "center",
    flexWrap: "nowrap",
    gridArea: "gallery",
    paddingBottom:
      isMobile
        ? "10px"
        : "0px"
  },

  thumbnail: {
    width:
      isMobile
        ? "70px"
        : "100px",
    height:
      isMobile
        ? "70px"
        : "100px",
    objectFit: "cover",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.3s",
    flexShrink: 0,
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.08)"
  },

  descriptionBox: {
    gridColumn: isMobile ? "auto" : "1 / -1",
    marginTop:
      isMobile
        ? "40px"
        : "80px",
    padding:
      isMobile
        ? "20px"
        : "30px",
    backgroundColor: "#F8F5F2",
    borderRadius: "20px",
    lineHeight: "1.8",
    color: "#555",
    width: "100%",
    maxWidth:
      isMobile
        ? "100%"
        : "900px",
    marginInline: "auto",
    textAlign:
      isMobile
        ? "center"
        : "left",
    gridArea: "description",
    boxSizing: "border-box"
  },

  similarSection: {
    marginTop:
      isMobile
        ? "40px"
        : "100px",
    textAlign: "center",
    overflow: "visible",
    gridArea: "similar",
    width: "100%",
    maxWidth: "100%",   
    minWidth: 0,
  },

  similarGrid: {
    marginTop: "20px",
    display: "flex",
    gap: "30px",
    overflowX: isMobile ? "auto" : "visible",
    overflowY: "visible",
    scrollBehavior: "smooth",
    paddingBottom: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    justifyContent: isMobile ? "flex-start" : "center",
    WebkitOverflowScrolling: "touch",
  },

  similarCard: {
    minWidth:
      isMobile
        ? "220px"
        : "240px",
    maxWidth:
      isMobile
        ? "220px"
        : "240px",
    flexShrink: 0
  },
  
  similarSlider: {
    marginTop: "30px",
    display: "flex",
    gap: "25px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    paddingBottom: "10px"
  },

  cardWrapper: {
    width: isMobile ? "140px" : "220px",
    minWidth: isMobile ? "140px" : "220px",
    maxWidth: isMobile ? "140px" : "220px",
    flexShrink: 0,
  },

}

export default ProductDetail