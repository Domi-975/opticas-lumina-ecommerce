import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Gallery() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Galería de productos</h1>

      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
