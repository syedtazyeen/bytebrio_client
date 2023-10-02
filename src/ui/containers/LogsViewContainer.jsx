import React, { useEffect, useState } from "react";
import { API_URL } from "../../Constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsDot, BsPatchCheckFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { RiArrowRightUpFill } from "react-icons/ri";
import Loading from "../components/Loading";
import HighList from "../components/HighList";
import { BiArrowBack } from "react-icons/bi";

export default function LogsViewContainer() {
  const link = useParams();
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [upVote, setUpvote] = useState(0);
  const [title, setTitle] = useState("ByteBrio");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL + "/blogs/" + link.postId);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const jsonData = await response.json();
        if (jsonData && jsonData.length > 0) {
          setData(jsonData);
          setUserId(jsonData[0].userId);
          setUpvote(jsonData[0]?.likes);
          setTitle(jsonData[0]?.data.title);
        } else {
          // Handle the case when jsonData is null or empty array
          console.error("No data found for the given postId");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(API_URL + "/people/" + userId);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const jsonData = await response.json();
        setUserData(jsonData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId !== null) {
      fetchUserData();
      document.title = data[0]?.data.title;
    }
  }, [userId]);

  const nav = useNavigate();
  function handleLogoClick() {
    nav("/");
  }

  function handleUserClick() {
    nav("/people/" + userId);
  }

  function handleUpvoteClick() {
    setUpvote(upVote + 1);
  }

  return (
    <div className="relative flex h-screen w-full overflow-y-auto overscroll-none scrollbar-hide">
      {/* {
        isLoading ?
          <div className='fixed flex justify-center items-center  w-full h-screen inset-0  z-50 bg-white opacity-90'>
            <Loading/>
          </div>
          : <></>
      } */}

      <div className="relative flex-1 h-fit text-primary">
        <div
          style={{ width: "calc(100% - 24rem)" }}
          className="sticky top-0 bg-secondary bg-opacity-70 backdrop-blur border-secondary_accent border-r flex items-center font-bold absolute border-b text-lg py-5 px-4"
        >
          <Link to="/" className="hover:bg-primary_hover rounded-full mr-4 p-2">
            <BiArrowBack className="text-xl cursor-pointer" />
          </Link>
          <p className="text-lg">Logs</p>
        </div>
        <div
          style={{ width: "calc(100% - 24rem)" }}
          className="overflow-y-auto border-r border-secondary_accent h-fit bg-secondary w-full px-4 py-24"
        >
          {data !== null ? (
            <>
              <img
                className="mb-8 h-96 w-full object-cover"
                src={data[0]?.data.coverImageUrl}
              />

              <div className=" flex items-center justify-between border-y p-4 border-secondary_accent">
                {userData !== null ? (
                  <div className="cursor-pointer" onClick={handleUserClick}>
                    <div className="flex items-center">
                      <div className="rounded-full bg-secondary_accent overflow-hidden mr-2">
                        <img
                          src={
                            userData[0].profile_image === "" ||
                            userData[0].profile_image === null
                              ? "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                              : userData[0].profile_image
                          }
                          className="w-8 h-8 object-cover"
                        />
                      </div>
                      <p>{userData[0].name}</p>
                      {userData[0].isGreenTick === true ? (
                        <BsPatchCheckFill className="ml-1 text-app" />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <>name</>
                )}

                <div className="flex items-center text-primary_accent">
                  <p className="text-sm py-4">
                    {formatDate(data[0].timeStamp)}
                  </p>

                  <div className="mx-4 h-8 w-[1px] bg-secondary"></div>

                  <span className="flex items-center my-0 w-fit">
                    <AiOutlineLike className="mx-1" />
                    {upVote}
                  </span>

                  <div className="mx-4 h-8 w-[1px] bg-secondary_accent"></div>

                  <PiShareFat className="text-lg" />

                  <div className="mx-4 h-8 w-[1px] bg-secondary_accent"></div>

                  <button
                    onClick={handleUpvoteClick}
                    className="bg-emerald-0 border-[1px] border-secondary_accent hover:bg-priamry_hover rounded-full text-primary_accent hover:text-primary text-xs font-semibold p-2"
                  >
                    Upvote
                  </button>
                </div>
              </div>

              <BlockRenderer blocks={data[0]?.data.content.blocks} />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-[24rem] p-8 inset-y-0 right-0 top-0 absolute">
          <HighList />
        </div>
      </div>
      {/* <footer className='h-56 mt-24 bg-stone-50'></footer> */}
    </div>
  );
}

const BlockRenderer = ({ blocks }) => {
  return (
    <div className="font-type1 text-md">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading":
            return (
              <div key={block.id} className="my-[1em] text-3xl font-bold">
                <h1>{block.data.text}</h1>
              </div>
            );
          case "subHeading":
            return (
              <div key={block.id} className="my-[1em] text-xl font-semibold">
                <h1>{block.data.text}</h1>
              </div>
            );
          case "list":
            const list = block.data.items;
            var count = 1;
            return (
              <div key={block.id} className="my-[.5em] p-2">
                {block.data.style === "ordered"
                  ? list.map((i) => (
                      <div key={i} className="flex p-1">
                        <p className="flex text-right">{count++}.</p>
                        <p className="ml-2">{i}</p>
                      </div>
                    ))
                  : list.map((i) => (
                      <div key={i} className="flex items-center p-1">
                        <p className="flex text-right">
                          <BsDot />
                        </p>
                        <p className="ml-2">{i}</p>
                      </div>
                    ))}
              </div>
            );
          case "paragraph":
            const textWithFormatting = block.data.text
              .replace(/<b>(.*?)<\/b>/g, (_, content) => `<b>${content}</b>`) // Replace <b> tags with **
              .replace(/<i>(.*?)<\/i>/g, (_, content) => `<i>${content}</i>`); // Replace <i> tags with *

            return (
              <div key={block.id} className="my-[.5em]">
                <p dangerouslySetInnerHTML={{ __html: textWithFormatting }}></p>
              </div>
            );
          case "customCode":
            // Replace <br> with new lines
            const codeWithLineBreaks = block.data.text.replace(/<br>/g, "\n");

            return (
              <pre
                className="bg-secondary_accent rounded-lg border border-secondary_accent my-[2em] p-[1rem] overflow-x-auto overflow-hidden"
                key={block.id}
              >
                <code
                  dangerouslySetInnerHTML={{ __html: codeWithLineBreaks }}
                />
              </pre>
            );
          default:
            // Handle unknown block types here
            alert("nnnn");
            return null;
        }
      })}
    </div>
  );
};

function formatDate(milliseconds) {
  var date = parseInt(milliseconds);
  var d = new Date(date);
  var ds = d.toLocaleString("default", { month: "short", day: "numeric" });
  return ds;
}
