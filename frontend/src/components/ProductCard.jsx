import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
const ProductCard = ({ item }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={item.images[0].image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col">
        <h5 className="text-lg font-semibold text-gray-800 mb-2">
          <Link
            to={`/products/${item._id}`}
            className="hover:text-blue-500 transition-colors"
          >
            {item.name}
          </Link>
        </h5>
        <div className="flex items-center mb-2 ">
          <div className="flex gap-1 items-center mx-auto">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={22}
                color={star <= item.ratings ? "#ffc107" : "#8a8486"} // Fill based on rating
              />
            ))}
            <p style={{ marginLeft: "10px" }}>
              Rating:{" "}
              <span className="text-yellow-800 font-semibold mr-0.5">
                {item.ratings}
              </span>
              /5
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-gray-900 mb-4">${item.price}</p>
        <Link
          to={"products/" + item._id}
          className="py-2 px-4 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
