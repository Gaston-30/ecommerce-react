import { useParams } from "react-router-dom"

import { useState } from "react"

import productsData from "../data/Products"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"

function ProductDetail() {

  const { id } = useParams()

  const product = productsData.find(
    (p) => p.id === Number(id)
  )

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

      <img
        src={product.imagen}
        alt={product.nombre}
        style={styles.image}
      />

      <div style={styles.info}>

        <h1>{product.nombre}</h1>

        <h2>${product.precio}</h2>

        <p>
          6 cuotas de ${cuotas}
        </p>

        <p>
          Envío: $5000
        </p>

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

          <button
            onClick={() => {

              if (quantity > 1) {
                setQuantity(quantity - 1)
              }

            }}
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <button
          style={styles.cartButton}
          onClick={() => {
            addToCart(product, quantity)

            setInCart(true)
          }}
        >

          {inCart
            ? "En el carrito"
            : "Agregar al carrito"}

        </button>

        <button

          style={styles.favoriteButton}

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

        </button>
      
      </div>

    </div>

  )
}

const styles = {

  container: {
    display: "flex",
    flexDirection:
    window.innerWidth < 768
      ? "column"
      : "row",
    gap: "50px",
    padding: "50px",
    alignItems: "flex-start"
  },

  image: {
    width:
    window.innerWidth < 768
      ? "100%"
      : "500px",
    height:
    window.innerWidth < 768
      ? "300px"
      : "500px",
    borderRadius: "10px"
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  cartButton: {
    padding: "15px",
    backgroundColor: "#8B5E3C",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
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
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#D6B79A",
    color: "#3E2C23",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s"
  },

}

export default ProductDetail