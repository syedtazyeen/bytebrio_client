import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center z-50 opacity-90">
      <div className=" flex justify-center items-center h-56 z-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-12 border-b-4 border-primary z-100" />
      </div>
    </div>
  );
}
