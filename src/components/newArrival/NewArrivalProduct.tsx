import { FC } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

import Image1 from "../../assets/iphone.png";
import Image2 from "../../assets/vivo.png";

const newArrivals = [
  {
    id: 1,
    name: "Ultra HD Smart TV",
    image: Image1,
    price: "$799",
    rating: 4,
    tag: "New",
  },
  {
    id: 2,
    name: "Noise Cancelling Headphones",
    image: Image2,
    price: "$199",
    rating: 5,
    tag: "New",
  },
  {
    id: 3,
    name: "Stylish Smartwatch",
    image: Image1,
    price: "$149",
    rating: 4,
    tag: "New",
  },
];

const NewArrivalProduct: FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-contain"
                />
                <span className="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.tag}
                </span>
              </div>
              <div className="p-4 flex flex-col justify-between h-[170px]">
                <div>
                  <h3 className="text-gray-800 dark:text-white text-lg font-semibold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {product.price}
                  </p>
                  {/* <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div> */}
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5 active:shadow-sm">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalProduct;
