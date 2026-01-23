// ✅ NUEVO
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './pages/Home/Home'
import ProductGallery from './components/ProductGallery'
import ProductDetail from './components/ProductDetail'
import Login from './components/Login'
import Register from './components/Register'
import MiPerfil from './pages/MiPerfil'
import Cart from './pages/Cart/Cart'
import Navbar from './components/Navbar'
import { UserContext } from './context/UserContext'
import NotFound from './components/NotFound'
import Nosotros from './pages/Nosotros'
import Tienda from './pages/Tienda'
import Servicios from './pages/Servicios'
import Pagos from './pages/Pagos'
import Contacto from './pages/Contacto'

export default function App () {
  const { token } = useContext(UserContext)
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productos' element={<ProductGallery />} />
        <Route path='/producto/:id' element={<ProductDetail />} />
        {/* ✅ NUEVO */}
        <Route path='/carrito' element={<Cart />} />
        <Route path='/mi-perfil' element={token ? <MiPerfil /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={token ? <Navigate to='/' /> : <Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
