import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-4xl font-medium">Categories</p>
      <div className="grid grid-cols-2 md:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col items-center justify-center "
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              className="group-hover:scale-110 transition-all duration-300 ease-in-out max-w-28"
              src={category.image}
              alt="img"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
