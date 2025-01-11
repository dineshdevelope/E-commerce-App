import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = ({ cardItems }) => {
  return (
    <div className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between">
        {/* Logo */}
        <div className="mb-4 lg:mb-0">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" className="w-36" />
          </Link>
        </div>

        {/* Search */}
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <Search />
        </div>

        {/* Cart */}
        <div className="text-center">
          <Link
            to="/cart"
            className="text-lg font-semibold text-gray-700 hover:text-blue-600"
          >
            <span id="cart" className="inline-block mr-2">
              Cart
            </span>
            <span
              id="cart_count"
              className="bg-blue-600 text-white rounded-full px-2 py-1 text-sm"
            >
              {cardItems.length}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
