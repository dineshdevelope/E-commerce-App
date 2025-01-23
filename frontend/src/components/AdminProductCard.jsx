import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AdminProductCard = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/products/${item._id}`);
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleDelete = async () => {
    const confirmation = confirm("Are you sure want to delete?");
    if (confirmation) {
      try {
        await axios.delete(`${apiUrl}/product/${item._id}`);
        toast.warning("Product Deleted");
        onDelete(item._id);
        /*  navigate("/admin"); */
      } catch (error) {
        toast.error("Failed to delete product. Please try again.");
        console.error("Delete failed:", error);
      }
    }
  };
  const handleEdit = () => {
    navigate(`/editproduct/${item._id}`);
  };
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
        <div className="flex justify-center items-center justify-between ">
          <button
            onClick={handleNavigation}
            className="py-2 px-2.5 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View
          </button>
          <button
            className="py-2 px-2.5 text-center bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition-colors"
            onClick={() => handleEdit(item._id)}
          >
            Edit
          </button>
          <button
            className="py-2 px-2.5 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
