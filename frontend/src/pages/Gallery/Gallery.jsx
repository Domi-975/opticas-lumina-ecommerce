import React from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ProductGallery = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <section className="lumina-section">
      <div className="container">
        <h1 className="lumina-section__title text-center mb-4">
          Galería de productos
        </h1>

        <div className="row g-4 justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col-10 col-sm-8 col-md-4">
              <Link
                to={`/producto/${product.id}`}
                className="lumina-card text-decoration-none"
              >
                <img
                  className="lumina-card__img"
                  src={product.image}
                  alt={product.product_name}
                />
                <div className="lumina-card__label">
                  {product.product_name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
