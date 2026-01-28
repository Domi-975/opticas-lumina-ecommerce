import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { login, token } = useContext(UserContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  useEffect(() => {
    if (token) {
      navigate('/mi-perfil')
    }
  }, [token, navigate])
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 '>
      <div className='card d-flex justify-content-center align-items-center p-4 bg-dark text-light'>
        <div className='card-title'>
          <h1>Login</h1>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label>Email</label>
              <input type='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label>Contraseña</label>
              <input type='password' className='form-control' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <button type='submit' className='btn bg-white text-dark'>
                Iniciar Sesión
              </button>
            </div>
          </form>
          <p className='text-center mt-3'>¿No tienes cuenta? <Link to='/register'>Regístrate</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
