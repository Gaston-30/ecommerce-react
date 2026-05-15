function Categories({ setSelectedCategory }) {

  const categorias = [
    "Velas",
    "Alfombras",
    "Sahumerios"
  ]

  return (
    <section>

      <h2>Categorías</h2>

      <div>

        <button
          onClick={() => setSelectedCategory("")}
        >
          Todas
        </button>

        {categorias.map((categoria, index) => (

          <button
            key={index}
            onClick={() => setSelectedCategory(categoria)}
          >
            {categoria}
          </button>

        ))}

      </div>

    </section>
  )
}

export default Categories