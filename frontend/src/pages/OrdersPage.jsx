import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/order`);
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  const handleDelete = async (orderId, productId) => {
    const conformation = confirm("Are you sure want to delete order?");
    if (conformation) {
      try {
        const response = await axios.delete(`${apiUrl}/order/${orderId}`, {
          data: { productId }, // Pass productId if deletion is for a specific product
        });

        if (response.status === 200) {
          // Update the state to remove the deleted item
          setOrders(
            (prevOrders) =>
              prevOrders
                .map((order) => {
                  if (order._id === orderId) {
                    return {
                      ...order,
                      cardItems: order.cardItems.filter(
                        (item) => item.product._id !== productId
                      ),
                    };
                  }
                  return order;
                })
                .filter((order) => order.cardItems.length > 0) // Remove orders with no cardItems
          );
          toast.success("Order Deleted..");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error Delete Order");
      }
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen px-2 lg:px-10 py-10">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 bg-blue-500">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Seller
              </th>
              <th scope="col" className="px-6 py-3 bg-blue-500">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity / Price
              </th>
              <th scope="col" className="px-6 py-3 bg-blue-500">
                Order Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-2 py-3 bg-blue-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                {order.cardItems.map((item, index) => (
                  <tr
                    key={`${order._id}-${index}`}
                    className="bg-blue-600 border-b border-blue-400"
                  >
                    <td className="px-6 py-4 font-medium bg-blue-500 text-blue-50 whitespace-nowrap dark:text-blue-100 cursor-pointer">
                      {item.product.name}
                    </td>
                    <td className="px-6 py-4">{item.product.seller}</td>
                    <td className="px-6 py-4 bg-blue-500">
                      {item.product.category}
                    </td>
                    <td className="px-6 py-4">
                      {item.qty} / ${item.product.price}
                    </td>
                    <td className="px-6 py-4 bg-blue-500">${order.amount}</td>
                    <td className="px-6 py-4">{order.status}</td>
                    <td className="px-3 py-2 bg-blue-500 cursor-pointer hover:bg-red-500">
                      <button
                        className="text-white"
                        onClick={() =>
                          handleDelete(order._id, item.product._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
