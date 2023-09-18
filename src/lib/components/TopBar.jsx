import React, { useState, useEffect } from "react";
import "../../App.css";
import NavList from "./NavList";
import SearchBar from "./SearchBar";
import { IoIosSearch, IoIosMenu } from "react-icons/io";

function TopBar(props) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determine the scroll position
      const scrollY = window.scrollY;

      // Set the header as fixed when scrolling down
      setIsFixed(scrollY > 0);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* <div className="flex items-center justify-center w-full h-16 bg-gray-800 bg-opacity-95">
        <NavList scrollToSection={props.scrollToSection} />
      </div> */}

      <div className={`w-full ${isFixed ? "fixed-header" : "fixed-header"}`}>
        <header className="px-16 h-20 bg-gray-950 bg-opacity-95 shadow-sm  border-b-[1px] border-b-gray-800">
          <section className="h-full flex justify-between items-center">
            <div className="flex items-center justify-evenly">
              <div className="mr-8 text-3xl text-white font-semibold">
                <span>ByteBrio</span>
              </div>
            </div>

            <div>
              <button className="bg-slate-700 text-white p-2 ml-4 shadow-sm hover:shadow-xl rounded-full hover:bg-slate-800 focus:outline-none focus:bg-slate-600">
                <IoIosSearch className="text-xl" />
              </button>
              <button className="bg-slate-700 text-white p-2 ml-4 shadow-sm hover:shadow-xl rounded-full hover:bg-slate-800 focus:outline-none focus:bg-slate-600">
                <IoIosMenu className="text-xl" />
              </button>
            </div>
          </section>
        </header>
      </div>
    </div>
  );
}

export default TopBar;
