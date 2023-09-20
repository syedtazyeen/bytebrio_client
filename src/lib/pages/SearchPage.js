import React, { useEffect, useState, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineFilter } from 'react-icons/hi'
import ArticleCard from "../components/Article";
import ArticleThumbMobile from "../components/ArticleThumbMobile";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";
// import CircularProgress from '@mui/joy/CircularProgress';
// import { offset, flip, autoUpdate } from '@floating-ui/react-dom';


function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 786);
  const inputRef = useRef(null);


  // Function to fetch data based on the search query
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `${API_URL}/contents/search/search?word=${searchQuery}`;
      const response = await fetch(apiUrl);
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

  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;

  const showNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const showPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    inputRef.current.focus()
  })

  useState(() => {
    document.title = "Search Bytebrio"
  })

  return (
    <>

      <div className="mx-4 md:mx-auto mt-4 mb-12 flex justify-between items-center px-4 py-2 bg-gray-100 md:w-1/3 rounded-2xl shadow-md">
        <input
          className="bg-transparent outline-none font-google w-full"
          placeholder="Search ByteBrio"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={inputRef}
        />
        <div
          onClick={fetchData}
          className="cursor-pointer mr-2 hover:bg-yellow-400 rounded-xl p-1">
          <AiOutlineSearch
            className="text-2xl "
          />
        </div>
        <div
          className="cursor-pointer hover:bg-yellow-400 rounded-xl p-1.5">
          <HiOutlineFilter
            className="text-xl text-gray-500"
          />
        </div>


      </div>
      <div className="md:overflow-x-scroll md:whitespace-nowrap scrollbar-hide">
        {isLoading ? (
          <>
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-16 border-b-4 border-yellow-400"></div>
            </div>
          </>
        ) : (
          data.length != 0 ? (
            data.slice(startIndex, endIndex).map((article) => (
              <div key={article.itemId} className="md:inline-block  md:w-1/3 md:p-2 md:mx-8 md:align-top mx-4">
                {isWideScreen ? (
                  <ArticleCard {...article} />
                ) : (
                  <ArticleThumbMobile {...article} />
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-96">
              <img
                src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg"
                className="w-1/4 p-4"
                alt="404"
              />
            </div>
          )

        )}
      </div></>
  );
}

export default SearchPage;
