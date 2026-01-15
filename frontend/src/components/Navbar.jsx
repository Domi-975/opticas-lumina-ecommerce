import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
import '../components/Navbar.css';


const Navbar = () => {
  const validateRoot = ({isActive}) => isActive ? 'menuActive': 'menu'
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="navbar">
          <Navbar.Brand>Óptica Lúmina</Navbar.Brand>
            <NavLink to='/' className={validateRoot}>Home</NavLink>
            <NavLink to='/tienda' className={validateRoot}>Tienda</NavLink>
            {token ? (
               <>
            <NavLink to='/miperfil' className={validateRoot}>🔒Mi Perfil </NavLink>
            <button onClick={logout} className="logoutButton">🔒Cerrar sesión</button>
               </>
             ) : (
              <>
              <NavLink to='/login' className={validateRoot}>🔐Login</NavLink>
              <NavLink to='/register' className={validateRoot}>🔐Registrarse</NavLink>
              </>
             )}
          </Nav>
            <div className='navtotal'>
               <NavLink to='/carrito' className={validateRoot}>🛒 Total: ${total.toLocaleString()}</NavLink>
            </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar;