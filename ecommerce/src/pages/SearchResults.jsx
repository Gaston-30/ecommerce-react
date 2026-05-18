import { useState } from "react"

import ProductCard from "../components/ProductCard"

import products from "../data/Products"

import { useFilter } from "../context/FilterContext"

function SearchResults() {

  const {
    searchQuery
  } = useFilter()

  const [sortBy, setSortBy] =
    useState("")

  const [minPrice, setMinPrice] =
    useState("")

  const [maxPrice, setMaxPrice] =
    useState("")

    const [showFilters, setShowFilters] =
    useState(false)

    const isMobile =
        window.innerWidth <= 768

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

  {isMobile && (

    <button

      style={styles.filterToggle}

      onClick={() =>
        setShowFilters(!showFilters)
      }
    >

      Filtros

      {" "}

      {showFilters ? "▲" : "▼"}

    </button>

  )}

  {/* FILTROS */}

  {(!isMobile || showFilters) && (

    <div style={styles.filters}>

          <h3>
            Filtros
          </h3>

          <select
            style={styles.select}
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option value="">
              Ordenar por
            </option>

            <option value="low-high">
              Menor precio
            </option>

            <option value="high-low">
              Mayor precio
            </option>

            <option value="newest">
              Más nuevos
            </option>

            <option value="oldest">
              Más viejos
            </option>

          </select>

          <input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            style={styles.input}
          />

        </div>
  )}
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
    flexDirection:
        window.innerWidth <= 768
        ? "column"
        : "row",
    gap: "35px",
    alignItems: "flex-start",
    width: "100%"
  },

  title: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#3E2C23"
  },

  filters: {
    width:
    window.innerWidth <= 768
        ? "100%"
        : "260px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",

    display: "flex",
    flexDirection: "column",
    gap: "18px",

    position: "sticky",
    top: "120px"
  },

  filterToggle: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#D6B79A",
    color: "#3E2C23",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px"
    },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc"
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