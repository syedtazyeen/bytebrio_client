import React from 'react'
import {TbUserSquareRounded} from 'react-icons/tb'

export default function SignupDialog({onClick}) {
  return (
    <div className='flex justify-center absolute bottom-0 w-full p-0  bg-secondary_accent bg-opacity-50 backdrop-blur shadow-xl rounded-t-xl'>
    <div className='flex w-fit justify-center text-center font-extrabold items-center  p-2 '>
      <p className='text-primary'>Join the community now!</p>
      <button
        onClick={onClick}
        className="flex items-center bg-primary mx-auto px-8 py-3 ml-4 rounded-2xl text-secondary text-sm font-bold">
        <TbUserSquareRounded className="mr-1 text-xl" />
        Sign up
      </button>

    </div>
  </div>
  )
}
