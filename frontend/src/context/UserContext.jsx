import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [email, setEmail] = useState(localStorage.getItem('email'))

  const login = (email, password) => {
    if (!email || !password) {
      alert('Completá todos los campos')
      return
    }

    // Simulación de login
    const simulacionToken = 'token-simulado'
    setToken(simulacionToken)
    setEmail(email)

    localStorage.setItem('token', simulacionToken)
    localStorage.setItem('email', email)

    alert('¡Login exitoso!')
  }

  const logout = () => {
    setToken(null)
    setEmail(null)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    alert('Sesión cerrada')
  }

  return (
    <UserContext.Provider value={{ token, email, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
