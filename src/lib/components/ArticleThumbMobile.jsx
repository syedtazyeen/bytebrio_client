import React from "react";
import { Link } from "react-router-dom";

function ArticleThumbMobile(props) {
  const { itemId, image, title, subtitle, date, likes } = props;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();

    return `${month} ${day}`;
  }

  function formatDate(milliseconds) {
    const date = new Date(milliseconds);
  
    // Define date options (adjust these as needed)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
  
    // Format the date
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <Link to={`/contents/item/${itemId}`}>
      <div className="mb-16 flex font-google bg-white rounded-md overflow-hidden">
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

        <div className="aspect-w-1 aspect-h-1 w-48 overflow-hidden rounded-lg">
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
