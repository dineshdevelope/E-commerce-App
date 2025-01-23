import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import AdminProductCard from "../components/AdminProductCard";

const AdminHomePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(`${apiUrl}/products?${searchParam}`);
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProduct();
  }, [searchParam]);

  const handleProductDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h1 id="products_heading" className="text-3xl font-bold text-center my-8">
        Latest Products
      </h1>

      <section
        id="products"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((item) => (
          <AdminProductCard
            key={item._id}
            item={item}
            onDelete={handleProductDelete}
          />
        ))}
      </section>
    </div>
  );
};

export default AdminHomePage;
