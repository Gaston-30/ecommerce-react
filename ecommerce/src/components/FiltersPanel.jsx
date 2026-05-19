import { useState } from "react"

function FiltersPanel({

  sortBy,
  setSortBy,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice

}) {

  const isMobile =
    window.innerWidth < 768

  const [showFilters, setShowFilters] =
    useState(false)

  return (

    <>

      {/* BOTÓN MOBILE */}

      {isMobile && (

        <button

          style={styles.toggleButton}

          onClick={() =>
            setShowFilters(!showFilters)
          }
        >

          Filtros
          {" "}
          {showFilters ? "▲" : "▼"}

        </button>
      )}

      {/* PANEL */}

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

    </>
  )
}

const styles = {

  toggleButton: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#D6B79A",
    color: "#3E2C23",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer"
  },

  filters: {
    width:
      window.innerWidth < 768
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

    position:
      window.innerWidth < 768
        ? "relative"
        : "sticky",

    top: "120px"
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
  }

}

export default FiltersPanel