import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { useProducts } from '../context/ProductContext'
import '../pages/CrearPublicacion.css'

const CrearPublicacion = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  const { token } = useContext(UserContext)
  const { products, refreshProducts } = useProducts()
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', precio: '', categoria: '', imagen: '' })
  const [isDisabled, setIsDisabled] = useState(true)
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error('No estás autenticado. Inicia sesión como admin.')
      return
    }

    const precioNum = Number(formData.precio)
    if (!Number.isFinite(precioNum) || precioNum <= 0) {
      toast.error('El precio debe ser mayor a 0')
      return
    }

    try {
      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, precio: precioNum })
      })

      const raw = await response.text()
      let data = null
      try {
        data = raw ? JSON.parse(raw) : null
      } catch {
        data = { message: raw }
      }

      if (response.ok) {
        toast.success(editingId ? '¡Producto actualizado!' : '¡Producto publicado!')
        setFormData({ titulo: '', descripcion: '', precio: '', categoria: '', imagen: '' })
        setEditingId(null)
        refreshProducts()
      } else {
        toast.error(data?.message || `Error en la operación (HTTP ${response.status})`)
      }
    } catch (error) {
      console.error(error)
      toast.error('Error de conexión (API caída o CORS)')
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setFormData({
      titulo: product.nombre_producto,
      descripcion: product.descripcion,
      precio: product.precio_min,
      categoria: product.nombre_categoria,
      imagen: product.imagenes?.[0] || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

    if (!token) {
      toast.error('No estás autenticado. Inicia sesión como admin.')
      return
    }

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Producto eliminado')
        refreshProducts()
      } else {
        const raw = await response.text()
        toast.error(raw || `Error al eliminar (HTTP ${response.status})`)
      }
    } catch (error) {
      console.error(error)
      toast.error('Error de conexión (API caída o CORS)')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ titulo: '', descripcion: '', precio: '', categoria: '', imagen: '' })
  }

  useEffect(() => {
    const camposVacios = Object.values(formData).some(value => value === '')
    setIsDisabled(camposVacios)
  }, [formData])

  return (
    <div className='crear-publicacion-container flex-column py-5'>
      <div className='crear-publicacion mb-5'>
        <h2>{editingId ? 'Editar publicación' : 'Crear nueva publicación'}</h2>

        <form onSubmit={handleSubmit}>
          <div className='formcontainer'>
            <div className='form'>
              <label> URL de la imagen: </label>
              <input type='text' name='imagen' placeholder='URL de la imagen' value={formData.imagen} onChange={handleChange} required />
            </div>
            <div className='form'>
              <label> Título: </label>
              <input type='text' name='titulo' placeholder='Nombre del lente' value={formData.titulo} onChange={handleChange} required />
            </div>
            <div className='form'>
              <label> Descripción: </label>
              <textarea name='descripcion' placeholder='Descripción' value={formData.descripcion} onChange={handleChange} required />
            </div>
            <div className='form'>
              <label> Precio: </label>
              <input type='number' name='precio' placeholder='Precio' value={formData.precio} onChange={handleChange} required />
            </div>
            <div className='form'>
              <label> Categoría: </label>
              <select name='categoria' value={formData.categoria} onChange={handleChange} required className="form-control">
                <option value="">Selecciona una categoría</option>
                <option value="Sol">Sol</option>
                <option value="Recetados">Recetados</option>
                <option value="De contacto">De contacto</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button type='submit' disabled={isDisabled} className={`btn ${editingId ? 'btn-warning' : 'btn-dark'} flex-grow-1`}>
              {editingId ? 'Actualizar Producto' : 'Publicar Producto'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="container mt-4">
        <h3 className="mb-4">Gestión de Productos</h3>
        <div className="table-responsive bg-white p-3 rounded shadow-sm">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <img src={p.imagenes?.[0] || '/placeholder.jpg'} alt={p.nombre_producto} style={{ width: '50px', height: '50px', objectFit: 'contain' }} className="rounded" />
                  </td>
                  <td>{p.nombre_producto}</td>
                  <td><span className="badge bg-info text-dark">{p.nombre_categoria}</span></td>
                  <td>${Number(p.precio_min).toLocaleString('es-CL')}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button onClick={() => handleEdit(p)} className="btn btn-outline-primary">Editar</button>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-outline-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CrearPublicacion
