const items = [
  { label: "Anteojos de sol", img: "/images/catalogo-sol.jpg", href: "/tienda" },
  { label: "Anteojos recetados", img: "/images/catalogo-recetados.jpg", href: "/tienda" },
  { label: "Lentes de contacto", img: "/images/catalogo-contacto.jpg", href: "/tienda" },
];


export default function HomeCatalog() {
  return (
    <section className="lumina-section">
      <div className="container">
        <h2 className="lumina-section__title text-center">Catálogo</h2>

        <div className="row g-4 justify-content-center">
          {items.map((it) => (
            <div key={it.label} className="col-10 col-sm-8 col-md-4">
              <a className="lumina-card" href={it.href}>
                <img className="lumina-card__img" src={it.img} alt={it.label} />
                <div className="lumina-card__label">{it.label}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
