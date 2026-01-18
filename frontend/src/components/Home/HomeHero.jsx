export default function HomeHero() {
  return (
    <>
      <header className="lumina-hero">
        <div className="container lumina-hero__inner">
          <div className="lumina-hero__content">
            <h1 className="lumina-hero__title">Óptica Lúmina</h1>
            <p className="lumina-hero__subtitle">Tu visión, en foco.</p>

            <div className="d-flex gap-2 lumina-hero__actions">
              <a className="btn lumina-btn-primary" href="/tienda">Comprar</a>
              <a className="btn lumina-btn-outline" href="/productos">Ver más</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
