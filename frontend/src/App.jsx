import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './pages/Home/Home'
import ProductGallery from './components/ProductGallery'
import ProductDetail from './components/ProductDetail'
import Login from './components/Login'
import Register from './components/Register'
import MiPerfil from './pages/MiPerfil'

// ✅ NUEVO
import Cart from './pages/Cart/Cart'

export default function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productos' element={<ProductGallery />} />
        <Route path='/producto/:id' element={<ProductDetail />} />
        {/* ✅ NUEVO */}
        <Route path='/carrito' element={<Cart />} />
        <Route path='/mi-perfil' element={<MiPerfil />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}
