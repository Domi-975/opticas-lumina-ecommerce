import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './CheckoutSuccess.css'

const formatCLP = (n = 0) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export default function CheckoutSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("lastOrder");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  const dateLabel = useMemo(() => {
    if (!order?.createdAt) return null;
    const d = new Date(order.createdAt);
    return d.toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" });
  }, [order]);

  if (!order) {
    return (
      <div className="successPage">
        <div className="container successContainer">
          <div className="successCard">
            <h1 className="successTitle">No encontramos una orden reciente</h1>
            <p className="successText">
              Si llegaste aquí por error, vuelve a la tienda y agrega productos al carrito.
            </p>
            <Link className="successBtn" to="/tienda">
              Ir a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="successPage">
      <div className="container successContainer">
        <div className="successCard">
          <div className="successBadge">Pago exitoso</div>

          <h1 className="successTitle">¡Gracias por tu compra!</h1>
          <p className="successText">
            Tu pago fue aprobado y tu pedido ya está en preparación.
          </p>

          <div className="successGrid">
            <div className="successItem">
              <span className="successLabel">Orden</span>
              <span className="successValue">{order.orderId}</span>
            </div>

            <div className="successItem">
              <span className="successLabel">Fecha</span>
              <span className="successValue">{dateLabel}</span>
            </div>

            <div className="successItem">
              <span className="successLabel">Productos</span>
              <span className="successValue">{order.itemsCount}</span>
            </div>

            <div className="successItem">
              <span className="successLabel">Total pagado</span>
              <span className="successValue">{formatCLP(order.total)}</span>
            </div>
          </div>

          <div className="successNote">
            Te enviaremos la confirmación (simulada) por correo/WhatsApp cuando esté listo.
          </div>

          <div className="successActions">
            <Link className="successBtn" to="/tienda">
              Seguir comprando
            </Link>
            <Link className="successBtnGhost" to="/contacto">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
