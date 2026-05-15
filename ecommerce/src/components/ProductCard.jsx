function ProductCard({ producto }) {
  return (
    <div>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        width="200"
      />

      <h3>{producto.nombre}</h3>

      <p>${producto.precio}</p>

      <button>Agregar al carrito</button>
    </div>
  )
}

export default ProductCard