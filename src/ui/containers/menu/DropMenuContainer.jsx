import React, { useEffect, useRef, useState } from "react";

export default function DropMenuContainer({
  menuButton,
  isDropdownVisible,
  menuDataList,
  onHide,
  isBelow
}) {
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        onHide();
      }
    }

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible, onHide]);


  return (
    <>
      <div ref={menuRef} >
        {menuButton}
      </div>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          style={{
            //bottom: isBelow ? "auto" : "100%",
            //top: isBelow ? "100%" : "auto",
          }}
          className={`
          z-10 origin-top-left  text-primary absolute left-5 p-4 mt-2 w-72 rounded-xl shadow-md bg-secondary_accent ring-opacity-50 transform scale-100 transition duration-700`}
        >
          <div
            className="block"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Dropdown content goes here */}
            {menuDataList.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                className="flex p-4 cursor-pointer rounded-xl hover:bg-primary_hover text-smd items-center"
              >
                <div className="text-xl mr-2 font-thin">{item.icon}</div>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
