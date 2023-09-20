// Loading.js

import React from 'react';

const Loading = ({height}) => {
  return (
    <>
    {
      height ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-12 border-b-4 border-gray-800"/>
        </div>
      ):(
        <div className="flex justify-center items-center h-56">
          <div className="animate-spin rounded-full h-12 w-12 border-t-12 border-b-4 border-gray-800"/>
        </div>
      )
    }
    </>
  );
};

export default Loading;
