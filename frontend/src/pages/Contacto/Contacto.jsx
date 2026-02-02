import React from "react";
import "./Contacto.css";

const sucursales = [
  {
    nombre: "Sucursal Providencia",
    direccion: "Av. Providencia 1234, Providencia, Santiago",
    horario: "Lun a Vie: 10:00–19:00 | Sáb: 10:00–14:00",
  },
  {
    nombre: "Sucursal Viña del Mar",
    direccion: "Av. Libertad 455, Viña del Mar, Valparaíso",
    horario: "Lun a Vie: 10:00–19:00 | Sáb: 10:00–14:00",
  },
  {
    nombre: "Sucursal Concepción Centro",
    direccion: "Barros Arana 980, Concepción, Biobío",
    horario: "Lun a Vie: 10:00–19:00 | Sáb: 10:00–14:00",
  },
];

const Contacto = () => {
  const whatsappNumber = "+56912345678";
  const whatsappMessage = encodeURIComponent(
    "Hola! 👋 Quisiera hacer una consulta sobre lentes y disponibilidad."
  );

  return (
    <div className="contactoPage">
      <div className="container contactoContainer">
        <header className="contactoHeader">
          <h1 className="contactoTitle">Contacto</h1>
          <p className="contactoSubtitle">
            Escríbenos para agendar una hora o resolver tus dudas sobre productos
            y servicios.
          </p>
        </header>

        <section className="contactoGrid">
          {/* WhatsApp */}
          <article className="contactoCard">
            <div className="contactoCard__iconWrap" aria-hidden="true">
              <svg className="contactoIcon" viewBox="0 0 64 64">
                <path d="M32 10c-11 0-20 8.4-20 18.8 0 3.7 1.2 7.1 3.3 10L14 54l15.8-4.1c2.1.6 4.3.9 6.6.9 11 0 20-8.4 20-18.8S43 10 32 10z" />
                <path
                  className="contactoIcon__accent"
                  d="M26.3 24.8c.4-1 1.4-1.6 2.4-1.4l2.2.4c.7.1 1.3.6 1.5 1.2l.6 2c.2.7 0 1.4-.5 1.8l-1 1c1.1 2.2 2.9 4 5.1 5.1l1-1c.5-.5 1.2-.7 1.8-.5l2 .6c.6.2 1.1.8 1.2 1.5l.4 2.2c.2 1-.4 2-1.4 2.4-1 .4-2 .5-3 .3-8.2-1.7-14.6-8.1-16.3-16.3-.2-1 0-2 .3-3z"
                />
              </svg>
            </div>

            <h2 className="contactoCard__title">WhatsApp</h2>
            <p className="contactoCard__desc">
              Respuesta rápida para consultas de stock, receta, envíos y
              seguimiento de compras.
            </p>

            <div className="contactoCard__info">
              <span className="contactoBadge">Lun–Sáb</span>
              <span className="contactoValue">{whatsappNumber}</span>
            </div>

            <a
              className="contactoBtn"
              href={`https://wa.me/${whatsappNumber.replace("+", "")}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              Escribir por WhatsApp
            </a>
          </article>

          {/* Email */}
          <article className="contactoCard">
            <div className="contactoCard__iconWrap" aria-hidden="true">
              <svg className="contactoIcon" viewBox="0 0 64 64">
                <rect x="12" y="18" width="40" height="28" rx="6" />
                <path
                  className="contactoIcon__accent"
                  d="M16 24l16 12 16-12"
                />
              </svg>
            </div>

            <h2 className="contactoCard__title">Correo electrónico</h2>
            <p className="contactoCard__desc">
              Para cotizaciones, convenios, facturación o atención más detallada.
            </p>

            <div className="contactoCard__info">
              <span className="contactoBadge">Respuesta</span>
              <span className="contactoValue">24–48 hrs hábiles</span>
            </div>

            <a className="contactoBtn contactoBtn--ghost" href="mailto:contacto@lumina.cl">
              contacto@lumina.cl
            </a>
          </article>

          {/* Sucursales */}
          <article className="contactoCard contactoCard--wide">
            <div className="contactoCard__wideHeader">
              <div className="contactoCard__iconWrap" aria-hidden="true">
                <svg className="contactoIcon" viewBox="0 0 64 64">
                  <path d="M32 10c-7.2 0-13 5.8-13 13 0 9.5 13 29 13 29s13-19.5 13-29c0-7.2-5.8-13-13-13z" />
                  <circle className="contactoIcon__accent" cx="32" cy="23" r="5" />
                </svg>
              </div>

              <div>
                <h2 className="contactoCard__title">Sucursales</h2>
                <p className="contactoCard__desc">
                  Atención presencial (ficticia). Puedes retirar compras y realizar ajustes básicos.
                </p>
              </div>
            </div>

            <div className="sucursalesGrid">
              {sucursales.map((s) => (
                <div key={s.nombre} className="sucursalItem">
                  <h3 className="sucursalTitle">{s.nombre}</h3>
                  <p className="sucursalText">{s.direccion}</p>
                  <p className="sucursalText sucursalText--muted">{s.horario}</p>
                </div>
              ))}
            </div>

            <div className="contactoNote">
              <strong>Tip:</strong> Si vas por retiro, espera el correo/WhatsApp de confirmación.
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Contacto;
