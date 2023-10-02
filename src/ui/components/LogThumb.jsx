import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiUpvote } from "react-icons/bi";
import { formatDate } from "../../utils/helper";

export default function LogThumb(props) {
  const { postId, image, title, subtitle, timeStamp, likes, userData } = props;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userData  !== undefined) {
      setUserInfo(userData);
    } else {
      setUserInfo(null);
    }
  }, [userData]);

  return (
    <Link to={`/bytes/${postId}`} className="cursor-pointer ">
      <div className="my-0 py-8 px-8 flex  text-primary items-center border-b border-secondary_accent hover:bg-primary_hover font-google overflow-hidden">
        <div className="w-full p-0 mr-2">
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-gray-200 overflow-hidden">
              <img
                src={
                  userInfo?.profile_image === "" ||
                  userInfo?.profile_image === null
                    ? "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                    : userInfo?.profile_image
                }
                className="w-6 h-6 object-cover bg-transparent"
              />
            </div>
            <h2 className="font-semibold text-sm ml-2">{userInfo?.name}</h2>
            {userInfo?.isGreenTick === true ? (
              <BsPatchCheckFill className="ml-1 text-app" />
            ) : (
              <></>
            )}
          </div>
          <h2 className="text-base font-bold text-primary line-clamp-2">
            {title}
          </h2>
          <p className="text-sm text-primary_accent  mb-4 line-clamp-3">{subtitle}</p>
          <div className="flex items-center text-primary_accent  text-sm">
            <span className="font-bold"></span>
            <span>{formatDate(timeStamp)}</span>
            <span className="mx-2">·</span>
            <span className="flex items-center">
              <BiUpvote className="mx-1" />
              {likes===undefined ? 0 : likes}
            </span>
          </div>
        </div>

        <div className="aspect-w-2 aspect-h-1 w-56 h-24 overflow-hidden rounded-lg">
          <img
            src={image}
            alt=""
            className="object-cover w-full h-full bg-gray-100"
          />
        </div>
      </div>
    </Link>
  );
}
