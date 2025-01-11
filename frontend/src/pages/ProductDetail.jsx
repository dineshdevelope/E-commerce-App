import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const ProductDetail = ({ cardItems, setcardItems }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await axios.get(`${apiUrl}` + "/product/" + id);
      setProduct(result.data);
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const itemExits = cardItems.find(
      (item) => item.product._id === product._id
    );

    if (!itemExits) {
      const newItem = { product, qty };
      setcardItems((state) => [...state, newItem]);
      toast.success("CartItem Added Successfully");
    }
  };

  const increaseQty = () => {
    if (product.stock == qty) {
      return;
    }
    setQty((state) => state + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {product && (
        <div className="flex flex-col lg:flex-row justify-between items-center py-8">
          {/* Product Image */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={product.images[0].image}
              alt={product.name}
              className="w-full h-auto max-w-lg mx-auto"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 lg:pl-8">
            <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-4">
              Product # {product._id}
            </p>

            {/* Rating */}

            <div className="flex items-center mb-2 flex justify-center my-2">
              <div className="flex gap-1 items-center mx-auto">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={22}
                    color={star <= product.ratings ? "#ffc107" : "#8a8486"} // Fill based on rating
                  />
                ))}
                <p style={{ marginLeft: "10px" }}>
                  Rating:{" "}
                  <span className="text-yellow-800 font-semibold mr-0.5">
                    {product.ratings}
                  </span>
                  /5
                </p>
              </div>
            </div>

            <p className="text-2xl font-semibold mb-4">${product.price}</p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4 mb-5 sm:mb-8 justify-center">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={decreaseQty}
              >
                -
              </button>
              <input
                type="number"
                value={qty}
                readOnly
                className="w-16 text-center border border-gray-300 rounded"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={increaseQty}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={addToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>

            {/* Stock Status */}
            <p className="mt-4">
              Status:{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr className="my-4" />

            {/* Description */}
            <h4 className="text-xl font-semibold mb-2">Description:</h4>
            <p className="text-gray-700">{product.description}</p>

            {/* Seller Info */}
            <hr className="my-4" />
            <p className="text-sm text-gray-600">
              Sold by:{" "}
              <strong className="text-red-500 font-semibold">
                {product.seller}
              </strong>
            </p>

            {/* Rating */}
            <div className="flex justify-center mt-4">
              {/* You can add a review section here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
