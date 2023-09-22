import React, { useEffect, useRef, useState } from "react";
import TopBarWhite from "../components/TopBarWhite";
import { AiOutlineCode, AiOutlineCloudServer, AiOutlineClose } from 'react-icons/ai'
import { ImArrowRight2 } from "react-icons/im";
import { IoIosSearch } from 'react-icons/io'
import { GiArtificialIntelligence, GiFingerPrint } from 'react-icons/gi'
import { SiHiveBlockchain } from 'react-icons/si'
import { MdOutlineDataExploration, MdOutlineSecurity, MdOutlineDeveloperMode, MdMoreHoriz, MdArrowUpward } from 'react-icons/md'
import { GrDeploy, GrCode, GrCloudComputer } from 'react-icons/gr'
import ThumbList from "../components/ThumbList";
import { API_URL } from "../../constants"
import Footer from "../components/Footer";
import LoadingBar from "react-top-loading-bar";

export default function SkillsPage() {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchState, setSearchState] = useState(false)
    const [scrollUpButtonState, setScrollUpButtonState] = useState(false)
    const [selectedOption, setSelectedOption] = useState('option1');
    const topLoadingRef = useRef(null)

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        // Check if searchQuery is not empty or null
        if (searchQuery !== "" && searchQuery !== null) {
            setSearchState(false);
        } else {
            setSearchState(true);
        }

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

    const handleUpClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    useState(() => {
        document.title = "ByteBrio - Skills"
      }, [])


    return (
        <>
            <LoadingBar color='rgb(6 95 70)' ref={topLoadingRef} />
            <TopBarWhite pageSubtitle="Skills" />
            <div className="h-20 w-full bg-white "></div>
            <div className="flex justify-center mt-0">
                <div className="flex space-x-4 text-lg">
                    <button
                        className={`${selectedOption === 'option1'
                            ? 'border-b-[2px] border-emerald-500'
                            : 'border-b-[2px] border-transparent text-gray-500'
                            } px-4 py-1 `}
                        onClick={() => handleOptionClick('option1')}
                    >
                        Skills
                    </button>
                    <button
                        className={`${selectedOption === 'option2'
                            ? 'border-b-[2px] border-emerald-500'
                            : 'border-b-[2px] border-transparent text-gray-500'
                            } px-4 py-1 `}
                        onClick={() => handleOptionClick('option2')}
                    >
                        People
                    </button>
                </div>
            </div>

            <div className="flex w-full justify-center items-center rounded-full overflow-hidden">
                <div className="flex md:w-1/2 w-full px-4 py-3 bg-gray-50 border-none  shadow-lg focus:shadow-lg rounded-full focus:outline-none my-8 mx-4">

                    <button className="text-gray-400 p-1 mr-4">
                        <IoIosSearch className="text-2xl" />
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={selectedOption === "option1" ? "Discover Skills..." : "Find People..."}
                        className="w-full text-lg border-0 bg-transparent font-google outline-none"
                    />

                    {!searchState ?
                        <button
                            onClick={(e) => setSearchQuery('')}
                            className="text-gray-400 p-1 ml-4 hover:text-black">
                            <AiOutlineClose className="text-xl" />
                        </button>
                        : <></>}
                </div>
            </div>

            <div className="flex my-8 justify-center font-google text-emerald-500 items-center text-2xl font-bold">
                <text className="">Search by category</text>
                <ImArrowRight2 className="ml-2 text-xl" />
            </div>

            <div className="flex justify-center items-center m-8">
                <StaggeredList />
            </div>

            <ThumbList topLoadingRef={topLoadingRef} title="Most Searched" url={API_URL + "/contents/latest-items"} itemsPerPage={5} />
            <Footer />

            {scrollUpButtonState ?
                <button
                    onClick={handleUpClick}
                    className="bg-gray-900 cursor-pointer fixed z-100 bottom-10 right-16 text-white p-2 text-2xl rounded-3xl">
                    <MdArrowUpward />
                </button> : <></>}


        </>
    );
}

const StaggeredList = () => {
    const [items, setItems] = useState([
        { id: 1, text: 'AI / ML', icon: <GiArtificialIntelligence /> },
        { id: 2, text: 'Cloud Computing', icon: <GrCloudComputer /> },
        { id: 3, text: 'Blockchain', icon: <SiHiveBlockchain /> },
        { id: 4, text: 'Data Science', icon: <MdOutlineDataExploration /> },
        { id: 5, text: 'Cybersecurity', icon: <MdOutlineSecurity /> },
        { id: 6, text: 'DevOps', icon: <GrDeploy /> },
        { id: 7, text: 'Development', icon: <MdOutlineDeveloperMode /> },
        { id: 8, text: 'Languages', icon: <GrCode /> },
        { id: 9, text: 'Bioinformatics', icon: <GiFingerPrint /> },
        { id: 10, text: 'More', icon: <MdMoreHoriz /> },

        // Add more options as needed
    ]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-50 p-3 hover:shadow-md rounded-xl border cursor-pointer">
                    <div className="text-xl mr-2">
                        {item.icon}
                    </div>
                    <h2 className="text-sm">{item.text}</h2>
                </div>
            ))}
        </div>
    );
};


function SearchBar({ searchState, searchQuery, setSearchQuery }) {
    return (
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
                    </button>
                    : <></>}
            </div>
        </div>
    )
}