import { NavLink } from 'react-router-dom'
import './Home/Home.css'

export default function Navbar () {
  const linkClass = ({ isActive }) =>
    `nav-link${isActive ? ' lumina-pill-active' : ''}`

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white border-bottom lumina-navbar'>
      <div className='container'>
        <NavLink
          to='/'
          className='navbar-brand d-flex align-items-center gap-2 fw-semibold'
        >
          <span className='lumina-logo' aria-hidden='true'>
            ✺
          </span>
          Lúmina
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#luminaNav'
          aria-controls='luminaNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='luminaNav'>
          <ul className='navbar-nav mx-auto mb-2 mb-lg-0 lumina-navlinks'>
            <li className='nav-item'>
              <NavLink to='/nosotros' className={linkClass}>
                Nosotros
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/tienda' className={linkClass}>
                Tienda
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/servicios' className={linkClass}>
                Servicios
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/productos' className={linkClass}>
                Productos
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/pagos' className={linkClass}>
                Formas de pago
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/contacto' className={linkClass}>
                Contacto
              </NavLink>
            </li>
          </ul>

          <div className='d-flex align-items-center gap-3'>
            <NavLink to='/login' className='btn btn-outline-dark btn-sm'>
              Login
            </NavLink>
            <NavLink
              to='/carrito'
              className='text-dark text-decoration-none'
              aria-label='Carrito'
            >
              🛒
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
