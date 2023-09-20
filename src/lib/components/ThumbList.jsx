import React, { useState, useEffect } from "react";
import ArticleCard from "./Article";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import ArticleThumbMobile from "./ArticleThumbMobile";
import Loading from "./Loading";

function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
}

function ThumbList(props) {
  //alert(props.setFetchStatus)
  const { title, url, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useFetchData(url);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 786);

  // Pass isLoading value to the parent component
  useEffect(() => {
    setIsWideScreen(window.innerWidth >= 786);
    //props.setFetchStatus(isLoading);
  }, [isLoading, props]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const showNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const showPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="md:mx-16 mx-4">
      <div
        ref={props.refId}
        className="font-google text-gray-500 flex justify-between items-center text-xl font-bold mt-16 mb-8"
      >
        <span>{title}</span>
      </div>
      <div className="md:overflow-x-scroll md:whitespace-nowrap scrollbar-hide">
        {isLoading ? (
        <Loading height={false}/>
     
        ) : (
          data.slice(startIndex, endIndex).map((article) => (
            <div
              key={article.itemId}
              className="md:inline-block  md:w-1/3 md:p-2 md:align-top"
            >
              {isWideScreen ? (
                <ArticleCard {...article} />
              ) : (
                <ArticleThumbMobile {...article} />
              )}
            </div>
          ))
        )}
      </div>
      {/* Add pagination controls here */}
      {/* <div className="mt-4">
    <button
      onClick={showPrevPage}
      disabled={currentPage === 1}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
    >
      <BiSolidLeftArrow /> Prev
    </button>
    <button
      onClick={showNextPage}
      disabled={endIndex >= data.length}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
    >
      Next <BiSolidRightArrow />
    </button>
  </div> */}
    </div>
  );
}

export default ThumbList;
