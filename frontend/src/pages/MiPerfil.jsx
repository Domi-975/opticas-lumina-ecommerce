import '../pages/MiPerfil.css'
import { useState, useEffect, useRef } from 'react'
import avatar from '../assets/avatar.jpg'
import PerfilForm from '../components/PerfilForm'
import PerfilMenu from '../components/PerfilMenu'
import Perfil from '../components/Perfil'

// Pages -> "armar la pantalla", manejar estados principales y pasar props a componentes

const MiPerfil = () => {
  const [perfil, setPerfil] = useState({ nombre: '', email: '', password: '' })
  const [foto, setFoto] = useState(avatar)
  const insertarFoto = useRef(null)

  useEffect(() => {
    const fotoGuardada = localStorage.getItem('fotoPerfil')
    if (fotoGuardada && fotoGuardada !== 'undefined') {
      setFoto(fotoGuardada)
    } else {
      setFoto(avatar)
    }
  }, [])

  const cambiarFoto = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return
    const imgURL = URL.createObjectURL(archivo)
    setFoto(imgURL)
    localStorage.setItem('fotoPerfil', imgURL)
  }
  return (
    <div className='perfil-container'>
      <h1>Mi perfil</h1>
      <div className='layout'>
        <div className='col-izquierda'>
          <Perfil
            foto={foto}
            cambiarFoto={cambiarFoto}
            insertarFoto={insertarFoto}
          />
          <PerfilMenu />
        </div>
        <div className='col-derecha'>
          <PerfilForm perfil={perfil} setPerfil={setPerfil} />
        </div>
      </div>
    </div>
  )
}

export default MiPerfil
