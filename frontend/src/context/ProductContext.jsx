import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/products`)
      if (!res.ok) throw new Error(`Error al cargar productos (HTTP ${res.status})`)

      const data = await res.json()
      setProducts(data.products ?? data ?? [])
    } catch (e) {
      console.error(e)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [API_URL])

  useEffect(() => {
    load()
  }, [load])

  return (
    <ProductContext.Provider value={{ products, loading, refreshProducts: load }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
