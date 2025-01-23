import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductEdit = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Get product ID from URL
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    ratings: "",
    seller: "",
    stock: "",
    category: "",
    images: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/product/${id}`);
        const product = response.data;
        // Ensure images is converted to a single string (comma-separated)
        const formattedData = {
          ...product,
          images: product.images.map((img) => img.image).join(", "),
        };
        setFormData(formattedData);
        /*  setFormData(product);
        setLoading(false); */
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch product details");
        console.error(error);
      }
    };
    fetchProduct();
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formattedImages = formData.images
        .split(",")
        .map((image) => ({ image: image.trim() }));

      // Prepare the final payload with the formatted images
      const formattedData = {
        ...formData,
        images: formattedImages, // Replace images string with an array of objects
      };
      console.log(formattedData);
      await axios.put(`${apiUrl}/product/${id}`, formattedData);
      toast.success("Product updated successfully!");
      setLoading(false);
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-5">
        <h1 className="mb-5">Edit your product details here..</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Product Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="description"
              className="block peer-focus:font-medium ... mt-2 text-sm text-gray-400 pb-2"
            >
              Enter Product Description below
            </label>
            <textarea
              id="description"
              rows="4"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Product Description Here"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="price"
                id="price"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={formData.price}
                onChange={handleChange}
              />
              <label
                htmlFor="price"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Price (in $)
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="ratings"
                id="ratings"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                max="5"
                min="0"
                step="0.1"
                value={formData.ratings}
                onChange={handleChange}
              />
              <label
                htmlFor="ratings"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Ratings
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="seller"
                id="seller"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={formData.seller}
                onChange={handleChange}
              />
              <label
                htmlFor="seller"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Seller Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="stock"
                id="stock"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={formData.stock}
                onChange={handleChange}
              />
              <label
                htmlFor="stock"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Stock (in numbers)
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="category"
              id="category"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.category}
              onChange={handleChange}
            />
            <label
              htmlFor="category"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Category
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="images"
              className="block peer-focus:font-medium ... mt-2 text-sm text-gray-400 pb-2"
            >
              Enter Product Picture URL
            </label>
            <textarea
              id="images"
              rows="4"
              name="images"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Product Description Here"
              value={formData.images}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={loading}
          >
            {loading ? "Uploading.." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
