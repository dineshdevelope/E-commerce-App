import React from "react";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <div>
      <footer className="py-1 bg-black flex items-center justify-center space-x-5 ">
        <p className="text-center text-white py-4">
          Ecommerce 2025, All Rights Reserved
        </p>
        <a
          href="https://github.com/dineshdevelope/Mini-Ecommarce-App"
          target="_blank"
          className="text-white rounded-full bg-gray-800 p-2 hover:bg-gray-700"
        >
          <FiGithub />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
