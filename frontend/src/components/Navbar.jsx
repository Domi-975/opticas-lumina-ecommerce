import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="lumina-nav">
      <div className="container">
        <nav className="navbar navbar-expand-lg py-3">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <span className="lumina-logo">✳</span>
            <span className="lumina-brand">Lúmina</span>
          </Link>

          {/* Toggle mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#luminaNavbar"
            aria-controls="luminaNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="luminaNavbar">
            <ul className="navbar-nav mx-auto gap-lg-3 align-items-lg-center">
              <li className="nav-item">
                <NavLink className="nav-link lumina-link" to="/about">
                  Nosotros
                </NavLink>
              </li>

              <li className="nav-item">
                {/* “Tienda” destacado */}
                <NavLink
                  className={({ isActive }) =>
                    `nav-link lumina-pill ${isActive ? "is-active" : ""}`
                  }
                  to="/catalog"
                >
                  Tienda
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link lumina-link" to="/services">
                  Servicios
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link lumina-link" to="/products">
                  Productos
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link lumina-link" to="/payments">
                  Formas de pago
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link lumina-link" to="/contact">
                  Contacto
                </NavLink>
              </li>
            </ul>

            {/* Icono carrito */}
            <div className="d-flex align-items-center">
              <Link to="/cart" className="lumina-cart" aria-label="Carrito">
                <i className="bi bi-cart3"></i>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
