import React from "react";

function NavList(props) {
  var itemList = ["Home", "Articles", "Freebies"];
  var activeItem = "Home"; // Set the active item here

  return (
    <div className="flex">
      {itemList.map(item => (
        <NavItem scrollToSection={props.scrollToSection} key={item} name={item} isActive={item === activeItem} />
      ))}
    </div>
  );
}

function NavItem(props) {
  return (
    <div className={`text-white mx-2 p-2 cursor-pointer border-b-[1px] border-transparent ${
      props.isActive
        ? "text-yellow-500 border-b-yellow-500"
        : "hover:text-white hover:border-b-white"
    } transition border-animation  duration-400`}
    onClick={props.scrollToSection}>
      <span>{props.name}</span>
    </div>
  );
}

export default NavList;
