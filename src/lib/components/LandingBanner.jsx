// src/components/LandingBanner.js

import React from "react";

function LandingBanner({ scrollToSection }) {
  return (
    <div className="bg-gray-950 md:h-[calc(100vh-5rem)] h-[calc(100vh-16rem)] md:px-16 px-4 flex items-center banner-bg">
      <div className="text-left text-white">
        <h1 className="md:text-5xl text-3xl font-bold">Welcome to ByteBrio!</h1>
        <p className="md:text-xl text-lg my-4 text-gray-400">
          Explore narratives, perspectives, <br />
          and insights from authors covering
          <br />a wide array of subjects.
        </p>
        <div className="mt-8">
          <div
            onClick={scrollToSection}
            className="w-fit md:px-8 px-4 md:py-4 py-3 bg-yellow-500 cursor-pointer rounded-full text-black md:text-xl text-base font-semibold inline-block select-none"
          >
            <h1>Start Reading</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingBanner;

{
  /* <div className="flex items-center rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Type here..."
            className="w-96 py-2 px-4 m-4 bg-white border-none  shadow-sm focus:shadow-lg rounded-full focus:outline-none "
          />
          <button className="bg-slate-700 text-white p-3 m-2  shadow-sm hover:shadow-xl rounded-full hover:bg-slate-800 focus:outline-none focus:bg-slate-600">
            <IoIosSearch className="text-xl" />
          </button>
        </div> */
}
