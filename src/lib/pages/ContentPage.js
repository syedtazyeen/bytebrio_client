import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollHeader from '../components/ScrollHeader';
import Header from '../components/TopBar';
import { API_URL } from '../../constants';

const ContentPage = () => {
  const link = useParams(); // Get the itemId from the URL
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `${API_URL}/contents/item/${link.itemId}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  // useEffect(() => {
  //   // Replace with the URL of your JSON data
  //   const apiUrl = "http://api.bytebrio.online"; // Replace with the actual URL
  //   setIsLoading(false);
  //   try {
  //     fetch(apiUrl + `/contents/${link.itemId}`)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //       })
  //       .then((jsonData) => {
  //         setData(jsonData);
  //       })

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);




  function formatDate(milliseconds) {
    var date = parseInt(milliseconds);
    var d = new Date(date);
    var ds = d.toLocaleString("default", { month: "long", day: "numeric", year: "numeric" });
    return ds;
  }

  function header(title){
    document.title = title
    return title
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-12 border-b-4 border-gray-800"></div>
        </div>
      ) : (
        <>

          {
          data.length != 0 ? (
            <>
              <div className="bg-gray-100">
                <Header />
              </div>
              <div className="max-w-3xl mx-auto px-4 py-8 my-24">
                {data.map((item) =>
                    (
                      <div key={item._id} className="bg-white rounded-lg p-8 mb-8">
                        <h1 className="text-4xl font-bold mb-4">{header(item.title)}</h1>
                        <div className="flex justify-between mb-8">
                          <p className="text-gray-600 text-sm"> {formatDate(item.date)}</p>
                          <p className="text-gray-600 text-sm">👍🏻 {item.likes}</p>
                        </div>
                        <img src={item.image} alt={item.title} className="w-full mb-8 rounded-lg" />

                        {item.content.map((block, index) => (
                          <div key={index} className="mb-6">
                            { 
                            block.type === 'text' && block.text.split('\n').map((line, index) => (
                              <React.Fragment key={index}>
                                <p className="text-gray-800">{line}</p>
                                <br /> {/* Add a <br /> element for each newline */}
                              </React.Fragment>
                            ))}
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
          ) : (
            <Navigate to="/notfound" />
          )}

        </>
      )}

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