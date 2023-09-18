import React, { useState, useEffect } from "react";
import ArticleCard from "./Article";

import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

function ThumbSection(props) {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const showNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const showPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the URL of the API or server endpoint you want to fetch data from
    const apiUrl = "http://api.bytebrio.online"; // Replace with your API endpoint URL

    // Make a GET request using fetch
    fetch(apiUrl+"/contents")
      .then((response) => response.json())
      .then((jsonData) => {
        // Parse the JSON data into JavaScript objects
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="mx-16">
      <div
        ref={props.refId}
        className="flex justify-between items-center text-xl font-bold my-8"
      >
        <text>Latest</text>

        <div
          ref={props.refId}
          className="flex justify-between items-center text-xl font-bold my-8"
        >
          <div className="flex items-center space-x-4 text-sm">
            <button
              onClick={showPrevPage}
              className={`bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              <BiSolidLeftArrow />
            </button>
            <span>{currentPage}</span>
            <button
              onClick={showNextPage}
              className={`bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full ${
                endIndex >= data.length ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={endIndex >= data.length}
            >
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      </div>

      <>
        <div className="flex flex-wrap">
          {data.slice(startIndex, endIndex).map((article) => {
            return (
              <div key={article.id} className="w-1/3 p-2">
                 <ArticleCard {...article} />
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
}

export default ThumbSection;
