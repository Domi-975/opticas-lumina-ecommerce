// frontend/src/pages/Home.jsx
import "./home.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  {
    id: 1,
    title: "Anteojos de sol",
    image: "/images/cat-sol.jpg",
    to: "/catalog?category=sol",
  },
  {
    id: 2,
    title: "Anteojos recetados",
    image: "/images/cat-recetados.jpg",
    to: "/catalog?category=recetados",
  },
  {
    id: 3,
    title: "Lentes de contacto",
    image: "/images/cat-contacto.jpg",
    to: "/catalog?category=contacto",
  },
];

function CategoryCard({ title, image, to }) {
  return (
    <Link to={to} className="text-decoration-none">
      <article className="lumina-card h-100">
        <div className="lumina-card__imgWrap">
          <img className="lumina-card__img" src={image} alt={title} />
        </div>
        <div className="lumina-card__body">
          <p className="lumina-card__title">{title}</p>
        </div>
      </article>
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="lumina-hero">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-7">
              <h1 className="lumina-hero__title">Óptica Lúmina</h1>
              <p className="lumina-hero__subtitle">Tu visión, en foco.</p>

              <div className="d-flex gap-2 mt-3">
                <Link to="/catalog" className="btn btn-dark px-4">
                  Comprar
                </Link>
                <Link to="/about" className="btn btn-outline-dark px-4">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGO */}
      <section className="container py-5">
        <h2 className="lumina-sectionTitle text-center mb-4">Catálogo</h2>

        <div className="row g-4">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="col-12 col-md-6 col-lg-4">
              <CategoryCard title={c.title} image={c.image} to={c.to} />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (si el Layout no lo tiene, puedes dejarlo acá) */}
      <footer className="lumina-footer">
        <div className="container py-5">
          <div className="row gy-4">
            <div className="col-12 col-lg-4">
              <p className="lumina-footer__brand mb-1">Óptica Lúmina</p>
              <p className="lumina-footer__muted mb-0">
                2026 - Todos los derechos reservados
              </p>

              <div className="d-flex gap-3 mt-3">
                <a className="lumina-footer__icon" href="#" aria-label="Instagram">
                  IG
                </a>
                <a className="lumina-footer__icon" href="#" aria-label="LinkedIn">
                  IN
                </a>
                <a className="lumina-footer__icon" href="#" aria-label="X">
                  X
                </a>
              </div>
            </div>

            <div className="col-6 col-lg-2">
              <p className="lumina-footer__title">Servicios</p>
              <ul className="list-unstyled mb-0">
                <li><Link className="lumina-footer__link" to="/services">Consulta al estado de tu pedido</Link></li>
                <li><Link className="lumina-footer__link" to="/services">Convenios</Link></li>
                <li><Link className="lumina-footer__link" to="/services">Integraciones</Link></li>
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <p className="lumina-footer__title">Nosotros</p>
              <ul className="list-unstyled mb-0">
                <li><Link className="lumina-footer__link" to="/about">Garantías</Link></li>
                <li><Link className="lumina-footer__link" to="/about">Términos y condiciones</Link></li>
                <li><Link className="lumina-footer__link" to="/about">Cambios y devoluciones</Link></li>
                <li><Link className="lumina-footer__link" to="/payments">Formas de pago</Link></li>
              </ul>
            </div>

            <div className="col-12 col-lg-4">
              <p className="lumina-footer__title">Contacto</p>
              <p className="lumina-footer__muted mb-1">Horario de atención: Lunes a Sábados 9:00 a 18:00 hs</p>
              <p className="lumina-footer__muted mb-1">Teléfono: 22-222-2222</p>
              <p className="lumina-footer__muted mb-0">Dirección: Yrigoyen 2515</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
