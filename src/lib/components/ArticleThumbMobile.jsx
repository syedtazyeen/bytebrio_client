import React from "react";
import { Link } from "react-router-dom";

function ArticleThumbMobile(props) {
  const { itemId, image, title, subtitle, date, likes } = props;

  
  function formatDate(milliseconds) {
    var date = parseInt(milliseconds);
    var d = new Date(date);
    var ds = d.toLocaleString("default", { month: "short", day: "numeric"});
    return ds;
  }


  return (
    <Link to={`/contents/item/${itemId}`}>
      <div className="mb-16 flex items-center font-google bg-white rounded-md overflow-hidden">
        <div className="w-full p-0 mr-2">
          <h2 className="text-base font-bold text-gray-800 line-clamp-2">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mb-4 line-clamp-3">
            {subtitle}
          </p>
          <div className="items-center text-gray-500 text-sm">
            <span className="font-bold"></span>
            <span>{formatDate(date)}</span>
            <span className="mx-2">·</span>
            <span>6 min read</span>
          </div>
        </div>

        <div className="aspect-w-2 aspect-h-1 w-64 h-24 overflow-hidden rounded-lg">
          <img
            src={image}
            alt=""
            className="object-fit w-full h-full bg-gray-100"
          />
        </div>
      </div>
    </Link>
  );
}

export default ArticleThumbMobile;
