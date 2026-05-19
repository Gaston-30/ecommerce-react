import { useFavorites } from "../context/FavoritesContext"

function FavoritesPage() {

  const {

    favorites,

    removeFromFavorites

  } = useFavorites()

  return (

    <div style={styles.page}>

      <h1 style={styles.title}>
        Mis favoritos
      </h1>

      {favorites.length === 0 ? (

        <p>
          No tienes favoritos todavía.
        </p>

      ) : (

        favorites.map((product) => (

          <div
            key={product.id}
            style={styles.card}
          >

            <img
              src={product.imagen}
              alt={product.nombre}
              style={styles.image}
            />

            <div style={styles.info}>

              <h2>
                {product.nombre}
              </h2>

              <p>
                Color: Beige
              </p>

            </div>

            <h2 style={styles.price}>

              $
              {product.precio.toLocaleString()}

            </h2>

            <button

              style={styles.removeButton}

              onClick={() =>
                removeFromFavorites(product.id)
              }
            >

              Eliminar

            </button>

          </div>
        ))
      )}

    </div>
  )
}

const styles = {

  page: {
    padding: "40px"
  },

  title: {
    marginBottom: "30px",
    color: "#3E2C23",
    textAlign:
      window.innerWidth < 768
        ? "center"
        : "left",
  },

  card: {
    display: "flex",
    flexDirection:
      window.innerWidth < 768
        ? "column"
        : "row",
    alignItems:
      window.innerWidth < 768
        ? "center"
        : "center",
    textAlign:
      window.innerWidth < 768
        ? "center"
        : "left",

    gap: "20px",
    backgroundColor: "#fff",
    padding:
      window.innerWidth < 768
        ? "15px"
        : "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
    width: "100%",
    boxSizing: "border-box"
  },

  image: {
    width:
      window.innerWidth < 768
        ? "100%"
        : "120px",
    maxWidth:
      window.innerWidth < 768
        ? "300px"
        : "120px",
    height:
      window.innerWidth < 768
        ? "200px"
        : "120px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  info: {
    flex: 1,
    width: "100%"
  },

  price: {
    color: "#3E2C23",
    wordBreak: "break-word"
  },

  removeButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#D6B79A",
    cursor: "pointer",
    width:
      window.innerWidth < 768
        ? "100%"
        : "auto",
    maxWidth: "250px"
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: "50px"
  }

}

export default FavoritesPage