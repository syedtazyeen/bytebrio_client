import React, { useEffect, useRef, useState } from "react";
import { RiArrowRightUpFill } from "react-icons/ri";
import {
  FaCamera,
  FaChartBar,
  FaCode,
  FaDigitalTachograph,
  FaMobileAlt,
  FaPaintBrush,
  FaPenNib,
  FaShieldAlt,
  FaUser,
  FaUserCircle,
  FaVideo,
} from "react-icons/fa";
//import LatestByteListContainer from "../lists/LatestBytesListContainer";
import UserInfoPallet from "../../../ui/components/UserInfoPallet";
import LatestLogsListContainer from "../lists/LatesLogsListContainer";
import LatestBytesListContainer from "../lists/LatestBytesListContainer";
//import HomeSearchContainer from "./HomeSearchContainer";

export default function HomeInitialContainer({ handleSelectedTopicItem }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabContainer, setSelectedTabContainer] = useState(
    <BytesContainer />
  );

  const [isSticky, setIsSticky] = useState(false);
  const stickyContainerRef = useRef(null);
  const scrollPositions = useRef({
    bytes: 0,
    logs: 0,
  });

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogsButtonClick = () => {
    scrollPositions.current = {
      ...scrollPositions.current,
      [selectedTab === 0 ? "bytes" : "logs"]: window.scrollY,
    };
    setSelectedTab(1);
  };

  useEffect(() => {
    if (selectedTab === 0) {
      setSelectedTabContainer(<BytesContainer />);
    } else {
      setSelectedTabContainer(<LogsContainer />);
      window.scrollTo(0, scrollPositions.current.logs);
    }
  }, [selectedTab]);

  return (
    <>
      <div className="p-8 text-primary">
        <p className="text-2xl flex justify-center w-full mb-8">
          Search by&nbsp;
          <span className="font-semibold font-type1"> Topic</span>
          <RiArrowRightUpFill className="text-3xl" />
        </p>
        <StaggeredList handleSelectedTopicItem={handleSelectedTopicItem} />
      </div>

      <div className="border-t pb-8 border-secondary_accent relative">
        <p className="text-xl text-primary flex justify-center w-full mb-0 p-4">
          For&nbsp;
          <span className="font-semibold font-type1"> you</span>
          <RiArrowRightUpFill className="text-2xl" />
        </p>
        <div className="border-b border-secondary_accent font-bold flex sticky justify-evenly top-0 backdrop-blur bg-secondary bg-opacity-90">
          <div
            onClick={() => setSelectedTab(0)}
            className="w-full hover:bg-primary_hover cursor-pointer flex justify-center"
          >
            <button
              className={`py-4  w-fit relative ${
                selectedTab === 0 ? "text-primary" : "text-primary_accent"
              }`}
            >
              Bytes
              {selectedTab === 0 && (
                <div className="bg-primary rounded-full h-1 w-full absolute bottom-0"></div>
              )}
            </button>
          </div>
          <div
            onClick={() => handleLogsButtonClick()}
            className="w-full hover:bg-primary_hover cursor-pointer flex justify-center"
          >
            <button
              className={`py-4 w-fit relative ${
                selectedTab === 1 ? "text-primary" : "text-primary_accent"
              }`}
            >
              Logs
              {selectedTab === 1 && (
                <div className="bg-primary rounded-full h-1 w-full absolute bottom-0"></div>
              )}
            </button>
          </div>
        </div>
        {selectedTabContainer}
      </div>
    </>
  );
}

function LogsContainer() {
  return <LatestLogsListContainer />;
}

function BytesContainer() {
  return <LatestBytesListContainer />;
}

// function BytesContainer() {
//   return (
//     <>
//       {Array.from({ length: 10 }, (_, index) => (
//         <div
//           key={index}
//           className="text-primary flex justify-center mx-[0rem] px-2 py-8 hover:bg-gray-0 cursor-pointer border-t border-secondary_accent"
//         >
//           <div style={{ maxWidth: "32rem" }} className="">
//             <UserInfoPallet
//               name={`name${index + 1}`}
//               profile_image="dc"
//               isGreenTick={true}
//             />
//             <p className="line-clamp-3 overflow-hidden my-4">
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
//               maxime consequatur distinctio earum molestias labore suscipit
//               voluptatum. Obcaecati inventore aliquam vitae eum modi sed, quo
//               esse sit quos omnis culpa. At, sint placeat. Tempora, corporis,
//               delectus eveniet consectetur nam nobis, deleniti dolor voluptatem
//               dolorum sunt repellat quo debitis hic cumque.
//             </p>
//             {index % 2 === 0 && (
//               <img
//                 src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
//                 className="w-full h-auto aspect-w-16 aspect-h-9 object-cover rounded-xl bg-blue-50"
//                 alt={`Image ${index + 1}`}
//               />
//             )}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

const StaggeredList = ({ handleSelectedTopicItem }) => {
  const [items] = useState([
    { id: 1, text: "Digital Marketing", icon: <FaDigitalTachograph /> },
    { id: 2, text: "Graphic Design", icon: <FaPaintBrush /> },
    { id: 3, text: "Content Writing", icon: <FaPenNib /> },
    { id: 4, text: "Mobile App Development", icon: <FaMobileAlt /> },
    { id: 5, text: "Data Analysis", icon: <FaChartBar /> },
    { id: 6, text: "UI/UX Design", icon: <FaUser /> },
    { id: 7, text: "Photography", icon: <FaCamera /> },
    { id: 8, text: "Front-end Web Development", icon: <FaCode /> },
    { id: 9, text: "Video Editing", icon: <FaVideo /> },
    { id: 10, text: "Cybersecurity", icon: <FaShieldAlt /> },
  ]);

  return (
    <div className="grid grid-cols-2 base:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelectedTopicItem(item.text)}
          className="flex items-center text-primary  bg-tertiary border-secondary_accent p-2 hover:shadow-md rounded-xl border cursor-pointer overflow-hidden"
        >
          <div className="text-lg mr-2">{item.icon}</div>
          <h2 className="text-xs">{item.text}</h2>
        </div>
      ))}
    </div>
  );
};
