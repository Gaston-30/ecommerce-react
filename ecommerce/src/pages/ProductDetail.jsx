import { useParams } from "react-router-dom"

import { useState } from "react"

import productsData from "../data/Products"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"

import { motion } from "framer-motion"

function ProductDetail() {


  const { id } = useParams()

  const product = productsData.find(
    (p) => p.id === Number(id)
  )
  const [selectedImage, setSelectedImage] =
    useState(product.imagenes[0])
  const [quantity, setQuantity] = useState(1)

  const [inCart, setInCart] = useState(false)

  const { addToCart } = useCart()

  const {

    addToFavorites,

    removeFromFavorites,

    isFavorite

  } = useFavorites()

  if (!product) {
    return <h1>Producto no encontrado</h1>
  }

  const cuotas =
    (product.precio / 6).toFixed(2)

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

              onClick={() =>
                setSelectedImage(img)
              }

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

          ${product.precio}

        </h2>

        <p style={styles.installments}>

          💳 Hasta 3 cuotas sin interés

        </p>

        <p style={styles.discount}>

          10% OFF pagando por transferencia o efectivo

        </p>

        <div style={styles.shippingBox}>


        <p>
          Costo estimado: $5000
        </p>


      </div>

        <div>

          <h3>Colores disponibles</h3>

          <div style={styles.colors}>

            <div style={{
              ...styles.color,
              backgroundColor: "beige"
            }} />

            <div style={{
              ...styles.color,
              backgroundColor: "brown"
            }} />

            <div style={{
              ...styles.color,
              backgroundColor: "gray"
            }} />

          </div>

        </div>

        <div style={styles.quantityContainer}>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {

              if (quantity > 1) {
                setQuantity(quantity - 1)
              }

            }}
          >
            -
          </motion.button>

          <span>{quantity}</span>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </motion.button>

        </div>

        <motion.button
          style={styles.cartButton}
          onClick={() => {
            addToCart(product, quantity)

            setInCart(true)
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >

          {inCart
            ? "En el carrito"
            : "Agregar al carrito"}

        </motion.button>

        <motion.button

          style={styles.favoriteButton}

          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}

          onClick={() => {

            if (isFavorite(product.id)) {

              removeFromFavorites(product.id)

            } else {

              addToFavorites(product)
            }
          }}
        >

          {isFavorite(product.id)

            ? "❤️ En favoritos"

            : "🤍 Agregar a favoritos"}

        </motion.button>
      
              <div style={styles.securityInfo}>

          <p>🔒 Compra segura</p>

          <p>🚚 Envíos a todo el país</p>

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

        <h2>
          Productos similares
        </h2>

        <div style={styles.similarGrid}>

          {productsData

            .filter((p) => p.id !== product.id)

            .slice(0, 4)

            .map((p) => (

          <div style={styles.cardWrapper}>
            <ProductCard
              key={p.id}
              product={p}
            />
          </div>

          ))}

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
        ? "20px"
        : "40px",
    padding:
      isMobile
        ? "16px"
        : "80px 20px",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    alignItems: "start",
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
    justifySelf: "center",
    boxSizing: "border-box"
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    gridArea: "info",
    width: "100%",
    minWidth: 0
  },

  cartButton: {
    padding:
      isMobile
        ? "10px"
        : "14px",
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
    width:
      isMobile
        ? "100%"
        : "fit-content",
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
    padding:
      isMobile
        ? "10px"
        : "14px",
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
    width:
      isMobile
        ? "100%"
        : "fit-content",
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
    gap: "20px",
    backgroundColor: "#F8F5F2",
    padding: "12px 20px",
    borderRadius: "16px",
    width: "fit-content",
    maxWidth: "100%"
  },

  quantityButton: {
    border: "none",
    width: "35px",
    height: "35px",
    borderRadius: "10px",
    backgroundColor: "#D6B79A",
    cursor: "pointer",
    fontSize: "18px"
  },

  gallery: {
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
    gridColumn: "1 / -1",
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
    overflow: "hidden"
  },

  similarGrid: {
    marginTop: "20px",
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    paddingBottom: "10px",
    alignItems: "stretch",
    width: "100%",
    boxSizing: "border-box",
    paddingLeft: "0px",
    paddingRight: "0px",
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
    width: "160px",
    minWidth: "160px",
    maxWidth: "160px",
    flexShrink: 0,
    overflow: "hidden"
  },

}

export default ProductDetail