import React, { useState, useEffect } from "react";

const ScrollHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isScrollingUp = prevScrollPos < currentScrollPos;

    setIsVisible(isScrollingUp || currentScrollPos == 0);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const headerStyles = {
    //transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <header
      style={headerStyles}
      className="z-50 px-16 py-6 h-24 w-full bg-gray-950 bg-opacity-95 shadow-sm border-b-[1px] border-b-gray-800"
    >
      <section className="h-full flex justify-between items-center">
        <div className="flex items-center justify-evenly">
          <div className="mr-8 text-3xl text-white font-semibold">
            <span>ByteBrio</span>
          </div>
        </div>
        {/* Add your SearchBar component here */}
        <div className="px-8 py-2.5 bg-yellow-500 rounded-full text-black font-semibold">
          <h1>Login</h1>
        </div>
      </section>
    </header>
  );
};

export default ScrollHeader;
