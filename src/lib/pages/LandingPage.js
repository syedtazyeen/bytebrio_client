import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBarWhite from "../components/TopBarWhite";
import rct from '../assets/rct.png';
import Footer from '../components/Footer';

const data = [
    {
        title: "Follow the latest trend!",
        subtitle: "Get exposed to the trending skillsets.",
        buttonName: "Get Started",
        buttonLink: "/skills",
    },
    {
        title: "Upgrade your skills!",
        subtitle: "Connect with people of your skillset.",
        buttonName: "Connect Now",
        buttonLink: "/skills",
    },
    {
        title: "Explore new resources!",
        subtitle: "Read narratives, perspectives, and insights.",
        buttonName: "Start Reading",
        buttonLink: "/blogs",
    },
    
];

const BannerContainer = ({ title, subtitle, buttonName, buttonLink }) => {
    const history = useNavigate();

    const handleButton = () => {
        history(buttonLink);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="md:w-1/2 fade-in-element text-left text-white z-10 p-8 rounded-2xl shadow-xl bg-gray-100">
            <h1 className="md:text-4xl text-3xl font-bold text-gray-900">{title}</h1>
            <p className="md:text-xl text-lg my-4 text-gray-400">{subtitle}</p>
            <div className="mt-8">
                <div
                    onClick={handleButton}
                    className="w-fit md:px-8 px-4 md:py-4 py-3 bg-emerald-400 cursor-pointer rounded-full text-black md:text-xl text-base font-semibold inline-block select-none shadow-md hover:shadow-lg"
                >
                    <h1 className="text-white">{buttonName}</h1>
                </div>
            </div>
        </div>
    );
};

export default function LandingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY >= 0 && currentScrollY <= 200) {
                setCurrentIndex(0);
            } else if (currentScrollY > 200 && currentScrollY <= 600) {
                setCurrentIndex(1);
            } else if (currentScrollY > 600) {
                setCurrentIndex(2);
            }
        };


        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useState(() => {
        document.title = "Welcome to ByteBrio"
      }, [])

    return (
        <>
            <TopBarWhite/>
            <div className="font-google2 fixed w-screen justify-evenly md:h-[calc(100vh-0rem)] h-[calc(100vh-0rem)] md:px-16 px-4 flex items-center z-10">
                {data.slice(currentIndex, currentIndex + 1).map((item) => (
                    <BannerContainer
                        key={item.title}
                        title={item.title}
                        subtitle={item.subtitle}
                        buttonName={item.buttonName}
                        buttonLink={item.buttonLink}
                    />
                ))}
            </div>
            <div className="font-google2 md:h-full h-[220vh] py-24 w-full relative">
                <img src={rct} className="w-1/2 h-[200vh]" alt="RCT" />
            </div>
            <div className="font-google2 banner-bg h-full w-full fixed top-0 left-0 "></div>
            {/* <Footer /> */}
        </>
    );
}
