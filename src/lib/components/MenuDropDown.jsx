import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="origin-top-right absolute right-0 mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {/* Dropdown items */}
        <div className="py-1" role="none">
          <Link
            to="/contents/addPost"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b-[1px] border-b-gray-200"
            role="menuitem"
          >
            Create Post
          </Link>
          <Link
            to="/notfound"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Login / SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;
