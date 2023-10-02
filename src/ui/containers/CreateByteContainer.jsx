import React, { useState } from "react";
import { BiSend, BiSolidSend } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { postByteAsync } from "../../app/redux/bytes/byteSlice";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import Loading from "../components/Loading";

export default function CreateByteContainer({ onClose }) {
  const [textareaValue, setTextareaValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handlePostBtn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const byteObject = {
      text: textareaValue,
      imageUrl: imageUrl,
    };
    try {
      const resultAction = await dispatch(postByteAsync({ byteObject, token }));
      if (postByteAsync.fulfilled.match(resultAction)) {
        nav("/");
      } else if (postByteAsync.rejected.match(resultAction)) {
        //setErrMsg("Failed: " + resultAction.error.message);
      }
    } catch (err) {
      console.error("Error:", err);
      //setErrMsg("An error occurred while posting.");
    } finally {
      onClose()
      setLoading(false);
    }
  };

  return (
    <>
      { loading ?
        <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 bg-secondary bg-opacity-60 backdrop-blur z-50">
          <Loading />
        </div> :<></>
      }
      <div className="px-6 pb-0 mt-2 max-h-[80vh] h-auto text-primary overflow-hidden">
        <textarea
          placeholder="Write here.."
          className="bg-transparent p-2 outline-none text-xl w-full resize-none"
          style={{ height: "auto" }}
          value={textareaValue}
          onChange={handleTextareaChange}
        />
        <div className="flex justify-between items-center sticky bottom-0 border-t pt-6 bg-tertiary">
          <div className="hover:bg-primary_hover rounded-full p-2">
          <IoImageOutline className="text-2xl cursor-pointer " />
          </div>
          <button
            onClick={handlePostBtn}
            className="bg-primary hover:bg-primary_accent text-secondary font-bold px-4 py-2 rounded-xl"
          >
            <BiSolidSend className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
}
