import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const CartPage = ({ cardItems, setcardItems }) => {
  const [complete, setComplete] = useState(false);

  const increaseQty = (item) => {
    if (item.product.stock === item.qty) return;

    const updatedItems = cardItems.map((i) => {
      if (i.product._id === item.product._id) {
        i.qty++;
      }
      return i;
    });
    setcardItems(updatedItems);
  };

  const decreaseQty = (item) => {
    if (item.qty > 1) {
      const updatedItems = cardItems.map((i) => {
        if (i.product._id === item.product._id) {
          i.qty--;
        }
        return i;
      });
      setcardItems(updatedItems);
    }
  };

  const removeItemFromCart = (item) => {
    const updatedItems = cardItems.filter(
      (i) => i.product._id !== item.product._id
    );
    setcardItems(updatedItems);
    toast.error("Item removed from cart!");
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const placeOrderHandler = () => {
    fetch(`${apiUrl}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardItems),
    }).then(() => {
      setcardItems([]);
      setComplete(true);
      toast.success("Order placed successfully!", { autoClose: 2000 });
    });
  };

  return (
    <div className="container mx-auto px-4">
      {cardItems.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mt-5 mb-6">
            Your Cart: <b>{cardItems.length} items</b>
          </h2>

          <div className="flex flex-col lg:flex-row justify-between ">
            {/* Cart Items */}
            <div className="lg:w-3/4">
              {cardItems.map((item) => (
                <React.Fragment key={item.product._id}>
                  <hr className="my-4" />
                  <div className="flex flex-wrap items-center">
                    {/* Product Image */}
                    <div className="w-24 h-24 lg:w-32 lg:h-32">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Name */}
                    <div className="flex-1 px-4">
                      <Link
                        to={`/products/${item.product._id}`}
                        className="text-lg font-medium text-blue-600 hover:underline"
                      >
                        {item.product.name}
                      </Link>
                    </div>

                    {/* Price */}
                    <div className="w-24 text-center">
                      <p className="text-lg font-semibold">
                        ${item.product.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex  items-center space-x-2  pt-5 sm:pt-0 mx-auto">
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => decreaseQty(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.qty}
                        readOnly
                        className="w-12 text-center border border-gray-300 rounded"
                      />
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        onClick={() => increaseQty(item)}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Item */}
                    <button
                      className="ml-4 text-red-600 hover:text-red-800 pt-5 sm:pt-0 pr-5"
                      onClick={() => removeItemFromCart(item)}
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/4 mt-8 lg:mt-0">
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
                <hr className="mb-4" />
                <p className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>
                    {cardItems.reduce((acc, item) => acc + item.qty, 0)} units
                  </span>
                </p>
                <p className="flex justify-between mb-4">
                  <span>Est. Total:</span>
                  <span>
                    $
                    {cardItems
                      .reduce(
                        (acc, item) => acc + item.product.price * item.qty,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : !complete ? (
        <h2 className="mt-10 text-center text-lg font-semibold">
          Your Cart is Empty!
        </h2>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold">Order Complete</h2>
          <p className="text-gray-600">
            Your order has been placed successfully.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
