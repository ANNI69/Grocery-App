import React from 'react'
import Card from './ProductCard'
import { useAppContext } from '../Context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-4xl font-medium text-start">Best Seller</p>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap 3 lg:grid-cols-5 mt-6">
          {
            products.filter((product) => product.inStock).slice(0, 5).map((product) => (
              <Card key={product._id} product={product} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BestSeller
