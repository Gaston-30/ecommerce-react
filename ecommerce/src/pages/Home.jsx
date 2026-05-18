import { useState } from "react"

import Hero from "../components/Hero"
import ProductSection from "../components/ProductSection"

import productsData from "../data/Products"
import { useFilter } from "../context/FilterContext"

function Home() {

  const { selectedCategory } = useFilter()

  const filteredProducts = productsData.filter((product) => {


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