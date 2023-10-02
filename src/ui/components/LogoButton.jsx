import React from "react";
import logo from "../../assets/logo.png";

export default function LogoButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-[.2ch] w-fit hover:bg-primary_hover border-secondary_accent border rounded-full cursor-pointer "
    >
      <img src={logo} className="w-10 h-10" />
    </div>
  );
}
