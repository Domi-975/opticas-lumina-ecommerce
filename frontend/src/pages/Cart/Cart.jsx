import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

function formatCLP(n) {
  return n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

export default function Cart() {
  const { items, subtotal, increase, decrease, removeItem, clear } = useCart();
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = async () => {
    if (!items || items.length === 0) return;

    if (!token) {
      Swal.fire({
        title: "¡Atención!",
        html: `
          <p>Debes iniciar sesión para realizar la compra.</p>
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

    setIsPaying(true);

    // Simula “procesando pago”
    await new Promise((r) => setTimeout(r, 900));

    const itemsCount = items.reduce((acc, it) => acc + (it.qty || 1), 0);

    const order = {
      orderId: `LM-${Date.now().toString().slice(-8)}`,
      total: subtotal,
      itemsCount,
      createdAt: new Date().toISOString(),
      // opcional: guardar ítems para mostrar resumen
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        price: it.price,
        qty: it.qty,
        image: it.image,
      })),
    };

    sessionStorage.setItem("lastOrder", JSON.stringify(order));

    // Limpia el carrito
    clear();

    setIsPaying(false);

    // Ir a la página de éxito
    navigate("/checkout/success");
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">Carrito</h1>
        {items.length > 0 && (
          <button className="btn btn-outline-secondary btn-sm" onClick={clear}>
            Vaciar
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="alert alert-light border">Tu carrito está vacío.</div>
      ) : (
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="list-group">
              {items.map((it) => (
                <div key={it.id} className="list-group-item">
                  <div className="d-flex gap-3 align-items-center">
                    <img
                      src={it.image}
                      alt={it.name}
                      style={{
                        width: 72,
                        height: 72,
                        objectFit: "contain",
                        borderRadius: 12,
                        backgroundColor: "#f5f5f5",
                      }}
                    />

                    <div className="flex-grow-1">
                      <div className="fw-semibold">{it.name}</div>
                      <div className="text-muted small">{formatCLP(it.price)}</div>
                      <button
                        className="btn btn-link p-0 mt-1 text-danger small"
                        onClick={() => removeItem(it.id)}
                      >
                        Quitar
                      </button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => decrease(it.id)}
                      >
                        −
                      </button>
                      <span style={{ minWidth: 22, textAlign: "center" }}>{it.qty}</span>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => increase(it.id)}
                      >
                        +
                      </button>
                    </div>

                    <div className="fw-semibold" style={{ minWidth: 110, textAlign: "right" }}>
                      {formatCLP(it.price * it.qty)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-semibold">{formatCLP(subtotal)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Envío</span>
                  <span className="text-muted">Calculado en checkout</span>
                </div>

                <button
                  type="button"
                  className="btn btn-dark w-100"
                  onClick={handlePay}
                  disabled={isPaying || items.length === 0}
                >
                  {isPaying ? "Procesando..." : "Ir a pagar"}
                </button>

                <div className="text-muted small mt-2">
                  (Pago simulado: muestra “Pago exitoso”)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
