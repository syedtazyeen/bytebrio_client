import Header from '../components/TopBarWhite';
import LandingBanner from '../components/LandingBannerBlogs';
import React, { useEffect, useRef, useState } from 'react';
import ThumbSection from '../components/ThumbSection';
import Footer from '../components/Footer';
import ThumbList from '../components/ThumbList';
import SearchDialog from '../components/SearchDialog';
import { API_URL } from "../../constants"
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar';
import { IoIosSearch } from "react-icons/io";
import { AiOutlineClose } from 'react-icons/ai'
import {MdArrowUpward} from 'react-icons/md'
import SearchPage from './SearchPage';
import LoadingBar from 'react-top-loading-bar';


function Homepage() {

  const apiUrl = "http://localhost:1000";
  const [fetchStatus, setFetchStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState(false)
  const [scrollUpButtonState, setScrollUpButtonState] = useState(false)
  const topLoadingRef = useRef(null)

  const targetSectionRef = useRef(null);
  const scrollToSection = () => {
    if (targetSectionRef.current) {
      const rect = targetSectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      // Calculate the desired scroll position to center the target component
      const scrollToY = rect.top + scrollY - window.innerHeight / (4);

      // Smoothly scroll to the calculated position
      window.scrollTo({ top: scrollToY, behavior: 'smooth' });
    }
  };

  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const openSearchDialog = () => {
    setIsSearchDialogOpen(true);
  };

  const closeSearchDialog = () => {
    setIsSearchDialogOpen(false);
  };


  useEffect(() => {
    // Check if searchQuery is not empty or null
    if (searchQuery !== "" && searchQuery !== null) {
      setSearchState(false);
    } else {
      setSearchState(true);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY >= 10) {
        setScrollUpButtonState(true);
      } else {
        setScrollUpButtonState(false);
      }
    };


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [searchQuery]);

  useState(() => {
    document.title = "ByteBrio - Blogs"
  }, [])

  const sbt = [
    "Staying Ahead on the Latest Topics and Trends",
    "Interest Personally Chosen by You"
  ]

  const handleUpClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }




  return (
    <>

      <Header scrollToSection={scrollToSection} pageSubtitle="Blogs" onOpenSearchDialog={openSearchDialog} />
      <LoadingBar color='rgb(6 95 70)' ref={topLoadingRef} />
      {fetchStatus ? (<Loading />) : (<div className='font-google2'>

        <div className="h-16 w-full bg-black "></div>
        {/* <LandingBanner scrollToSection={scrollToSection} /> */}
        <div className="flex w-full justify-center items-center rounded-full overflow-hidden">
          <div className="flex md:w-1/2 w-full px-4 py-3 bg-gray-50 border-none  shadow-lg focus:shadow-lg rounded-full focus:outline-none my-8 mx-4">

            <button className="text-gray-400 p-1 mr-4">
              <IoIosSearch className="text-2xl" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ByteBrio"
              className="w-full text-lg border-0 bg-transparent font-google outline-none"
            />

            {!searchState ?
              <button
                onClick={(e) => setSearchQuery('')}
                className="text-gray-400 p-1 ml-4 hover:text-black">
                <AiOutlineClose className="text-xl" />
              </button> : <></>}
          </div>
        </div>

        {
          searchState ?
            <>
              <ThumbList topLoadingRef={topLoadingRef} refId={targetSectionRef} title="Latest" subtitle={sbt[0]} url={API_URL + "/contents/latest-items"} itemsPerPage={5} />
              <ThumbList topLoadingRef={topLoadingRef} title="Recommended" subtitle={sbt[1]} url={API_URL + "/contents/recommended-items"} itemsPerPage={5} />
            </> :
            <>
              <SearchPage searchQuery={searchQuery} />
            </>
        }

        <Footer />

        {scrollUpButtonState ?
          <button
            onClick={handleUpClick}
            className="bg-gray-900 cursor-pointer fixed z-100 bottom-10 right-16 text-white p-2 text-2xl rounded-3xl">
            <MdArrowUpward />
          </button> : <></>}

      </div>)}


    </>
  );
}

export default Homepage;