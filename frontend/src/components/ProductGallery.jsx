import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import HomeFooter from "./Home/HomeFooter";
import "./Home/Home.css";

const formatCLP = (n) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function ProductGallery() {
  const [params] = useSearchParams();
  const cat = params.get("cat"); // usa categoria_slug desde el backend

  const { products, loading } = useProducts();
  const { addItem } = useCart();

  const handleAddToCart = (p) => {
    addItem({
      id: p.id,
      name: p.nombre_producto,
      price: Number(p.precio_min),
      image: p.imagenes?.[0] || "/placeholder.jpg"
    });
    toast.success(`${p.nombre_producto} agregado al carrito`);
  };

  const filtered = cat
    ? products.filter((p) => p.categoria_slug === cat)
    : products;

  if (loading) {
    return <p className="text-center mt-5">Cargando productos...</p>;
  }

  return (
    <>
      <section className="lumina-section">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
            <div>
              <h1 className="lumina-section__title mb-1">Productos</h1>
              <p className="text-muted mb-0">
                {cat ? (
                  <>
                    Categoría: <strong>{cat}</strong> · {filtered.length} items
                  </>
                ) : (
                  <>Explora nuestro catálogo · {filtered.length} items</>
                )}
              </p>
            </div>

            {/* mini filtros rápidos */}
            <div className="d-flex gap-2 flex-wrap">
              <Link className="btn btn-outline-dark btn-sm" to="/productos">
                Todos
              </Link>
              <Link
                className="btn btn-outline-dark btn-sm"
                to="/productos?cat=lentes-de-sol"
              >
                Sol
              </Link>
              <Link
                className="btn btn-outline-dark btn-sm"
                to="/productos?cat=recetados"
              >
                Recetados
              </Link>
              <Link
                className="btn btn-outline-dark btn-sm"
                to="/productos?cat=contacto"
              >
                Contacto
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {filtered.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                <div className="card h-100 product-card shadow-sm">
                  <div className="product-card__imgWrap">
                    <img
                      src={p.imagenes?.[0] || "/placeholder.jpg"}
                      alt={p.nombre_producto}
                      className="product-card__img"
                      loading="lazy"
                    />
                    <span className="badge bg-dark product-card__badge">
                      {p.nombre_categoria || "Categoría"}
                    </span>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-1">{p.nombre_producto}</h5>

                    <p className="mb-3 text-muted">
                      {p.precio_min
                        ? formatCLP(p.precio_min)
                        : "Precio por confirmar"}
                    </p>

                    {p.descripcion && (
                      <p className="small text-secondary mb-3 product-card__desc">
                        {p.descripcion}
                      </p>
                    )}

                    <div className="mt-auto d-flex gap-2">
                      <Link
                        to={`/producto/${p.id}`}
                        className="btn btn-dark w-100"
                      >
                        Ver detalle
                      </Link>

                      <button
                        type="button"
                        className="btn btn-outline-dark w-100"
                        onClick={() => handleAddToCart(p)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-12">
                <div className="alert alert-light border text-center">
                  No hay productos para esta categoría.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
