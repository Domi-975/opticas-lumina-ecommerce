import React from 'react';
import { ProductProvider } from "./context/ProductContext";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos Bootstrap

// Importa los componentes
import Home from 'src/components/Home';
import ProductGallery from 'src/components/ProductGallery';
import ProductDetail from 'src/components/ProductDetail';
import Register from 'src/components/Register';
import Login from 'src/components/Login';

function App() {
  return (
    <ProductProvider>
    <Router>
      <div className="App">
        {/* Navbar básica para navegación */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">Ópticas Lumina</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/products">Productos</Link>
              <Link className="nav-link" to="/register">Register</Link>
              <Link className="nav-link" to="/login">Login</Link>
              {/* TODO: Agregar links para rutas privadas (Perfil, carrito, publicar) cuando se implementen */}
            </div>
          </div>
        </nav>

        {/* Definición de rutas públicas */}
        <div style={{ paddingTop: '80px' }}> {/* Agregué este div con padding-top para que el contenido no se oculte detrás de la navbar fija */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductGallery />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* TODO: Agregar rutas privadas con protección (ej. usando un hook para verificar login) */}
          </Routes>
        </div>
      </div>
    </Router>
    </ProductProvider>
  );
}

export default App;
