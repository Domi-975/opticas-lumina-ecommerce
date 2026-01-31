import { Link } from "react-router-dom";

const items = [
  { label: "Anteojos de sol", img: "/images/catalogo-sol.jpg", href: "/tienda?cat=lentes-de-sol" },
  { label: "Anteojos recetados", img: "/images/catalogo-recetados.jpg", href: "/tienda?cat=recetados" },
  { label: "Lentes de contacto", img: "/images/catalogo-contacto.jpg", href: "/tienda?cat=contacto" },
];


export default function HomeCatalog() {
  return (
    <section className="lumina-section">
      <div className="container">
        <h2 className="lumina-section__title text-center">Catálogo</h2>

        <div className="row g-4 justify-content-center">
          {items.map((it) => (
            <div key={it.label} className="col-10 col-sm-8 col-md-4">
              <Link className="lumina-card" to={it.href}>
                <img className="lumina-card__img" src={it.img} alt={it.label} />
                <div className="lumina-card__label">{it.label}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
