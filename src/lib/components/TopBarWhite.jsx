import React, { useState, useEffect } from "react";
import "../../App.css";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import logo from "../assets/logo-dark.png";
import { Link } from "react-router-dom";
import MenuDropdown from "./MenuDropDown";

function TopBarWhite({ openSearchDialog,pageSubtitle }) {
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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



  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className={`w-full bg-white fixed z-50`}>
        <header className="md:px-16 px-4  h-16  bg-opacity-95 shadow-sm  border-b-[1px] border-b-gray-200">
          <section className="h-full flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center justify-evenly cursor-pointer"
            >
              <div className="font-google2 mr-8 items-center flex justify-center md:text-2xl text-xl text-gray-800 font-bold">
                <img
                  src={logo}
                  className="md:w-6 w-6 h-6 md:h-6 md:mr-4 mr-1"
                />
                <span className="pr-4">ByteBrio</span>
                <span className="font-google font-normal md:text-xl text-sm pl-4 border-l border-gray-300">
                  {pageSubtitle}
                </span>
              </div>
            </Link>

            <div>
              {/* <Link to="/search">
                <button
                  onClick={openSearchDialog}
                  className="bg-slate-700 text-white p-2 ml-4 shadow-sm hover:shadow-xl rounded-full hover:bg-slate-800 focus:outline-none focus:bg-slate-600"
                >
                  <IoIosSearch className="text-xl" />
                </button>
              </Link> */}
              <button
                onClick={handleMenu}
                className="bg-emerald-500 text-white p-2 ml-4 shadow-sm hover:shadow-xl rounded-full hover:bg-emerald-600 focus:outline-none focus:bg-slate-600"
              >
                {isMenuOpen ? (
                  <IoIosClose className="text-xl" />
                ) : (
                  <IoIosMenu className="text-xl" />
                )}
              </button>
              {isMenuOpen ? <MenuDropdown /> : <></>}
            </div>
          </section>
        </header>
      </div>
    </div>
  );
}

export default TopBarWhite;


