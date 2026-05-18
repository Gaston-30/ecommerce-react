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

    color: "#3E2C23"
  },

  card: {

    display: "flex",

    alignItems: "center",

    gap: "25px",

    backgroundColor: "#fff",

    padding: "20px",

    borderRadius: "15px",

    marginBottom: "20px",

    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)"
  },

  image: {

    width: "120px",

    height: "120px",

    objectFit: "cover",

    borderRadius: "10px"
  },

  info: {

    flex: 1
  },

  price: {

    color: "#3E2C23"
  },

  removeButton: {

    padding: "10px 15px",

    border: "none",

    borderRadius: "8px",

    backgroundColor: "#D6B79A",

    cursor: "pointer"
  }

}

export default FavoritesPage