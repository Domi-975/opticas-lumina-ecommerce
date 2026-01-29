import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'

const Register = () => {
  const { register } = useContext(UserContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nombre_completo || !formData.email || !formData.password) {
      toast.warning('Por favor completa los campos obligatorios')
      return
    }
    
    const success = await register(formData)
    if (success) {
      navigate('/login')
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 '>

      <div className='card d-flex justify-content-center align-items-center p-4 bg-dark text-light'>
        <div className='card-title'>
          <h1>Registro</h1>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label>Nombre completo</label>
              <input 
                type='text' 
                name='nombre_completo'
                className='form-control' 
                placeholder='Nombre completo'
                value={formData.nombre_completo}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label>Correo</label>
              <input 
                type='email' 
                name='email'
                className='form-control' 
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label>Contraseña</label>
              <input 
                type='password' 
                name='password'
                className='form-control' 
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label>Teléfono</label>
              <input 
                type='number' 
                name='telefono'
                className='form-control' 
                placeholder='Teléfono'
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label>Dirección</label>
              <input 
                type='text' 
                name='direccion'
                className='form-control' 
                placeholder='Dirección'
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <div className='d-flex justify-content-center align-items-center'>
              <button type='submit' className='btn btn-light text-dark fw-semibold'>
                Registrarse
              </button>
            </div>
            <p className='text-center mt-3'>¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
