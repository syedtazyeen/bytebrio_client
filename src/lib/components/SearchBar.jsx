import React from "react";
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
  return (
    <div className="flex w-full justify-center items-center rounded-full overflow-hidden">
      <div className="flex md:w-1/2 w-full px-4 py-2 bg-gray-50 border-none  shadow-xl focus:shadow-lg rounded-full focus:outline-none my-8 mx-4">
        <input
          type="text"
          placeholder="Search ByteBrio"
          className="w-full text-lg bg-transparent font-google outline-none"
        />
        <button className="bg-slate-700 text-white p-2 ml-4 shadow-sm hover:shadow-xl rounded-full hover:bg-slate-800 focus:outline-none focus:bg-slate-600">
          <IoIosSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar

