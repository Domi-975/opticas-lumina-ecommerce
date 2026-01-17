import { useState, useEffect } from 'react'
import '../pages/CrearPublicacion.css'

const CrearPublicacion = () => {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '', categoria: '', stock: '', imagen: '' })
  const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  // Función que se ejecuta al enviar el formulario y evitar que la página se recargue.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.precio <= 0) {
      alert('El precio debe ser mayor a 0')
      return
    }
    console.log('publicacion creada', formData)
  }

  // Sumamos useEffect para que valide el formulario, que ninguno de los campos esté vacío. Trae el array de valores, con el Some devuelve true si al menos uno de ellos está vacío
  useEffect(() => {
    const camposVacios = Object.values(formData).some(value => value === '')
    setIsDisabled(camposVacios)
  }, [formData]) // se ejecuta cuando cambia input

  return (
    <div className='container'>
      <div className='crear-publicacion'>
        <h2>Crear nueva publicación</h2>

        <form onSubmit={handleSubmit}>

          <div className='formcontainer'>
            <div className='form'>
              <label> Nombre del producto: </label>
              <input
                type='text'
                name='nombre'
                placeholder='Nombre del lente'
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form'>
              <label> Descripción del producto: </label>
              <textarea
                name='descripcion'
                placeholder='Descripción del producto'
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form'>
              <label> Precio: </label>
              <input
                type='number'
                name='precio'
                placeholder='Precio del producto'
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form'>
              <label> Categoría del producto: </label>
              <input
                type='text'
                name='categoria'
                placeholder='Categoria'
                value={formData.categoria}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form'>
              <label> Stock: </label>
              <input
                type='number'
                name='stock'
                placeholder='Stock'
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form'>
              <label> Imagen: </label>
              <input
                type='text'
                name='imagen'
                placeholder='URL de la imagen'
                value={formData.imagen}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type='submit' className='btn-submit' disabled={isDisabled}> Crear publicación</button>
        </form>
      </div>
    </div>
  )
}

export default CrearPublicacion
