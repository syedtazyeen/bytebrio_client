import Header from '../components/TopBar';
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
import SearchPage from './SearchPage';

function Homepage() {

  const apiUrl = "http://localhost:1000";
  const [fetchStatus, setFetchStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState(false)

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
  }, [searchQuery]);

  useState(() => {
    document.title = "ByteBrio Blogs"
  },[])

  const sbt = [
    "Staying Ahead on the Latest Topics and Trends",
    "Interest Personally Chosen by You"
  ]

  return (
    <>
      <Header scrollToSection={scrollToSection} pageSubtitle="Blogs" onOpenSearchDialog={openSearchDialog} />
      {fetchStatus ? (<Loading />) : (<div className='font-google2'>

        <div className="h-16 w-full bg-black "></div>
        {/* <LandingBanner scrollToSection={scrollToSection} /> */}
        <div className="flex w-full justify-center items-center rounded-full overflow-hidden">
          <div className="flex md:w-1/2 w-full px-4 py-2 bg-gray-50 border-none  shadow-xl focus:shadow-lg rounded-full focus:outline-none my-8 mx-4">

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
              <ThumbList refId={targetSectionRef} title="Latest" subtitle={sbt[0]} url={API_URL + "/contents/latest-items"} itemsPerPage={5} />
              <ThumbList title="Recommended" subtitle={sbt[1]} url={API_URL + "/contents/recommended-items"} itemsPerPage={5} />
            </> :
            <>
              <SearchPage searchQuery={searchQuery} />
            </>
        }

        <Footer />
      </div>)}


    </>
  );
}

export default Homepage;