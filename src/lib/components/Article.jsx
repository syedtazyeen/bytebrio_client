// src/components/ArticleCard.js

import React from "react";
import { Link } from "react-router-dom";

function ArticleCard(props) {
  const { itemId,image, title, subtitle, date, likes } = props;

  return (
    <Link to={`/contents/${itemId}`}>
      <div className="cursor-pointer bg-white border-b-2 border-white hover:border-slate-500 transition duration-300 overflow-hidden">
        <div className="relative aspect-w-2 aspect-h-1 md:h-56 h-40 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="py-4 whitespace-normal">
          <div className="flex justify-between items-center text-gray-500 text-xs">
            <span>{date}</span>
            <span className="flex items-center space-x-1">
              <span>{likes}</span>
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-4 line-clamp-1">
            {title}
          </h2>
          <p className="font-google text-black text-base mb-4 line-clamp-3">
            {subtitle}
          </p>
          <p>Read More</p>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
