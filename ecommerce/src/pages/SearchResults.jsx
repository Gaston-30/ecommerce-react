import { useState } from "react"

import ProductCard from "../components/ProductCard"

import useProducts from "../hooks/useProducts"

import { useFilter } from "../context/FilterContext"

import FiltersPanel from "../components/FiltersPanel"

function SearchResults() {

  const { products, loading } = useProducts() 

  const { searchQuery } = useFilter()
  
  const [sortBy, setSortBy] =
    useState("")

  const [minPrice, setMinPrice] =
    useState("")

  const [maxPrice, setMaxPrice] =
    useState("")

  if (loading) return <p>Cargando...</p>
  
    let filteredProducts =
    products.filter((product) =>

      product.nombre
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
    )

  if (minPrice !== "") {

    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.precio >= Number(minPrice)
      )
  }

  if (maxPrice !== "") {

    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.precio <= Number(maxPrice)
      )
  }

  if (sortBy === "low-high") {

    filteredProducts.sort(
      (a, b) =>
        a.precio - b.precio
    )
  }

  if (sortBy === "high-low") {

    filteredProducts.sort(
      (a, b) =>
        b.precio - a.precio
    )
  }

  if (sortBy === "newest") {

    filteredProducts.reverse()
  }

  if (sortBy === "oldest") {

    filteredProducts.sort(
      (a, b) =>
        a.id - b.id
    )
  }

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>

        Resultados para:
        {" "}
        "{searchQuery}"

      </h1>

      <div style={styles.content}>

        {/* FILTROS */}

          <FiltersPanel

            sortBy={sortBy}
            setSortBy={setSortBy}

            minPrice={minPrice}
            setMinPrice={setMinPrice}

            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}

          />

        {/* PRODUCTOS */}

        {filteredProducts.length === 0 ? (

          <p style={styles.noResults}>

            No se encontraron productos.

          </p>

        ) : (

          <div style={styles.grid}>

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  )
}

const styles = {

  container: {
    padding: "40px"
  },

  content: {
    display: "flex",
    gap:
      window.innerWidth < 768
        ? "15px"
        : "35px",
    flexDirection:
        window.innerWidth <= 768
        ? "column"
        : "row",
    alignItems: "flex-start",
    width: "100%"
  },

  title: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#3E2C23"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
    window.innerWidth <= 768
        ? "1fr"
        : "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
    flex: 1,
    width: "100%"
  },

  noResults: {
    color: "#777"
  }

}

export default SearchResults