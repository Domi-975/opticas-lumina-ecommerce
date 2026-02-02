import React from "react";
import "./Pagos.css";

const pagos = [
  {
    title: "Tarjeta de crédito / débito",
    desc: "Paga con tus tarjetas habilitadas para compras online. Procesamiento seguro y confirmación inmediata.",
    details: [
      "Crédito, débito y prepago (según disponibilidad).",
      "Confirmación automática del pago.",
      "Tus datos no se almacenan en nuestro sitio."
    ],
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="pagoIcon">
        <rect x="8" y="16" width="48" height="32" rx="6" />
        <rect x="12" y="24" width="40" height="6" rx="2" className="pagoIcon__accent" />
        <rect x="12" y="36" width="16" height="6" rx="2" className="pagoIcon__accent" />
      </svg>
    )
  },
  {
    title: "Transferencia bancaria",
    desc: "Ideal si prefieres transferir desde tu banco. Te entregamos los datos al finalizar la compra.",
    details: [
      "Envía el comprobante para agilizar validación.",
      "Validación en horario hábil (puede tardar).",
      "Tu pedido se procesa una vez confirmado el pago."
    ],
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="pagoIcon">
        <path d="M12 26h40v24H12z" />
        <path d="M20 26V18h24v8" className="pagoIcon__accent" />
        <path d="M22 42h20" className="pagoIcon__accent" />
        <path d="M40 38l6 4-6 4" className="pagoIcon__accent" />
      </svg>
    )
  },
  {
    title: "Efectivo en tienda",
    desc: "Si compras online, también puedes pagar presencialmente en nuestras tiendas físicas (retiro o pago en caja).",
    details: [
      "Disponible solo para retiro presencial (según stock).",
      "Recibirás confirmación cuando el pedido esté listo.",
      "Presenta tu número de pedido al pagar."
    ],
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="pagoIcon">
        <rect x="12" y="22" width="40" height="26" rx="4" />
        <circle cx="32" cy="35" r="6" className="pagoIcon__accent" />
        <path d="M22 28h6M36 42h6" className="pagoIcon__accent" />
      </svg>
    )
  },
  {
    title: "Pago en cuotas",
    desc: "Si tu medio de pago lo permite, podrás dividir el monto en cuotas al momento de pagar.",
    details: [
      "Cuotas sujetas a condiciones del emisor.",
      "El valor cuota puede variar según interés/comisión.",
      "Confirmación inmediata si el pago es aprobado."
    ],
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="pagoIcon">
        <path d="M14 20h36a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H14z" />
        <path d="M18 30h28" className="pagoIcon__accent" />
        <path d="M18 38h18" className="pagoIcon__accent" />
        <path d="M42 36l6 4-6 4" className="pagoIcon__accent" />
      </svg>
    )
  }
];

const Pagos = () => {
  return (
    <div className="pagosPage">
      <div className="container pagosContainer">
        <header className="pagosHeader">
          <h1 className="pagosTitle">Formas de pago</h1>
          <p className="pagosSubtitle">
            Aceptamos pagos con tarjeta, transferencia bancaria y efectivo en tiendas físicas.
            Revisa los detalles para elegir la opción que más te acomode.
          </p>
        </header>

        <section className="pagosGrid">
          {pagos.map((p) => (
            <article key={p.title} className="pagoCard">
              <div className="pagoCard__top">
                <div className="pagoCard__iconWrap">{p.icon}</div>
                <h2 className="pagoCard__title">{p.title}</h2>
                <p className="pagoCard__desc">{p.desc}</p>
              </div>

              <ul className="pagoCard__list">
                {p.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="pagosInfo">
          <div className="pagosInfo__box">
            <h3>Confirmación y despacho</h3>
            <p>
              Los pedidos se preparan una vez el pago esté confirmado.
              En transferencias, la confirmación puede tardar según el banco y el horario.
            </p>
          </div>

          <div className="pagosInfo__box">
            <h3>Boleta / Factura</h3>
            <p>
              Emitimos boleta o factura según corresponda. Si necesitas factura, asegúrate de ingresar
              correctamente tus datos al finalizar la compra.
            </p>
          </div>

          <div className="pagosInfo__box">
            <h3>Seguridad</h3>
            <p>
              La información de pago se procesa de forma segura. Recomendamos usar redes confiables
              y mantener tus dispositivos actualizados.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pagos;
