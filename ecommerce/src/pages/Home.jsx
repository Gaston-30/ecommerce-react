import { useState } from "react"

import Hero from "../components/Hero"
import ProductSection from "../components/ProductSection"

import useProducts from "../hooks/useProducts"
import { useFilter } from "../context/FilterContext"

function Home() {

  const { products, loading } = useProducts() 
  const { selectedCategory } = useFilter()

  if (loading) return <p>Cargando...</p>

  const filteredProducts = products.filter((product) => {


    const matchesCategory =
      selectedCategory === "" ||
      product.categoria === selectedCategory

    return matchesCategory
  })

  return (

    <>

      <Hero />

      <ProductSection
        title="Novedades"
        products={filteredProducts}
      />

      <ProductSection
        title="Descuentos"
        products={filteredProducts}
      />

      <ProductSection
        title="Festividades"
        products={filteredProducts}
      />

    </>

  )
}

export default Home