import React, { useState, useEffect } from "react";
import ArticleCard from "./Article";

import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import ArticleThumbMobile from "./ArticleThumbMobile";

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
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 786);

  useEffect(() => {
    const apiUrl = "http://localhost:1000";

    fetch(apiUrl + "/contents/latest-items")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 786);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="md:mx-16 mx-4">
      <div
        ref={props.refId}
        className="flex justify-between items-center text-xl font-bold mt-16 mb-8"
      >
        <text>Latest</text>

        {/* <div
          ref={props.refId}
          className="flex justify-between items-center text-xl font-bold my-8"
        >
          <div className="flex items-center space-x-4 text-sm">
            <button
              onClick={showPrevPage}
              className={`border-[1px] border-gray-800 hover:border-gray-900 text-gray-800 font-bold py-2 px-4 rounded-full ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              <BiSolidLeftArrow />
            </button>
            <span>{currentPage}</span>
            <button
              onClick={showNextPage}
              className={`border-[1px] border-gray-800 hover:border-gray-900 text-gray-800 font-bold py-2 px-4 rounded-full ${
                endIndex >= data.length ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={endIndex >= data.length}
            >
              <BiSolidRightArrow />
            </button>
          </div>
        </div> */}
      </div>

      <>
        {/* <div className="flex flex-wrap overflow-x-auto whitespace-nowrap">
          {data.slice(startIndex, endIndex).map((article) => {
            return (
              <div key={article.id} className={isWideScreen ? "w-1/3 p-2" : ""}>
                {isWideScreen ? (
                  <ArticleCard {...article} />
                ) : (
                  <ArticleThumbMobile {...article} />
                )}
              </div>
            );
          })}
        </div> */}
        <div className="md:overflow-x-scroll md:whitespace-nowrap scrollbar-hide">
          {data.map((article) => (
            <div
              key={article.id}
              className="md:inline-block md:w-1/3 md:p-2 md:align-top"
            >
              {isWideScreen ? (
                <ArticleCard {...article} />
              ) : (
                <ArticleThumbMobile {...article} />
              )}
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default ThumbSection;
