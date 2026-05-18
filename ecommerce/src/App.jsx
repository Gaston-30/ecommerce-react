import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"
import FloatingWhatsApp from "./components/FloatingWhatsapp"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/CartPage"
import FavoritesPage from "./pages/FavoritesPage"
import CheckoutAddress from "./pages/CheckoutAddress"
import SearchResults from "./pages/SearchResults"
import ProductsPage from "./pages/ProductsPage"

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"     
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />

        <Route
          path="/checkout/address"
          element={<CheckoutAddress />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

      </Routes>

      <FloatingWhatsApp />

      <Footer />

    </BrowserRouter>
  )
}

export default App