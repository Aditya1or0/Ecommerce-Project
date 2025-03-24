import React from 'react'
import { Link } from 'react-router-dom';
import { values } from '../assets/assets';

interface API {
  id: number;
  title: string;
  price: number;
  image: string;
}
interface ProductCardProps{
  product:API
}

const ProductCard:React.FC<ProductCardProps> = ({product}) => {
  const truncatedTitle =
    product.title.length > 25 ? product.title.slice(0, 17)+".." : product.title;
  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white-100/70 mb-6">
    <Link to={`/products/${product.id}`}>
      <div key={product.id}>
        <img className="w-full h-48 object-contain" src={product.image} alt={product.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{truncatedTitle}</div>
          <p className="text-gray-700 text-base font-bold">
          {values.symbol}{product.price}
          </p>
        </div>
      </div>
      </Link>
  
  </div>
  )
}

export default  ProductCard
