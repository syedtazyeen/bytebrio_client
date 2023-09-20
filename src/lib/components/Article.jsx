// src/components/ArticleCard.js

import React from "react";
import { Link } from "react-router-dom";

function ArticleCard(props) {
  const { itemId, image, title, subtitle, date, likes } = props;

  function formatDate(milliseconds) {
    var date = parseInt(milliseconds);
    var d = new Date(date);
    var ds = d.toLocaleString("default", { month: "short",day:"numeric" });
    return ds;
  }

  return (
    <Link to={`/contents/item/${itemId}`}>
      <div className=" cursor-pointer bg-white border-b-2 border-white hover:border-slate-500 transition duration-300 w-full overflow-hidden">
        <div className="relative aspect-w-2 aspect-h-1 md:h-56 h-40 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={image}
            className="absolute inset-0 w-full h-full object-fit bg-gray-100"
          />
        </div>
        <div className="py-4 font-google whitespace-normal">
          <h2 className="text-base  font-bold text-gray-800 line-clamp-1">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mb-4 line-clamp-3">
            {subtitle} 
          </p>
          <div className="flex justify-between items-center text-gray-500 text-xs">
            <span className="flex items-center space-x-1">
              <span>{formatDate(date)}</span>
              <span className="mx-2">·</span>
              <span>6 min read</span>
              <span className="mx-2">·</span>
              <span>{likes}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
