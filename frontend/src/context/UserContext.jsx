import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [email, setEmail] = useState(localStorage.getItem('email'))

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Error en el login')
        return
      }

      setToken(data.token)
      setEmail(data.email)

      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)

      toast.success('¡Login exitoso!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al conectar con el servidor')
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || 'Error en el registro')
        return false
      }

      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.')
      return true
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al conectar con el servidor')
      return false
    }
  }

  const logout = () => {
    setToken(null)
    setEmail(null)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    toast.info('Sesión cerrada')
  }

  return (
    <UserContext.Provider value={{ token, email, login, logout, register }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
