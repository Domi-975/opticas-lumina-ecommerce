import { useState, useEffect, useContext } from 'react' // Importa hooks básicos de React
import { toast } from 'react-toastify' // Importa librería para notificaciones visuales
import { UserContext } from '../context/UserContext' // Importa contexto de usuario para autenticación
import { useProducts } from '../context/ProductContext' // Importa hook personalizado para gestionar productos
import '../pages/CrearPublicacion.css' // Importa estilos específicos para este componente

// Define el componente funcional CrearPublicacion
const CrearPublicacion = () => {
  const { token } = useContext(UserContext) // Obtiene el token de autenticación del contexto
  const { products, refreshProducts } = useProducts() // Obtiene lista de productos y función para refrescarla
  // Define estado para los datos del formulario
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', precio: '', categoria: '', imagen: '' })
  // Define estado para deshabilitar botón de envío (true por defecto)
  const [isDisabled, setIsDisabled] = useState(true)
  // Define estado para saber si estamos editando un producto existente (guarda su ID)
  const [editingId, setEditingId] = useState(null)

  // Manejador para cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target // Extrae nombre y valor del input modificado
    setFormData({ ...formData, [name]: value }) // Actualiza el estado manteniendo los otros campos
  }

  // Manejador para el envío del formulario (Crear o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault() // Previene recarga de la página
    
    // Validación básica del precio
    if (formData.precio <= 0) {
      toast.error('El precio debe ser mayor a 0')
      return
    }
    
    try {
      // Determina URL según si es edición o creación
      const url = editingId 
        ? `http://localhost:5001/products/${editingId}`
        : 'http://localhost:5001/products';
      
      // Determina método HTTP (PUT para editar, POST para crear)
      const method = editingId ? 'PUT' : 'POST';

      // Realiza la petición al backend
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluye token de autenticación
        },
        body: JSON.stringify(formData) // Envía datos del formulario como JSON
      });

      if (response.ok) {
        // Éxito: notifica, limpia formulario, resetea modo edición y actualiza lista
        toast.success(editingId ? '¡Producto actualizado!' : '¡Producto publicado!');
        setFormData({ titulo: '', descripcion: '', precio: '', categoria: '', imagen: '' });
        setEditingId(null);
        refreshProducts();
      } else {
        // Error del servidor: obtiene mensaje y notifica
        const data = await response.json();
        toast.error(data.message || 'Error en la operación');
      }
    } catch (error) {
      // Error de red o ejecución
      console.error(error);
      toast.error('Error de conexión');
    }
  }

  // Prepara el formulario para editar un producto existente
  const handleEdit = (product) => {
    setEditingId(product.id); // Guarda ID del producto a editar
    // Rellena el formulario con los datos actuales del producto
    setFormData({
      titulo: product.nombre_producto,
      descripcion: product.descripcion,
      precio: product.precio_min,
      categoria: product.nombre_categoria,
      imagen: product.imagenes?.[0] || '' // Toma la primera imagen o cadena vacía
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube la pantalla al formulario
  }

  // Elimina un producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return; // Confirmación

    try {
      const response = await fetch(`http://localhost:5001/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Requiere autenticación
        }
      });

      if (response.ok) {
        toast.success('Producto eliminado');
        refreshProducts(); // Actualiza la lista tras eliminar
      } else {
        toast.error('Error al eliminar');
      }
    } catch (error) {
      toast.error('Error de conexión');
    }
  }

  // Cancela la edición y limpia el formulario
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ titulo: '', descripcion: '', precio: '', categoria: '', imagen: '' });
  }

  // Efecto secundario: valida si hay campos vacíos para deshabilitar el botón
  useEffect(() => {
    // Comprueba si algún valor en formData es una cadena vacía
    const camposVacios = Object.values(formData).some(value => value === '')
    setIsDisabled(camposVacios) // Actualiza estado de bloqueo
  }, [formData]) // Se ejecuta cada vez que cambia formData

  return (
    <div className='crear-publicacion-container flex-column py-5'>
      <div className='crear-publicacion mb-5'>
        {/* Título dinámico según modo edición/creación */}
        <h2>{editingId ? 'Editar publicación' : 'Crear nueva publicación'}</h2>

        <form onSubmit={handleSubmit}>
          <div className='formcontainer'>
            {/* Campos del formulario */}
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
          {/* Botones de acción */}
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

      {/* Tabla de gestión de productos existentes */}
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
              {/* Itera sobre los productos para crear filas de tabla */}
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