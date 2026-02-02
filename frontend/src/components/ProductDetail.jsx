import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { products as fallbackProducts } from "../data/products";

const formatCLP = (n) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addItem } = useCart();

  if (loading) return <div className="container py-5">Cargando...</div>;

  const productId = Number(id);

  const product =
    (products || []).find((p) => p.id === productId) ||
    fallbackProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Producto no encontrado</h3>
        <Link to="/tienda" className="btn btn-dark mt-3">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const name = product.nombre_producto || product.product_name || "Producto";
  const description = product.descripcion || product.product_description || "";
  const price = product.precio_min || product.product_price || 0;

  const image =
    (Array.isArray(product.imagenes) && product.imagenes[0])
      ? product.imagenes[0]
      : (product.image || "/placeholder.svg");

  const category = product.nombre_categoria || product.category || "";

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-md-6">
          <div className="shadow-sm rounded overflow-hidden" style={{ background: "#f5f5f5" }}>
            <img
              src={image}
              alt={name}
              className="img-fluid w-100"
              style={{ height: 420, objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/tienda" className="text-decoration-none text-muted">
                  Tienda
                </Link>
              </li>
              <li className="breadcrumb-item active text-capitalize" aria-current="page">
                {category || "Producto"}
              </li>
            </ol>
          </nav>

          <h1 className="display-6 fw-bold mb-3">{name}</h1>
          <h2 className="fw-semibold mb-4">{formatCLP(price)}</h2>

          {description && (
            <div className="mb-4">
              <h5 className="fw-bold mb-2">Descripción</h5>
              <p className="text-muted" style={{ whiteSpace: "pre-line", fontSize: "1.05rem" }}>
                {description}
              </p>
            </div>
          )}

          <div className="d-grid gap-2">
            <button
              className="btn btn-dark btn-lg py-3 fw-bold"
              onClick={() => {
                addItem({
                  id: product.id,
                  name,
                  price: Number(price),
                  image,
                });
                toast.success(`${name} agregado al carrito`);
              }}
            >
              Agregar al carrito 🛒
            </button>

            <Link to="/carrito" className="btn btn-outline-dark">
              Ir al carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
