import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import { FilterProvider } from "./context/FilterContext"
import { AuthProvider } from "./context/AuthContext"  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>        
      <FilterProvider>
        <FavoritesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoritesProvider>
      </FilterProvider>
    </AuthProvider>      
  </StrictMode>,
)