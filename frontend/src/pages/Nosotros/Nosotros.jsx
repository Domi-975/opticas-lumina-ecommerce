// src/pages/Nosotros/Nosotros.jsx
import "./Nosotros.css";

const stats = [
  { label: "Años de experiencia", value: "12+" },
  { label: "Clientes atendidos", value: "8.500+" },
  { label: "Marcas disponibles", value: "40+" },
  { label: "Envíos al mes", value: "1.200+" },
];

const values = [
  {
    title: "Transparencia",
    desc: "Recomendaciones claras, precios honestos y garantía real. Sin letra chica.",
    icon: "🔍",
  },
  {
    title: "Calidad clínica",
    desc: "Trabajamos con proveedores certificados y controles de calidad en cada pedido.",
    icon: "✅",
  },
  {
    title: "Cercanía",
    desc: "Te acompañamos desde la elección del marco hasta el ajuste final.",
    icon: "🤝",
  },
  {
    title: "Rapidez",
    desc: "Procesos ágiles y trazabilidad del pedido para que sepas siempre en qué va.",
    icon: "⚡",
  },
];

const team = [
  {
    name: "Gerando Ponce",
    role: "Optometrista Jefe",
    bio: "Especialista en salud visual y adaptación de lentes. Enfocado en experiencia del paciente.",
    tag: "Atención clínica",
  },
  {
    name: "Ignacio Lambert",
    role: "Encargado de Taller",
    bio: "Control de calidad, montaje y calibración. Garantiza precisión y terminación.",
    tag: "Calidad",
  },
  {
    name: "Ayleen Martinez",
    role: "Customer Experience",
    bio: "Soporte por WhatsApp/Email. Asesoría de compra y seguimiento de pedidos.",
    tag: "Soporte",
  },
 {
    name: "Vanessa Salinas",
    role: "Jefa de Ventas",
    bio: "Especialista en las necesidades de nuestros clientes.",
    tag: "Atención clínica",
  },
];

const timeline = [
  {
    year: "2013",
    title: "Nace Lúmina",
    desc: "Comenzamos como óptica de barrio, con foco en atención personalizada.",
  },
  {
    year: "2018",
    title: "Taller propio",
    desc: "Incorporamos taller y controles de calidad para mejorar tiempos y precisión.",
  },
  {
    year: "2022",
    title: "Lúmina online",
    desc: "Lanzamos la tienda web con despacho y seguimiento de pedidos.",
  },
  {
    year: "Hoy",
    title: "Visión en foco",
    desc: "Seguimos creciendo con un estándar de servicio cercano, ágil y confiable.",
  },
];

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-4">
      {eyebrow && <div className="text-uppercase small text-muted fw-semibold">{eyebrow}</div>}
      <h2 className="fw-bold mb-2">{title}</h2>
      {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
    </div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="card h-100 shadow-sm border-0 about-card">
      <div className="card-body p-4">
        <div className="about-icon mb-3">{icon}</div>
        <h5 className="fw-bold mb-2">{title}</h5>
        <p className="text-muted mb-0">{desc}</p>
      </div>
    </div>
  );
}

