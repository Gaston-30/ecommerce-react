import { useState } from "react"

import ProductCard from "../components/ProductCard"

import productsData from "../data/Products"

import FiltersPanel from "../components/FiltersPanel"

function ProductsPage() {

  const productsPerPage = 24

  const [currentPage, setCurrentPage] =
    useState(1)

    const [sortBy, setSortBy] =
    useState("")

    const [minPrice, setMinPrice] =
    useState("")

    const [maxPrice, setMaxPrice] =
    useState("")


  const startIndex =
    (currentPage - 1) * productsPerPage

  let filteredProducts =
  [...productsData]

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

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    )

    const currentProducts =
        filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
        )

  return (

  <div style={styles.container}>

    <h1 style={styles.title}>
      Todos los productos
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

      <div style={styles.grid}>

        {currentProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>

    {/* PAGINACIÓN */}

    <div style={styles.pagination}>

      <button

        style={styles.pageButton}

        disabled={currentPage === 1}

        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
      >

        ←

      </button>

      <span style={styles.pageText}>

        {currentPage}/{totalPages}

      </span>

      <button

        style={styles.pageButton}

        disabled={
          currentPage === totalPages
        }

        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
      >

        →

            </button>

            </div>

        </div>
    )
}

const styles = {

  page: {
    padding: "40px"
  },

  title: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#3E2C23"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap:
      window.innerWidth < 768
        ? "15px"
        : "25px",
    flex: 1,
    width: "100%"
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "50px"
  },

  pageButton: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#D6B79A",
    cursor: "pointer",
    fontSize: "20px"
  },

  pageText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#3E2C23"
  },

  container: {
    padding: "40px"
  },

  content: {
    display: "flex",
    gap:
      window.innerWidth < 768
        ? "15px"
        : "35px",
    alignItems: "flex-start",
    width: "100%",
    flexDirection:
    window.innerWidth < 768
      ? "column"
      : "row",
  },

}

export default ProductsPage