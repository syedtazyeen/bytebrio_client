import React from "react";
import loadingImage from "../../assets/logo.png"; // Replace with your loading image path

const SplashScreen = () => {
  return (
    <div 
    className="bg-secondary"
    style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img 
      className="opacity-20 w-32"
      src={loadingImage} alt="Loading" />
    </div>
  );
};

export default SplashScreen;
