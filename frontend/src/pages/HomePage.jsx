import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await axios.get(`${apiUrl}/products?${searchParam}`);
      setProducts(result.data);
    };
    fetchProduct();
  }, [searchParam]);

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
          <ProductCard key={item._id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
