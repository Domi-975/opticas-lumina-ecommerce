import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Para obtener el ID del producto desde la URL
  return (
    <div className="container mt-5">
      <h1>Detalle del Producto {id}</h1>
      <p>Información del producto. (TODO: Conectar con API)</p>
    </div>
  );
};

export default ProductDetail;