import React,{useState} from 'react';
import TopBar from '../components/TopBar';
import TopBarWhite from '../components/TopBarWhite';



function EmptyPage() {



  useState(()=>{
    document.title = "Not Found"
  })

  return (
    <>
    <TopBarWhite/>
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-4 items-center justify-center rounded-xl p-8">
        <h1 className="text-2xl text-center font-bold text-gray-800">Page Not Found</h1>
        {/* <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p> */}
        <img className='w-56'
        src='https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000'/>
      </div>
    </div>
    </>
  );
}

export default EmptyPage;
