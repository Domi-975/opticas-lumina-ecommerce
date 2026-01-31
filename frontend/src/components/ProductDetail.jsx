import React from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
import { products as fallbackProducts } from '../data/products'

const ProductDetail = () => {
  const { id } = useParams() // Para obtener el ID del producto desde la URL
  const { products, loading } = useProducts()
  const { addItem } = useCart()

  if (loading) return <div>Cargando...</div>

  const productId = Number(id)
  const product = (products || []).find(p => p.id === productId) || fallbackProducts.find(p => p.id === productId)

  if (!product) return <div className='container mt-5 text-center'><h3>Producto no encontrado</h3></div>

  // Mapeo de campos para compatibilidad entre backend y datos locales
  const name = product.nombre_producto || product.product_name
  const description = product.descripcion || product.product_description
  const price = product.precio_min || product.product_price
  const image = product.imagenes?.[0] || product.image || '/placeholder.jpg'
  const category = product.nombre_categoria || product.category

  const formatCLP = (n) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(Number(n) || 0);

  return (
    <div className='container py-5'>
      <div className='row g-5 align-items-center'>
        <div className='col-md-6'>
          <div className='product-detail-img-wrapper shadow-sm rounded overflow-hidden'>
            <img 
              src={image} 
              alt={name} 
              className='img-fluid w-100 h-100 object-fit-contain' 
              style={{ minHeight: '400px', objectFit: 'contain' }}
            />
          </div>
        </div>
        
        <div className='col-md-6'>
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/productos" className="text-decoration-none text-muted">Productos</a></li>
              <li className="breadcrumb-item active text-capitalize" aria-current="page">{category}</li>
            </ol>
          </nav>

          <h1 className='display-5 fw-bold mb-3'>{name}</h1>
          <h2 className='text-primary fw-semibold mb-4'>
            {formatCLP(price)}
          </h2>
          
          <div className='mb-4'>
            <h5 className='fw-bold mb-2'>Descripción</h5>
            <p className='text-muted' style={{ whiteSpace: 'pre-line', fontSize: '1.1rem' }}>
              {description}
            </p>
          </div>

          <div className='d-grid gap-2'>
            <button 
              className='btn btn-dark btn-lg py-3 fw-bold'
              onClick={() => {
                addItem({
                  id: product.id,
                  name: name,
                  price: Number(price),
                  image: image
                });
                toast.success(`${name} agregado al carrito`);
              }}
            >
              Agregar al carrito 🛒
            </button>
          </div>
        </div>
      </div>

      {/* Sección de categorías/variantes si existen (del mock data) */}
      {Array.isArray(product.product_categories) && product.product_categories.length > 0 && (
        <div className='mt-5 pt-5 border-top'>
          <h3 className='mb-4 fw-bold'>Categorías relacionadas</h3>
          <div className='row g-4'>
            {product.product_categories.slice(0, 3).map((variant, index) => (
              <div key={index} className='col-12 col-sm-6 col-md-4'>
                <div className='card h-100 border-0 shadow-sm overflow-hidden'>
                  <img src={variant.image} alt={variant.name} className='card-img-top' style={{ height: '200px', objectFit: 'contain' }} />
                  <div className='card-body'>
                    <h5 className='fw-bold mb-1'>{variant.name}</h5>
                    <p className='text-primary fw-semibold mb-0'>{formatCLP(variant.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
