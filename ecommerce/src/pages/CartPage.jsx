import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function CartPage() {

  const [error, setError] = useState(false)

  const {

    cartItems,

    subtotal,

    increaseQuantity,

    decreaseQuantity,

    removeFromCart

  } = useCart()

  const shipping = subtotal > 0 ? 3500 : 0

  const total = subtotal + shipping

  const navigate = useNavigate()

  const isMobile = window.innerWidth <= 768

  return (

      <div

        style={{

          ...styles.page,

          paddingBottom:
            isMobile
              ? "220px"
              : "40px"
        }}
      >

      <div style={styles.left}>

        <h1 style={styles.title}>
          Mi carrito
        </h1>

        {cartItems.length === 0 ? (

          <p>
            No hay productos en el carrito.
          </p>

        ) : (

          cartItems.map((product) => (

            <div
              key={product.id}
              style={styles.card}
            >

              <img
                src={product.imagen}
                alt={product.nombre}
                style={styles.image}
              />

              <div style={styles.info}>

                <h2>
                  {product.nombre}
                </h2>

                <p>
                  Color:
                  {" "}
                  Beige
                </p>

                <div style={styles.quantity}>

                  <button
                    style={styles.qtyButton}
                    onClick={() =>
                      decreaseQuantity(product.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    x{product.quantity}
                  </span>

                  <button
                    style={styles.qtyButton}
                    onClick={() =>
                      increaseQuantity(product.id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  style={styles.removeButton}
                  onClick={() =>
                    removeFromCart(product.id)
                  }
                >
                  Eliminar
                </button>

              </div>

              <h2 style={styles.price}>

                $
                {(
                  product.precio *
                  product.quantity
                ).toLocaleString()}

              </h2>

            </div>
          ))
        )}

      </div>

      {cartItems.length > 0 && (

      <div

        style={

          isMobile

            ? styles.mobileSummary

            : styles.summary

        }
      >

        <h2>
          Resumen
        </h2>

        <div style={styles.row}>

          <span>
            Productos
          </span>

          <span>
            $
            {subtotal.toLocaleString()}
          </span>

        </div>

        <div style={styles.row}>

          <span>
            Envío
          </span>

          <span>
            $
            {shipping.toLocaleString()}
          </span>

        </div>

        <hr />

        <div style={styles.row}>

          <strong>
            Total
          </strong>

          <strong>
            $
            {total.toLocaleString()}
          </strong>

        </div>          

        <button

          style={{
            ...styles.checkoutButton,

            opacity:
              cartItems.length === 0
                ? 0.6
                : 1,

            cursor:
              cartItems.length === 0
                ? "not-allowed"
                : "pointer",

            animation:
              error
                ? "shake 0.3s"
                : "none"
            }}

            onClick={() => {

              if(cartItems.length === 0){

                setError(true)

                setTimeout(() => {

                  setError(false)

              }, 2500)

                return
              }

              navigate("/checkout/address")
            }}

            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition =
              "left bottom"
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition =
              "right bottom"
            }}
          >

            Confirmar compra

          </button>
        {
          error && (

          <p style={styles.error}>

            Añade productos al carrito

          </p>
          )
        }
      </div>
  
      )}

    </div>
  )
}

const styles = {

  page: {
    display: "flex",
    flexDirection:
    window.innerWidth < 768
      ? "column"
      : "row",
    gap: "40px",
    padding: "40px",
    alignItems: "flex-start",
    paddingBottom:
      window.innerWidth < 768
        ? "170px"
        : "40px",
  },

  left: {
    flex: 3
  },

  title: {
    marginBottom: "30px",
    color: "#3E2C23"
  },

  card: {
    display: "flex",
    flexDirection:
      window.innerWidth < 768
        ? "column"
        : "row",
    alignItems:
      window.innerWidth < 768
        ? "flex-start"
        : "center",
    gap: "20px",
    backgroundColor: "#fff",
    padding:
      window.innerWidth < 768
        ? "15px"
        : "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
    width: "100%",
    boxSizing: "border-box"
  },

  image: {
    width:
      window.innerWidth < 768
        ? "100%"
        : "130px",
    height:
      window.innerWidth < 768
        ? "180px"
        : "130px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  info: {
    flex: 1,
    marginLeft:
      window.innerWidth < 768
        ? "0"
        : "25px",
    width: "100%"
  },

  quantity: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px"
  },

  qtyButton: {
    width: "30px",
    height: "30px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#D6B79A",
    cursor: "pointer"
  },

  removeButton: {
    marginTop: "15px",
    border: "none",
    background: "none",
    color: "#8B5E3C",
    cursor: "pointer"
  },

  price: {
    color: "#3E2C23",

    alignSelf:
      window.innerWidth < 768
        ? "flex-end"
        : "center",

    marginTop:
      window.innerWidth < 768
        ? "10px"
        : "0"
  },

  summary: {
    flex: 1,
    position: "sticky",
    top: "100px",
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)"
  },

  mobileSummary: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
    padding: "20px",
    boxShadow:
      "0 -2px 10px rgba(0,0,0,0.1)",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    zIndex: 999
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0"
  },

  shake: {
    animation: "shake 0.3s"
  },
  checkoutButton: {
    width: "100%",
    marginTop: "25px",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right, #8B5E3C 50%, #D6B79A 50%)",
    backgroundSize: "200% 100%",
    backgroundPosition: "right bottom",
    color: "white",
    fontSize: "16px",
    transition: "all 0.5s ease"
  },

  error: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
    fontWeight: "bold"
  },

}

export default CartPage