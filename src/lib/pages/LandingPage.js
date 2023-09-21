import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import rct from '../assets/rct.png'

const data = [
    {
        title: "Welcome to ByteBrio",
        subtitle: "Explore narratives, perspectives, and insights...",
        buttonName: "Start Reading",
        buttonLink: ""
    },
    {
        title: "Start to contribute...",
        subtitle: "Create narratives, perspectives, and insights...",
        buttonName: "Get Started",
        buttonLink: ""
    },
    {
        title: "Welcokjbkme to ByteBrio",
        subtitle: "Explore narratives, perspectives, and insights...",
        buttonName: "Start Reading",
        buttonLink: ""
    },
];

export default function LandingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Add scroll event listener
    useEffect(() => {
        let prevScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                setCurrentIndex(1)
            } else if (currentScrollY > 120) {
                setCurrentIndex(2)
            } else {
                setCurrentIndex(0)
            }
            //alert(currentScrollY)

            prevScrollY = currentScrollY;
        };


        // Attach the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);





    return (
        <div className="font-google2 bg-gray-950">
            <TopBar />
            <div className="fixed w-screen justify-evenly  md:h-[calc(100vh-0rem)] h-[calc(100vh-0rem)] md:px-16 px-4 flex items-center z-50">

                {data.slice(currentIndex, currentIndex + 1).map((item) => (


                    <>
                        <BannerContainer
                            key={item.title}
                            title={item.title}
                            subtitle={item.subtitle}
                            buttonName={item.buttonName}
                        />
                        {/* <img
                        className="w-56 rounded-3xl shadow-2xl fade-in-element" 
                        src="https://img.freepik.com/free-vector/man-reading-illustration_114360-8535.jpg?w=2000" /> */}

                    </>
                ))}
            </div>

            <div className="font-google2 md:h-full h-[220vh] py-24  w-full z-10 relative">
                <img src={rct} className="w-1/2 h-[200vh]" />
            </div>
            <div className="font-google2 banner-bg bg-gray-950 h-full w-full fixed top-0 left-0 z-0"></div>

        </div>
    );
}


function BannerContainer({ title, subtitle, buttonName, buttonLink }) {
    const history = useNavigate();

    function handleButton() {
        history("/blogs");
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Use smooth scrolling for a smoother transition
        });
    }

    return (

        <div className="fade-in-element text-left text-white z-50 bg-gray-900 p-8 rounded-2xl shadow-lg">
            <h1 className="md:text-5xl text-3xl font-bold">{title}</h1>
            <p className="md:text-xl text-lg my-4 text-gray-400">
                {subtitle}
            </p>
            <div className="mt-8">
                <div
                    onClick={handleButton}
                    className="w-fit md:px-8 px-4 md:py-4 py-3 bg-yellow-500 cursor-pointer rounded-full text-black md:text-xl text-base font-semibold inline-block select-none"
                >
                    <h1>{buttonName}</h1>
                </div>
            </div>
        </div>

    )
}