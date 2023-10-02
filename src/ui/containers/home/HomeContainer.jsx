import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import HomeInitialContainer from "./HomeInitialContainer";
import HighList from "../../components/HighList";
import HomeSearchContainer from "./HomeSearchContainer";

export default function HomeContainer() {
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [currentContainer, setCurrentContainer] = useState(null);
  const [selectTopicItem, setSelectedTopicItem] = useState("");

  function handleSelectedTopicItem(text) {
    setSelectedTopicItem(text);
  }

  function handleSearchWord(input) {
    setSearchQueryInput(input);
  }

  useEffect(() => {
    if (searchQueryInput === "") {
      setCurrentContainer(
        <HomeInitialContainer
          handleSelectedTopicItem={handleSelectedTopicItem}
        />
      );
    } else {
      setCurrentContainer(<HomeSearchContainer queryWord={searchQueryInput} />);
    }
  }, [searchQueryInput]);

  return (
    <>
      <div className="relative flex-1  py-0 h-fit h-screen">
        <div
          //style={{ width: "calc(100% - 24rem)" }}
          className=" h-auto w-full lg:w-[calc(100%-24rem)] min-h-screen border-r border-secondary_accent"
        >
          <div className="flex justify-center bg-secondary bg-opacity-90 backdrop-blur top-0 p-4 border-y border-secondary_accent z-10">
            <SearchBar
              searchInput={searchQueryInput}
              searchInputTopic={selectTopicItem}
              setSearchInput={handleSearchWord}
              placeholder="Search..."
              handleSelectedTopicItem={handleSelectedTopicItem}
            />
          </div>
          {currentContainer}
        </div>
      </div>

      <div className="w-0 invisible lg:visible  lg:w-[24rem] py-8 px-8  right-0 top-0 lg:absolute">
        <HighList />
      </div>
    </>
  );
}
