import React from 'react'
import { RiArrowRightUpFill } from 'react-icons/ri';

export default function HighList() {
  return (
    <div className="h-[calc(100vh-12rem)] py-4 text-primary">
    <div className="bg-tertiary rounded-xl">
      <p className="flex items-center text-xl text-primary text-star p-6">
        What's on <span className="font-bold">&nbsp;Top</span>{" "}
        <RiArrowRightUpFill className="text-3xl" />
      </p>
      <div className="overflow-hidden rounded-b-xl">
        <div className="max-h-[calc(100vh-12rem-4rem)] overflow-y-auto">
          {trendData.map((item, index) => (
            <div
              key={index}
              className="block items-center pl-6 pr-24 py-4 hover:bg-primary_hover font-semibold text-sm cursor-pointer"
            >
              <p className="text-gray-500">{item.category}</p>
              <p className="px-0">#{item.name}</p>
              <p className="font-normal text-primary_accent text-sm">
                {item.totalImpressions / 1000}k impressions
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

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
  
