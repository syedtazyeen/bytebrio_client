// src/components/LandingBanner.js

import React from "react";

function LandingBanner({scrollToSection}) {

  
  return (
    <div className="bg-gray-950 h-[calc(100vh-5rem)] md:px-16 px-8 flex justify-center items-center banner-bg">
    <div className="text-left text-white">
      <h1 className="md:text-4xl text-2xl font-semibold">Welcome to ByteBrio!</h1>
      <p className="md:text-lg text-sm my-4 text-gray-400">
        Explore narratives, perspectives, and insights from authors covering
        a wide array of subjects.
      </p>
      <div className="mt-8">
        <div onClick={scrollToSection} className="w-fit md:px-6 px-3 md:py-2 py-2 bg-yellow-500 cursor-pointer rounded-full text-black md:text-lg text-sm inline-block">
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
