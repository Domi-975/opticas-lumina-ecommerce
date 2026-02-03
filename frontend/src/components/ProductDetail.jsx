import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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
  const { token } = useContext(UserContext);

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

  const handleAddToCart = () => {
    if (!token) {
      Swal.fire({
        title: "¡Atención!",
        html: `
          <p>Debes iniciar sesión para agregar productos al carrito.</p>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
            <a href="/login" class="swal2-confirm swal2-styled" style="text-decoration: none; display: block;">Ir al Login</a>
            <a href="/register" class="swal2-confirm swal2-styled" style="text-decoration: none; display: block; background-color: #fff; color: #212529; border: 1px solid #212529;">Ir a Registrarse</a>
          </div>
        `,
        showConfirmButton: false,
        icon: "warning"
      });
      return;
    }

    addItem({
      id: product.id,
      name,
      price: Number(price),
      image,
    });
    toast.success(`${name} agregado al carrito`);
  };

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
              onClick={handleAddToCart}
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
