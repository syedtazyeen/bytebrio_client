import React, { useEffect, useState } from "react";
import { RiArrowRightUpFill } from "react-icons/ri";
import SearchLogsListContainer from "../lists/SearchLogsListContainer";
import SearchBytesListContainer from '../lists/SearchBytesListContainer'

export default function HomeSearchContainer({queryWord}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabContainer, setSelectedTabContainer] = useState();

  function handleSelectTab(index) {
    setSelectedTab(index);
    
  }


  useEffect(()=>{
    switch (selectedTab) {
      case 0:
        setSelectedTabContainer(<SearchBytesListContainer queryWord={queryWord}/>);
        break;
      case 1:
        setSelectedTabContainer(<SearchLogsListContainer queryWord={queryWord}/>);
        break;
      case 2:
        setSelectedTabContainer(<></>);
        break;
    }
  },[selectedTab,queryWord])

  return (
    <div className="relative">
      <div className="font-bold border-b border-secondary_accent flex sticky justify-evenly top-0 backdrop-blur bg-secondary bg-opacity-90">
        {/* <TabButton
          name="Skills"
          index={0}
          selectedTab={selectedTab}
          setSelectedTab={handleSelectTab}
        /> */}
        <TabButton
          name="Bytes"
          index={0}
          selectedTab={selectedTab}
          setSelectedTab={handleSelectTab}
        />
        <TabButton
          name="Logs"
          index={1}
          selectedTab={selectedTab}
          setSelectedTab={handleSelectTab}
        />
        <TabButton
          name="People"
          index={2}
          selectedTab={selectedTab}
          setSelectedTab={handleSelectTab}
        />
      </div>
      {selectedTabContainer}
    </div>
  );
}

function TabButton({ name, index, setSelectedTab, selectedTab }) {
  return (
    <div
      onClick={(e) => setSelectedTab(index)}
      className="w-full hover:bg-primary_hover cursor-pointer flex justify-center"
    >
      <button
        className={`py-4  w-fit relative ${
          selectedTab === index ? "text-primary" : "text-primary_accent"
        }`}
      >
        {name}
        {selectedTab === index && (
          <div className="bg-primary rounded-full h-1 w-full absolute bottom-0"></div>
        )}
      </button>
    </div>
  );
}
