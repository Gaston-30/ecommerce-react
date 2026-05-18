import {

  createContext,
  useContext,
  useEffect,
  useState

} from "react"

const CartContext = createContext()

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

    const savedCart =
      localStorage.getItem("cartItems")

    return savedCart
      ? JSON.parse(savedCart)
      : []
  })

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    )

  }, [cartItems])

  const addToCart = (product, quantity) => {

    const existingProduct =
      cartItems.find(
        (item) => item.id === product.id
      )

    if (existingProduct) {

      const updatedCart =
        cartItems.map((item) =>

          item.id === product.id

            ? {
                ...item,
                quantity:
                  item.quantity + quantity
              }

            : item
        )

      setCartItems(updatedCart)

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity
        }
      ])
    }
  }

  const removeFromCart = (id) => {

    setCartItems(
      cartItems.filter(
        (item) => item.id !== id
      )
    )
  }

  const increaseQuantity = (id) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id

          ? {
              ...item,
              quantity: item.quantity + 1
            }

          : item
      )
    )
  }

  const decreaseQuantity = (id) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id

          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1
            }

          : item
      )
    )
  }

  const totalItems =
    cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    )

  const subtotal =
    cartItems.reduce(
      (acc, item) =>
        acc + item.precio * item.quantity,
      0
    )

  return (

    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        totalItems,

        subtotal
      }}
    >

      {children}

    </CartContext.Provider>
  )
}

export function useCart() {

  return useContext(CartContext)
}