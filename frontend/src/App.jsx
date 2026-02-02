// ✅ NUEVO
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import Nosotros from "./pages/Nosotros/Nosotros"
import Tienda from './pages/Tienda'
import Pagos from './pages/Pagos/Pagos'
import Contacto from "./pages/Contacto/Contacto"
import CrearPublicacion from './pages/CrearPublicacion'

export default function App () {
  const { token, email } = useContext(UserContext)
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path='/tienda' element={<Tienda />} />
        <Route path='/pagos' element={<Pagos />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/producto/:id' element={<ProductDetail />} />
        <Route path='/carrito' element={<Cart />} />
        <Route path='/perfil' element={token ? <MiPerfil /> : <Navigate to='/login' />} />
        <Route path='/mi-perfil' element={token ? <MiPerfil /> : <Navigate to='/login' />} />
        <Route path='/publicar-producto' element={token && email === 'admin@lumina.com' ? <CrearPublicacion /> : <Navigate to='/' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={token ? <Navigate to='/' /> : <Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
    </Router>
  )
}
