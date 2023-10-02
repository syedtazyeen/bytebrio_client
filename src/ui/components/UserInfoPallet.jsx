import React from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'

export default function UserInfoPallet({profile_image,name,isGreenTick}) {
  return (
    <div className="flex items-center mb-2">
    <div className="rounded-full bg-gray-200 overflow-hidden">
      <img
        src={
          profile_image === "" ||
          profile_image === null
            ? "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
            : profile_image
        }
        className="w-6 h-6 object-cover"
      />
    </div>
    <h2 className="font-semibold text-sm ml-2">{name || "name"}</h2>
    {isGreenTick === true ? (
      <BsPatchCheckFill className="ml-1 text-app" />
    ) : (
      <></>
    )}
  </div>
  )
}
