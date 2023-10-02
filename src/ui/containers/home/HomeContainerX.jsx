import { RiArrowRightUpFill } from "react-icons/ri";
// import LatestByteListContainer from "../list-containers/LatestBytesListContainer";
import SearchBar from "../../components/SearchBar";
import React, { useEffect, useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { Link } from "react-router-dom";
// import SearchByteListContainer from "../list-containers/SearchByteListContainer";
// import SearchPeopleContainer from "../list-containers/SearchPeopleContainer";
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
import { BsPatchCheckFill } from "react-icons/bs";
// import UserInfoPallet from "../../components/UserInfoPallet";

const lorem140 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, harum provident in pariatur ratione dolores dolore deleniti veniam neque fuga aut illum assumenda eum distinctio, architecto voluptatem recusandae placeat aliquam hic laudantium error, reiciendis odio incidunt sequi! Numquam distinctio laudantium magni minima possimus tempora ipsam harum est reiciendis delectus sint officia provident necessitatibus, voluptatem recusandae accusantium? Dolorem, quia labore expedita neque rerum voluptas nulla laboriosam quisquam rem, velit odio. Illum quasi non, facilis dolores, ratione sit debitis vel molestias voluptatem ipsa ducimus quaerat amet natus, inventore ex eligendi officiis distinctio praesentium repellat tenetur neque quos! Voluptatibus ipsa sint dicta voluptatum unde vel deserunt culpa laboriosam doloremque eveniet? Animi praesentium, nulla aut veniam quisquam error ullam laborum, iusto atque, illo dolorum quae! Sint, alias, veniam quisquam labore vero magni officiis vel unde similique ex quia eaque totam est, molestias suscipit error?";

export default function HomeContainer({ isNavWide, userId }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [searchPlaceHolder, setSearchPlaceholder] = useState("");
  const [searchType, setSearchType] = useState("Skills");
  const [currentContainer, setCurrentContainer] = useState(
    <HomeInitialContainer />
  );

  const options = [
    { label: "Bytes", placeholder: "Search Bytes ..." },
    { label: "Skills", placeholder: "Browse Skills..." },
    { label: "People", placeholder: "Find People..." },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSearchQueryInput = (inputText) => {
    setSearchQueryInput(inputText);
  };

  useEffect(() => {
    document.title = "Home @ B";
  }, [currentContainer]);

  useEffect(() => {
    const selected = options[selectedOption];
    setSearchPlaceholder(selected.placeholder);
    switch (selectedOption) {
      case 0:
        setSearchType("Skills");
        break;
      case 2:
        setSearchType("People");
        break;
      default:
        setSearchType("Skills");
    }
  }, [selectedOption]);

  useEffect(() => {
    if (searchQueryInput === "") {
      //setCurrentContainer(<HomeInitialContainer />);
    } else if (searchType === "People") {
      setCurrentContainer();
      //<SearchPeopleContainer queryWord={searchQueryInput} />
    } else {
      setCurrentContainer();
      //<SearchByteListContainer queryWord={searchQueryInput} />
    }
  }, [searchQueryInput, searchType, selectedOption]);

  const renderButton = (index, label) => (
    <button
      key={index}
      className={`${
        selectedOption === index
          ? "rounded-full text-white app-bg-1 transition-transform duration-50"
          : "border-transparent text-gray-500"
      } flex-grow px-4 md:py-1 `}
      onClick={() => handleOptionClick(index)}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full">
      <div className=" flex-1  py-20 h-fit h-screen">
        <div
          style={{ width: "calc(100% - 25rem)" }}
          className=" h-fit w-full "
        >

        </div>
      </div>

      <div className="w-[25rem] pt-24 px-8 border-l right-0 top-0 ">
        hhjh
      </div>
    </div>
  );
}

function HomeInitialContainer() {
  const textRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const userInfo = null;

  return (
    <>
      <div className="p-8">
        <p className="text-2xl flex justify-center w-full mb-8">
          Search by&nbsp;
          <span className="font-semibold font-type1"> Topic</span>
          <RiArrowRightUpFill className="text-3xl" />
        </p>
        <StaggeredList />
      </div>

      <div className="border-y">
        <p className="text-xl text-orange-500 flex p-8 border-b  app-border-gray-1">
          Picked&nbsp;
          <span className="font-semibold font-type1">Bytes</span>
          <RiArrowRightUpFill className="text-2xl" />
        </p>

        {/* <div className="px-[4rem] py-8 hover:bg-gray-50 cursor-pointer">
          <UserInfoPallet name="name" profile_image="dc" isGreenTick={true} />
          <p className="line-clamp-3 overflow-hidden  my-4" ref={textRef}>
            {lorem140}
          </p>
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            className="w-full h-auto aspect-w-16 aspect-h-9 object-cover  rounded-xl bg-blue-50"
          />
        </div> */}
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="px-[4rem] py-8 hover:bg-gray-50 cursor-pointer"
          >
            {/* <UserInfoPallet
              name={`name${index + 1}`}
              profile_image="dc"
              isGreenTick={true}
            /> */}
            <p className="line-clamp-3 overflow-hidden my-4" ref={textRef}>
              {lorem140}
            </p>
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              className="w-full h-auto aspect-w-16 aspect-h-9 object-cover rounded-xl bg-blue-50"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-16 border-y">
        <p className="text-xl text-[#cca516] flex p-8 border-b app-border-gray-1">
          Golden&nbsp;
          <span className="font-semibold font-type1"> Logs</span>
          <RiArrowRightUpFill className="text-2xl" />
        </p>
        {/* <LatestByteListContainer /> */}
      </div>
    </>
  );
}

const StaggeredList = () => {
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
          className="flex items-center text-black  bg-gray-50 p-2 hover:shadow-md rounded-xl border cursor-pointer overflow-hidden"
        >
          <div className="text-lg mr-2">{item.icon}</div>
          <h2 className="text-xs">{item.text}</h2>
        </div>
      ))}
    </div>
  );
};

const trendData = [
  {
    name: "Artificial Intelligence",
    totalImpressions: 21500,
    category: "Technology",
  },
  {
    name: "Blockchain Technology",
    totalImpressions: 18900,
    category: "Technology",
  },
  {
    name: "Space Exploration",
    totalImpressions: 24700,
    category: "Science",
  },
  {
    name: "Renewable Energy",
    totalImpressions: 19850,
    category: "Environment",
  },
  {
    name: "Cryptocurrency",
    totalImpressions: 31500,
    category: "Finance",
  },
  {
    name: "Virtual Reality",
    totalImpressions: 17200,
    category: "Entertainment",
  },
  {
    name: "Sustainable Fashion",
    totalImpressions: 12500,
    category: "Fashion",
  },
  {
    name: "Mental Health Awareness",
    totalImpressions: 9200,
    category: "Health",
  },
  {
    name: "Wildlife Conservation",
    totalImpressions: 17521,
    category: "Environment",
  },
  {
    name: "Culinary Trends",
    totalImpressions: 14200,
    category: "Food",
  },
];
