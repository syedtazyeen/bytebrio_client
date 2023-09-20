import Header from '../components/TopBar';
import LandingBanner from '../components/LandingBanner';
import React, { useRef, useState } from 'react';
import ThumbSection from '../components/ThumbSection';
import Footer from '../components/Footer';
import ThumbList from '../components/ThumbList';
import SearchDialog from '../components/SearchDialog';
import { API_URL } from "../../constants"
import Loading from '../components/Loading'

function Homepage() {

  const apiUrl = "http://localhost:1000";
  const [fetchStatus, setFetchStatus] = useState(false);

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


 

  useState(()=>{

  })

  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const openSearchDialog = () => {
    setIsSearchDialogOpen(true);
  };

  const closeSearchDialog = () => {
    setIsSearchDialogOpen(false);
  };


  useState(()=>{
    document.title = "ByteBrio"
  })

  return (
    <>
      <Header scrollToSection={scrollToSection} onOpenSearchDialog={openSearchDialog} />
      {fetchStatus ? (<Loading />) : (<div className='font-google2'>

        <div className="h-20 w-full bg-black "></div>
        <LandingBanner scrollToSection={scrollToSection} />

        <ThumbList refId={targetSectionRef} title="Latest" url={API_URL + "/contents/latest-items"} itemsPerPage={5} />
        <ThumbList title="Recommended" url={API_URL + "/contents/recommended-items"} itemsPerPage={5} />

        <Footer />
      </div>)}


    </>
  );
}

export default Homepage;