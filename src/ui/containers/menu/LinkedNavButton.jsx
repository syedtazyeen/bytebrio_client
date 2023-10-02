import React from "react";
import { Link } from "react-router-dom";
import {
  activeMenuBtnClass,
  passiveMenuBtnClass,
} from "../constants/tailwind-classes";

export default function LinkedNavButton({
  menu,
  isNavWide,
  currentIndex,
  handleCurrentIndex,
}) {
  return (
    <Link
      to={`${menu.path}`}
      onClick={(e) => handleCurrentIndex(menu.id)}
      className={
        menu.id === currentIndex ? activeMenuBtnClass : passiveMenuBtnClass
      }
    >
      <div className="relative items-center flex group">
        <span className="text-[1.6rem]">
          {menu.id===currentIndex ? menu.activeIcon : menu.icon}
        </span>
        {menu.tag !== null ? (
          <span className="absolute top-0 left-0 bg-app w-2 h-2 rounded-full" />
        ) : (
          <></>
        )}
      </div>
      {isNavWide ? <p className="ml-2">{menu.name}</p> : <></>}
    </Link>
  );
}
