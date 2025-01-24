import React, { useState, useEffect, useRef } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = ({ cardItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* Admin Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-lg font-semibold text-white hover:text-blue-600 focus:outline-none"
          >
            Admin
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to="/addproduct"
                    onClick={closeDropdown} // Close dropdown on click
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    onClick={closeDropdown} // Close dropdown on click
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Edit / Delete Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    onClick={closeDropdown} // Close dropdown on click
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          )}
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
