import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchHandler = () => {
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    }
  };

  return (
    <div className="flex items-center">
      {/* Search Input */}
      <input
        type="text"
        id="search_field"
        onBlur={searchHandler}
        placeholder="Enter Product Name ..."
        className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setKeyword(e.target.value)}
      />
      {/* Search Button */}
      <button
        id="search_btn"
        className="px-4 py-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={searchHandler}
      >
        {/*  <i className="fa fa-search" aria-hidden="true"></i> */}
        <FiSearch />
      </button>
    </div>
  );
};

export default Search;
