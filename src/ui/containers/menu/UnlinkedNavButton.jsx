import React from "react";
import { passiveMenuBtnClass } from "../constants/tailwind-classes";

export default function UnlinkedNavButton({
  menu,
  isNavWide,
  toggleAddBtnDropdown,
}) {
  return (
    <div
      onClick={toggleAddBtnDropdown}
      className={passiveMenuBtnClass + " cursor-pointer"}
    >
      <div className="relative items-center flex group">
        <span className="text-[1.6rem] group-hover/edit:translate-x-0.5 group-hover/edit:text-primary_accent">
          {menu.icon}
        </span>
      </div>
      {isNavWide ? <p className="ml-2 ">{menu.name}</p> : <></>}
    </div>
  );
}