function TeamCard({ name, role, bio, tag }) {
  return (
    <div className="card h-100 shadow-sm border-0 about-card">
      <div className="card-body p-4">
        <div className="d-flex align-items-start gap-3">
          <div className="about-avatar">{name?.[0] ?? "L"}</div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
              <div>
                <h5 className="fw-bold mb-0">{name}</h5>
                <div className="text-muted">{role}</div>
              </div>
              <span className="badge rounded-pill text-bg-light border">{tag}</span>
            </div>
            <p className="text-muted mt-3 mb-0">{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="col-6 col-lg-3">
      <div className="card border-0 shadow-sm h-100 about-stat">
        <div className="card-body p-4">
          <div className="display-6 fw-bold mb-1">{value}</div>
          <div className="text-muted">{label}</div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, desc }) {
  return (
    <div className="about-timeline-item">
      <div className="about-timeline-dot" />
      <div className="about-timeline-content">
        <div className="small text-muted fw-semibold">{year}</div>
        <div className="fw-bold">{title}</div>
        <div className="text-muted">{desc}</div>
      </div>
    </div>
  );
}

export default function Nosotros() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div className="text-uppercase small text-muted fw-semibold mb-2">Lúmina</div>
              <h1 className="display-5 fw-bold mb-3">Tu visión, en foco.</h1>
              <p className="text-muted fs-5 mb-4">
                Somos una óptica moderna con enfoque clínico y atención cercana. Combinamos asesoría,
                calidad de taller y una experiencia online simple para que elijas tus lentes con seguridad.
              </p>

              <div className="d-flex gap-2 flex-wrap">
                <a className="btn btn-dark px-4" href="/tienda">Ver tienda</a>
                <a className="btn btn-outline-secondary px-4" href="/contacto">Hablar con nosotros</a>
              </div>

              <div className="mt-4 text-muted small">
                📍 Santiago, Chile · ⏱️ Atención Lun–Sáb · 💬 Soporte por WhatsApp
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="about-hero-card shadow-sm">
                <div className="about-hero-card-inner">
                  <div className="about-hero-badge">Garantía de ajuste</div>
                  <h4 className="fw-bold mb-2">Asesoría real, no solo venta</h4>
                  <p className="text-muted mb-3">
                    Te guiamos según tu receta, estilo y uso. Si algo no queda bien, lo ajustamos.
                  </p>
                  <ul className="about-list">
                    <li>✔️ Revisión de receta y medidas</li>
                    <li>✔️ Marcos para trabajo, deporte y uso diario</li>
                    <li>✔️ Antirreflejo, filtro azul y fotocromáticos</li>
                    <li>✔️ Seguimiento del pedido paso a paso</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-5">
        <div className="container">
          <div className="row g-3">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-5 bg-light">
        <div className="container">
          <SectionTitle
            eyebrow="Quiénes somos"
            title="Una óptica pensada para hacerlo fácil"
            subtitle="Mejoramos la experiencia de compra con asesoría clara, calidad de taller y tiempos confiables."
          />

          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm h-100 about-card">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-2">Misión</h5>
                  <p className="text-muted mb-0">
                    Entregar soluciones visuales confiables, con asesoría profesional y productos de alta calidad,
                    para que cada persona vea mejor y se sienta cómoda con sus lentes.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="card border-0 shadow-sm h-100 about-card">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-2">Visión</h5>
                  <p className="text-muted mb-0">
                    Ser la óptica online referente en Chile por experiencia de compra, precisión de taller
                    y atención cercana, con estándares clínicos y mejoras continuas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VALUES */}
          <div className="mt-5">
            <SectionTitle
              eyebrow="Nuestros valores"
              title="Lo que guía cada decisión"
              subtitle="Desde la selección de materiales hasta el soporte postventa."
            />
            <div className="row g-3">
              {values.map((v) => (
                <div className="col-12 col-md-6 col-lg-3" key={v.title}>
                  <ValueCard {...v} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-5">
        <div className="container">
          <SectionTitle
            eyebrow="Historia"
            title="Cómo llegamos hasta aquí"
            subtitle="Crecimos manteniendo lo más importante: servicio cercano y precisión."
          />

          <div className="about-timeline">
            {timeline.map((t) => (
              <TimelineItem key={t.year} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-5 bg-light">
        <div className="container">
          <SectionTitle
            eyebrow="Equipo"
            title="Personas reales detrás de Lúmina"
            subtitle="Atención clínica, calidad de taller y soporte humano."
          />
          <div className="row g-3">
            {team.map((m) => (
              <div className="col-12 col-lg-4" key={m.name}>
                <TeamCard {...m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container">
          <div className="about-cta shadow-sm">
            <div className="row align-items-center g-3">
              <div className="col-12 col-lg-8">
                <h3 className="fw-bold mb-2">¿Listo para encontrar tus próximos lentes?</h3>
                <p className="text-muted mb-0">
                  Explora marcos, revisa materiales y si necesitas ayuda, te guiamos en el proceso.
                </p>
              </div>
              <div className="col-12 col-lg-4 d-flex gap-2 justify-content-lg-end flex-wrap">
                <a className="btn btn-dark px-4" href="/tienda">Ver productos</a>
                <a className="btn btn-outline-secondary px-4" href="/contacto">Contactar</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
