import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollHeader from '../components/ScrollHeader';

const ContentPage = () => {
    const link = useParams(); // Get the itemId from the URL
    const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with the URL of your JSON data
    const apiUrl = "http://api.bytebrio.online"; // Replace with the actual URL

    fetch(apiUrl + `/contents/${link.itemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <ScrollHeader />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 my-24">
        {data.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
            <div className="flex justify-between mb-8">
              <p className="text-gray-600 text-sm"> {item.date}</p>
              <p className="text-gray-600 text-sm">👍🏻 {item.likes}</p>
            </div>
            <img src={item.image} alt={item.title} className="w-full mb-8 rounded-lg" />

            {item.content.map((block, index) => (
              <div key={index} className="mb-6">
                {block.type === 'text' && <p className="text-gray-800">{block.text}</p>}
                {block.type === 'image' && (
                  <img src={block.src} alt={block.alt} className="w-full rounded-lg mb-4" />
                )}
                {block.type === 'code' && (
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{block.code}</code>
                  </pre>
                )}
                {/* Handle other block types (code, etc.) as needed */}
              </div>
            ))}

            <div className="my-8">
              <h2 className="text-2xl text-black font-semibold mb-4">comments</h2>
              {item.comments?.map((comment, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
                  <p className="text-gray-950 text-sm mt-2 font-semibold">{comment.author}</p>
                  <p className="text-gray-800 py-4">{comment.text}</p>
                  <p className="text-gray-600 text-sm mt-2 ">{comment.date}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default ContentPage;



const ContentBlock = ({ type, text, src, alt, code }) => {
    if (type === 'text') {
        return <p className="text-gray-800 text-base leading-relaxed mb-4">{text}</p>;
    }

    if (type === 'image') {
        return <img src={src} alt={alt} className="w-full rounded-lg" />;
    }

    if (type === 'code') {
        return (
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                {code}
            </pre>
        );
    }

    return null;
};