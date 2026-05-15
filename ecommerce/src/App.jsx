import { useState } from "react"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import SearchBar from "./components/SearchBar"
import Products from "./components/Products"

import productsData from "./data/products"

function App() {

  const [search, setSearch] = useState("")

  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredProducts = productsData.filter((product) => {

    const matchesSearch =
      product.nombre
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "" ||
      product.categoria === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <>

      <Navbar
        setSelectedCategory={setSelectedCategory}
      />

      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <Products
        products={filteredProducts}
      />

    </>
  )
}

export default App