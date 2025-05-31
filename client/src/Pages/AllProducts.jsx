import React, { useState, useEffect } from 'react'
import { useAppContext } from '../Context/AppContext.jsx'
import Card from '../Components/ProductCard.jsx'

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
          } else {
            setFilteredProducts(products);
          }
    }, [products, searchQuery]);
  return (
    <div className='mt-16 flex flex-col w-full items-center text-2xl font-semibold uppercase'>
      <div className='text-center mb-6'>
        <p>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded mx-auto'></div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4'>
        {
          filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <Card key={index} product={product} />
          ))
        }
      </div>
    </div> 
  )
}

export default AllProducts
