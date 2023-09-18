import React from "react";
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
  return (
    <div className="flex items-center rounded-full overflow-hidden">
      <div className="flex px-4 py-1 bg-white border-none  shadow-sm focus:shadow-lg rounded-full focus:outline-none">
        <input
          type="text"
          placeholder="Search"
          className="w-full  bg-transparent font-google"
        />
        <button className="bg-slate-700 text-white p-2 ml-4 shadow-sm hover:shadow-xl rounded-full hover:bg-slate-800 focus:outline-none focus:bg-slate-600">
          <IoIosSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar

