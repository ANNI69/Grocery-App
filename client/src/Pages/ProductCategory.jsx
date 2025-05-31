import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { categories } from "../assets/assets";
import Card from "../Components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );
  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === searchCategory?.path.toLowerCase()
  );
  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <h1 className="text-2xl font-medium">
            {searchCategory.text.toUpperCase()}
          </h1>
          <div className="w-16 h-0.5 bg-primary rounded mx-auto"></div>
        </div>
      )}
      {
        filteredProducts.length > 0 ?(
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {filteredProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))
          }
          </div>
        ):(
          <div> 
            <h1 className="text-2xl font-medium text-center mt-8">
              No Products Found
            </h1>
          </div>
        )
      }
    </div>
  );
};

export default ProductCategory;
