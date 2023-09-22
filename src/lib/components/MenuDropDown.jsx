import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="origin-top-right absolute right-0 mt-6 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {/* Dropdown items */}
        <div className="py-1" role="none">
          <Link
            to="/contents/addBlog"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b-[1px] border-b-gray-200"
            role="menuitem"
          >
            <IoCreateOutline className="text-xl mr-2" />
            Create Post
          </Link>
          <Link
            to="/login"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <AiOutlineUser className="text-xl mr-2" />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;
