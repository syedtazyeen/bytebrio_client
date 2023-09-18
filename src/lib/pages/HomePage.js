import Header from '../components/TopBar';
import LandingBanner from '../components/LandingBanner';
import React, { useRef } from 'react';
import ThumbSection from '../components/ThumbSection';
import Footer from '../components/Footer';

function Homepage() {

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


  return (
    <div className='font-google2'>
      <Header scrollToSection={scrollToSection} />
      <div className="h-20 w-full bg-black "></div>
      <LandingBanner scrollToSection={scrollToSection} />

      <ThumbSection refId={targetSectionRef}/>

      <ThumbSection refId={targetSectionRef}/>

      <Footer/>
    </div>
  );
}

export default Homepage;