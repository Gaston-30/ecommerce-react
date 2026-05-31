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
    setCartItems(prev => {
      const existingProduct = prev.find((item) => item.id === product.id)
      const currentQty = existingProduct ? existingProduct.quantity : 0
      const maxAllowed = product.stock - currentQty

      if (maxAllowed <= 0) return prev

      const actualQty = Math.min(quantity, maxAllowed)

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + actualQty }
            : item
        )
      } else {
        return [...prev, { ...product, quantity: actualQty }]
      }
    })
  }

  const removeFromCart = (id) => {

    setCartItems(
      cartItems.filter(
        (item) => item.id !== id
      )
    )
  }

  const increaseQuantity = (id) => {
    setCartItems(prev => prev.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity < item.stock ? item.quantity + 1 : item.quantity }
        : item
    ))
  }

  const decreaseQuantity = (id) => {
    setCartItems(prev => prev.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    ))
  }

  const clearCart = () => setCartItems([])

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

        subtotal,
        
        clearCart 
      }}
    >

      {children}

    </CartContext.Provider>
  )
}

export function useCart() {

  return useContext(CartContext)
}