import { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CrearPublicacion = () => {
  const { token } = useContext(UserContext)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria_id: '',
    stock: '',
    imagen_url: ''
  })

  const canSubmit = useMemo(() => {
    return (
      formData.nombre.trim().length > 0 &&
      formData.descripcion.trim().length > 0 &&
      String(formData.precio).trim().length > 0 &&
      String(formData.categoria_id).trim().length > 0 &&
      String(formData.stock).trim().length > 0
    )
  }, [formData])

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria_id: '',
      stock: '',
      imagen_url: ''
    })
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/products`)
      if (!res.ok) throw new Error('Error al cargar productos')

      const data = await res.json()
      const list = data.products ?? data ?? []
      setProducts(list)
    } catch (error) {
      console.error(error)
      toast.error('No se pudieron cargar los productos')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const startEdit = (p) => {
    setEditingId(p.id)

    setFormData({
      nombre: p.nombre ?? '',
      descripcion: p.descripcion ?? '',
      precio: p.precio ?? '',
      categoria_id: p.categoria_id ?? '',
      stock: p.stock ?? '',
      imagen_url: p.imagen_url ?? ''
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error('Debes iniciar sesión para crear/editar productos')
      return
    }

    if (!canSubmit) {
      toast.error('Completa todos los campos obligatorios')
      return
    }

    const url = editingId
      ? `${API_URL}/products/${editingId}`
      : `${API_URL}/products`

    const method = editingId ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio: Number(formData.precio),
          categoria_id: Number(formData.categoria_id),
          stock: Number(formData.stock),
          imagen_url: formData.imagen_url || null
        })
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        toast.error(data.message || 'Error al guardar producto')
        return
      }

      toast.success(editingId ? 'Producto actualizado' : 'Producto creado')
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error(error)
      toast.error('Error al conectar con el servidor')
    }
  }

  const handleDelete = async (id) => {
    if (!token) {
      toast.error('Debes iniciar sesión para eliminar productos')
      return
    }

    const ok = window.confirm('¿Seguro que deseas eliminar este producto?')
    if (!ok) return

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        toast.error(data.message || 'No se pudo eliminar')
        return
      }

      toast.success('Producto eliminado')
      fetchProducts()
    } catch (error) {
      console.error(error)
      toast.error('Error al conectar con el servidor')
    }
  }

  return (
    <div className='container py-4'>
      <h2 className='mb-3'>{editingId ? 'Editar producto' : 'Crear producto'}</h2>

      <form onSubmit={handleSubmit} className='card p-3 mb-4'>
        <div className='row g-3'>
          <div className='col-md-6'>
            <label className='form-label'>Nombre *</label>
            <input
              name='nombre'
              value={formData.nombre}
              onChange={handleChange}
              className='form-control'
              placeholder='Nombre del producto'
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Precio *</label>
            <input
              name='precio'
              type='number'
              value={formData.precio}
              onChange={handleChange}
              className='form-control'
              placeholder='19990'
            />
          </div>

          <div className='col-md-12'>
            <label className='form-label'>Descripción *</label>
            <textarea
              name='descripcion'
              value={formData.descripcion}
              onChange={handleChange}
              className='form-control'
              rows='3'
              placeholder='Descripción del producto'
            />
          </div>

          <div className='col-md-4'>
            <label className='form-label'>Categoría ID *</label>
            <input
              name='categoria_id'
              type='number'
              value={formData.categoria_id}
              onChange={handleChange}
              className='form-control'
              placeholder='1'
            />
          </div>

          <div className='col-md-4'>
            <label className='form-label'>Stock *</label>
            <input
              name='stock'
              type='number'
              value={formData.stock}
              onChange={handleChange}
              className='form-control'
              placeholder='10'
            />
          </div>

          <div className='col-md-4'>
            <label className='form-label'>Imagen URL (opcional)</label>
            <input
              name='imagen_url'
              value={formData.imagen_url}
              onChange={handleChange}
              className='form-control'
              placeholder='https://... o /images/...'
            />
          </div>
        </div>

        <div className='d-flex gap-2 mt-3'>
          <button className='btn btn-dark' type='submit' disabled={!canSubmit}>
            {editingId ? 'Guardar cambios' : 'Crear producto'}
          </button>

          {editingId && (
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={resetForm}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <h3 className='mb-3'>Productos</h3>

      {loading ? (
        <p>Cargando...</p>
      ) : products.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <div className='table-responsive'>
          <table className='table table-striped align-middle'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Imagen</th>
                <th className='text-end'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                  <td>{p.stock}</td>
                  <td>{p.categoria_id}</td>
                  <td style={{ maxWidth: 240 }}>
                    <span className='text-truncate d-inline-block' style={{ maxWidth: 240 }}>
                      {p.imagen_url || '-'}
                    </span>
                  </td>
                  <td className='text-end'>
                    <div className='d-flex justify-content-end gap-2'>
                      <button
                        className='btn btn-sm btn-outline-dark'
                        onClick={() => startEdit(p)}
                      >
                        Editar
                      </button>
                      <button
                        className='btn btn-sm btn-outline-danger'
                        onClick={() => handleDelete(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CrearPublicacion
