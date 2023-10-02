import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";

export default function SearchBar({ placeholder,searchInputTopic,setSearchInput,handleSelectedTopicItem }) {
  const [searchInput, setSearchInputWord] = useState("");
  const [clearButtonVisible, setClearButtonVisible] = useState(false);

  function clearInput() {
    setSearchInputWord("");
    handleSelectedTopicItem("")
  }

  useEffect(() => {
    if (searchInput === "") {
      setClearButtonVisible(true);
    } else {
      setClearButtonVisible(false);
    }
    if(searchInputTopic!==""){
      setSearchInputWord(`${searchInputTopic}`) 
    }
    setSearchInput(searchInput)
  }, [searchInput,searchInputTopic]);

  return (
    <div className="bg-tertiary text-primary w-2/3 px-4 py-1 rounded-full flex items-center border-[0.5px] border-secondary_accent">
      <RiSearch2Line className="text-primary_accent text-2xl mr-1" />
      <input
        type="text"
        className="outline-none bg-transparent p-2 w-full text-md"
        placeholder={placeholder}
        onInput={(e) => setSearchInputWord(e.target.value)}
        value={searchInput}
      />
      {!clearButtonVisible ? (
        <IoClose
          onClick={clearInput}
          className="text-primary_accent text-xl cursor-pointer hover:text-primary"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
