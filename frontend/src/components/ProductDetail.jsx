import React from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { products as fallbackProducts } from '../data/products'

const ProductDetail = () => {
  const { id } = useParams() // Para obtener el ID del producto desde la URL
  const { products, loading } = useProducts()

  if (loading) return <div>Cargando...</div>

  const productId = Number(id)
  const product = (products || []).find(p => p.id === productId) || fallbackProducts.find(p => p.id === productId)

  if (!product) return <div>Producto no encontrado</div>

  return (
    <div>
      <div className='container mt-5 d-flex justify-content-center align-items-center'>

        <div className='row'>
          <div className='col-md-12 text-center'><h1>Detalle del producto</h1></div>
          <div className='col-md-7 mt-5'>
            <img src={product.image} alt={product.product_name} className='img-fluid rounded' />
          </div>
          <div className='col-md-3 mt-5'>
            <h1>{product.product_name}</h1>
            <h5 className='mt-3'>Precio: ${product.product_price}</h5>
            <p style={{ whiteSpace: 'pre-line' }}>{product.product_description}</p>
            <button className='btn btn-dark text-white mt-3'>Agregar al carrito</button>
          </div>
        </div>
      </div>
      {Array.isArray(product.product_categories) && product.product_categories.length > 0 && (
        <div className='container mt-5'>
          <div className='categorias d-flex justify-content-start align-items-left gap-3'>
            <div className='row'>
              {product.product_categories.map((category, index) => (
                <div key={index} className='col-sm-12 col-md-4'>
                  <img src={category.image} alt={category.name} className='rounded' style={{ width: '235px' }} />
                  <h4 className='mt-3'>{category.name}</h4>
                  <h6>Precio: ${category.price}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default ProductDetail
