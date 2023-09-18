import React from "react";

function Footer() {
  return (
    <div class="">
    
    <div className="w-full bg-gray-950 mt-24 md:px-16 px-8 py-16 h-full flex flex-col items-center border-b-[1px] border-b-gray-800">
    <div class="grid grid-cols-3 md:gap-4 text-gray-300 text-xs md:text-base">
      <text className="hover:text-white cursor-pointer">About us</text>
      <text className="hover:text-white cursor-pointer">Contact us</text>
      <text className="hover:text-white cursor-pointer">Privacy Policy</text>
    </div>
    </div>
  
    <div className="bg-gray-950 w-full flex flex-col items-center md:text-base text-sm">
    <div class="my-8"> 
      <text class="text-gray-500">Copyright® 2023</text>
    </div>
    </div>

  </div>
  
  );
}

export default Footer;
