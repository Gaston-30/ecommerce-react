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
import SearchResults from "./pages/SearchResults"
import ProductsPage from "./pages/ProductsPage"
import CompleteProfile from "./pages/CompleteProfile"
import CheckoutConfirm from "./pages/CheckoutConfirm"
import CheckoutPayment from "./pages/CheckoutPayment"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import CheckoutFailure from "./pages/CheckoutFailure"
import CheckoutPending from "./pages/CheckoutPending"
import ScrollToTop from "./components/ScrollToTop"
import CookieBanner from "./components/CookieBanner"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"

function App() {

  const SITIO_ACTIVO = true // Cambiar a true para activar el sitio

  if (!SITIO_ACTIVO) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F8F5F2" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1 style={{ color: "#3E2C23", fontSize: "28px", marginBottom: "12px" }}>🔒 Sitio en mantenimiento</h1>
          <p style={{ color: "#888" }}>Volvemos pronto. ¡Gracias por tu paciencia!</p>
        </div>
      </div>
    )
  }

  return (

    <BrowserRouter>

      <ScrollToTop />
      
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
          path="/checkout/confirm"
          element={<CheckoutConfirm />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/complete-profile"
          element={<CompleteProfile />}
        />

        <Route
          path="/perfil"
          element={<CompleteProfile />}
        />

        <Route 
          path="/checkout/payment" 
          element={<CheckoutPayment />} 
        />
        
        <Route 
          path="/checkout/success" 
          element={<CheckoutSuccess />} 
        />

        <Route 
          path="/checkout/failure"  
          element={<CheckoutFailure />} 
        />

        <Route 
          path="/checkout/pending"  
          element={<CheckoutPending />}   
        />

        <Route 
          path="/privacidad" 
          element={<PrivacyPolicy />} 
        />

        <Route 
          path="/terminos" 
          element={<TermsAndConditions />} 
        />

      </Routes>

      <FloatingWhatsApp />

      <CookieBanner />

      <Footer />

    </BrowserRouter>
  )
}

export default App