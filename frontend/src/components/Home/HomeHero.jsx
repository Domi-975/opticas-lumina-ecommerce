export default function HomeHero() {
  return (
    <>
      {/* NAVBAR (si ya tienes Navbar global, borra este bloque) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom lumina-navbar">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2 fw-semibold" href="/">
            <span className="lumina-logo" aria-hidden="true">✺</span>
            Lúmina
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#luminaNav"
            aria-controls="luminaNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="luminaNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 lumina-navlinks">
              <li className="nav-item"><a className="nav-link" href="/nosotros">Nosotros</a></li>
              <li className="nav-item"><a className="nav-link" href="/tienda">Tienda</a></li>
              <li className="nav-item"><a className="nav-link" href="/servicios">Servicios</a></li>
              <li className="nav-item"><a className="nav-link" href="/productos">Productos</a></li>
              <li className="nav-item"><a className="nav-link" href="/pagos">Formas de pago</a></li>
              <li className="nav-item"><a className="nav-link" href="/contacto">Contacto</a></li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <a className="text-dark text-decoration-none" href="/carrito" aria-label="Carrito">
                🛒
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
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
