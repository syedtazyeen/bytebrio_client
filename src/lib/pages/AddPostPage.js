import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import TopBar from '../components/TopBarWhite';
import { MdAdd } from 'react-icons/md'

const AddPostPage = ({ jsonData, setJsonData }) => {
  const [formData, setFormData] = useState({
    itemId: '',
    title: '',
    subtitle: '',
    image: '',
    date: '',
    likes: 0,
    content: [],
  });

  const [currentContent, setCurrentContent] = useState({
    type: 'text',
    text: '',
    src: '',
    alt: '',
    language: '',
    code: '',
  });

  const bloggingCategories = [
    "Others",
    "Travel",
    "Health and Wellness",
    // ... (other categories)
    "Personal Development"
  ];

  const addContentSection = () => {
    const newContentSection = { ...currentContent };
    setFormData({
      ...formData,
      content: [...formData.content, newContentSection],
    });
    setCurrentContent({
      type: 'text',
      text: '',
      src: '',
      alt: '',
      language: '',
      code: '',
    });
  };

  const removeContentSection = (index) => {
    const updatedContent = [...formData.content];
    updatedContent.splice(index, 1);
    setFormData({
      ...formData,
      content: updatedContent,
    });
  };

  function generateRandom6DigitNumber() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      itemId: generateRandom6DigitNumber() + "-" + formData.title.replace(/ /g, '%'),
      date: Date.now().toString(),
    };
    const apiUrl = "http://localhost:1000";
    try {
      const response = await axios.post(API_URL + '/contents/addPost', newItem)
      console.log(response.data);
      setFormData({
        _id: '',
        itemId: '',
        title: '',
        subtitle: '',
        category: '',
        image: '',
        date: '',
        likes: 0,
        content: [],
      });
      setCurrentContent({
        type: 'text',
        text: '',
        src: '',
        alt: '',
        language: '',
        code: '',
      });
      alert(response.data.error)
    } catch (error) {
      console.error(error);
      alert(error.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setCurrentContent({
        type: value,
        text: '',
        src: '',
        alt: '',
        language: '',
        code: '',
      });
    } else {
      setCurrentContent({ ...currentContent, [name]: value });
    }
  };

  useState(() => {
    document.title = "Add Post"
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[])

  function handleAddClick() {

  }

  const inputFieldClass = "w-full px-4 py-2 border-b focus:outline-none focus:border-gray-500"

  return (
    <>
      <TopBar />
      <div className="h-20 w-full "></div>
      <div className="min-h-screen h-full flex items-center justify-center">
        <div className="w-full max-w-3xl p-6 bg-white">
          <h1 className="text-3xl text-center font-google2 font-semibold mb-6">Add New Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 text-xl font-semibold border-b focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div>
              <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                Subtitle:
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div>
              {formData.image != "" ?
                (<div className='overflow-hidden aspect-w-2 aspect-h-1 '>
                  <img src={formData.image} alt="cover image" className="mb-4 w-full h-96 text-center bg-gray-100" />
                </div>) : (<></>)}
              <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                Cover Image URL:
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b focus:outline-none focus:border-gray-500"
              />
            </div>
            {/* <div>
              <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b focus:outline-none focus:border-gray-500"
              >
                {bloggingCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div> */}
            {/* Dynamic Content Sections */}
            {formData.content.map((section, index) => (
              <div key={index} className="p-4 bg-white border border-gray-300 rounded">
                <div className="overflow-y-auto">
                  {section.type === 'text' && (
                    <div>
                      {section.type === 'text' && section.text.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          <p className="text-gray-800">{line}</p>
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  {section.type === 'image' && (
                    <div>
                      <img src={section.src} alt={section.alt} />
                    </div>
                  )}
                  {section.type === 'code' && (
                   <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                   <code className={`language-${section.language}`}>
                     {section.code}
                   </code>
                 </pre>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeContentSection(index)}
                  className="text-red-600 hover:text-red-800 font-bold mt-2"
                >
                  Remove Section
                </button>
              </div>
            ))}
            {/* Content Type */}
            <div className="flex space-x-4">
              {/* <button
                onClick={handleAddClick}
                className="flex items-center bg-emerald-400 cursor-pointer text-white px-4 text-2xl rounded-3xl">
               
                <text className='text-lg ml-0'>Add</text>
              </button> */}
              <div className="flex justify-between w-full items-center rounded-xl p-4 my-12 bg-gray-100">
                <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                  Content Type:
                </label>
                <select
                  name="type"
                  value={currentContent.type}
                  onChange={handleChange2}
                  className="w-1/2 px-4 py-2 bg-transparent border-b focus:outline-none focus:border-gray-500"
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="code">Code</option>
                </select>
                <button
                type="button"
                onClick={addContentSection}
                className="h-fit place-self-center bg-emerald-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition duration-300"
              >
                Add
              </button>
              </div>
              
            </div>
            {/* Content Input Fields */}
            {currentContent.type === 'text' && (
              <div>
                <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                  Text Content:
                </label>
                <textarea
                  name="text"
                  value={currentContent.text}
                  onChange={handleChange2}
                  onInput={(e) => { e.target.style.height = ""; e.target.style.height = e.target.scrollHeight + "px" }}
                  className={inputFieldClass + "resize-none px-4 py-2  focus:outline-none focus:border-gray-500 p-0"}
                //"resize-none w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
            {currentContent.type === 'image' && (
              <div>
                <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                  Image Source:
                </label>
                <input
                  type="text"
                  name="src"
                  value={currentContent.src}
                  onChange={handleChange2}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
                <label className="font-google2 text-gray-700 text-sm font-bold block mt-2 mb-2">
                  Alt Text:
                </label>
                <input
                  type="text"
                  name="alt"
                  value={currentContent.alt}
                  onChange={handleChange2}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
            {currentContent.type === 'code' && (
              <div>
                <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                  Language:
                </label>
                <input
                  type="text"
                  name="language"
                  value={currentContent.language}
                  onChange={handleChange2}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
                <label className="font-google2 text-gray-700 text-sm font-bold block mt-2 mb-2">
                  Code:
                </label>
                <textarea
                  name="code"
                  value={currentContent.code}
                  onChange={handleChange2}
                  className="resize-none w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
            <div className='w-full justify-center flex'>
              <button
                type="submit"
                className="bg-emerald-500 text-white px-4 py-2 rounded-2xl hover:bg-emerald-600 transition duration-300"
              >
                Upload Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        onClick={handleAddClick}
        className="bg-emerald-400 cursor-pointer fixed z-100 bottom-10 right-16 text-white p-3 text-2xl rounded-3xl">
        <MdAdd />
      </button>

    </>
  );
};

export default AddPostPage;


const DialogBox = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-xl font-semibold mb-4">{children}</div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  ) : null;
};
