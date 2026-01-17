export default function HomeFooter() {
  return (
    <footer className="lumina-footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 col-md-4">
            <div className="fw-semibold lumina-footer__brand">Óptica Lúmina</div>
            <div className="lumina-footer__muted">2028 - Todos los derechos reservados</div>

            <div className="d-flex gap-2 mt-3">
              <a className="lumina-social" href="#" aria-label="Instagram">◯</a>
              <a className="lumina-social" href="#" aria-label="LinkedIn">in</a>
              <a className="lumina-social" href="#" aria-label="X">X</a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <div className="lumina-footer__title">Servicios</div>
            <ul className="lumina-footer__list">
              <li><a href="#">Consulta el estado de tu pedido</a></li>
              <li><a href="#">Convenios</a></li>
              <li><a href="#">Integraciones</a></li>
              <li><a href="#">Cambios y devoluciones</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <div className="lumina-footer__title">Nosotros</div>
            <ul className="lumina-footer__list">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Garantías</a></li>
              <li><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <div className="lumina-footer__title">Contacto</div>
            <ul className="lumina-footer__list">
              <li>Horario de atención: Lunes a Sábados de 9:00 a 18:00 hs</li>
              <li>Teléfono: 2222-2222</li>
              <li>Dirección: Yrigoyen 2515</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
