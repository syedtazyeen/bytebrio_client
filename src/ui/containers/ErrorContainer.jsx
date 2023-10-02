import React from "react";
import { MdNearbyError } from "react-icons/md";
import { TbReload } from "react-icons/tb";

export default function ErrorContainer() {
  return (
    <>
      <div className="fixed flex items-center justify-center w-full h-screen inset-0 z-10 backdrop-blur">
        <div className="text-lg flex items-center text-center font-bold text-primary">
          <MdNearbyError className="text-6xl mr-4" />
          <div>
            <p>Error Loading</p>
            <p className="flex items-center">Please refresh <TbReload className="ml-2"/></p>
          </div>
        </div>
      </div>
    </>
  );
}
