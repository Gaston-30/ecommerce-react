import ProductCard from "./ProductCard"

function Products({ products }) {

  return (
    <section>

      <h2>Novedades</h2>

      <div>

        {products.map((product) => (
          <ProductCard
            key={product.id}
            producto={product}
          />
        ))}

      </div>

    </section>
  )
}

export default Products