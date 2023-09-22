import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import TopBar from '../components/TopBarWhite';
import { MdAdd, MdImage, MdOutlineCode, MdTextFields } from 'react-icons/md'
import MenuDropdown from '../components/MenuDropDown';

export const AddBlogPage = ({ jsonData, setJsonData }) => {
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
        // alert(newItem.content[0].text)
        // try {
        //     const response = await axios.post(API_URL + '/contents/addPost', newItem)
        //     console.log(response.data);
        //     setFormData({
        //         _id: '',
        //         itemId: '',
        //         title: '',
        //         subtitle: '',
        //         category: '',
        //         image: '',
        //         date: '',
        //         likes: 0,
        //         content: [],
        //     });
        //     setCurrentContent({
        //         type: 'text',
        //         text: '',
        //         src: '',
        //         alt: '',
        //         language: '',
        //         code: '',
        //     });
        //     alert(response.data.error)
        // } catch (error) {
        //     console.error(error);
        //     alert(error.message)
        // }
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

    useEffect(() => {
        if (formData.title !== "" || formData.title !== null) {
            document.title = formData.title
        } else {
            document.title = "Create new post"
        }
    }, [formData.title])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    //const [currentContentType, setCurrentContentType] = useState('text');
    function handleAddClickAddCode() {
        const newContentSection = { ...currentContent };
        setFormData({
            ...formData,
            content: [...formData.content, newContentSection],
        });
        setCurrentContent({
            type: 'code',
            text: '',
            src: '',
            alt: '',
            language: '',
            code: '',
        });
    }

    function handleAddClickAddText() {
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
    }

    const handleKeyDown = (e) => {
        //alert(e.key)
        if (e.key === 'Backspace') {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const line = range.startContainer.parentElement;

            if (line.textContent.trim() === '') {
                e.preventDefault();
                line.remove();
            }
            // if(currentContent.text.length===0 && currentContent.type==='text'){
            //     removeContentSection()
            // }
        }
    };


    const [isOpen, setIsOpen] = useState(false);
    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const inputFieldClass = "font-blogFont text-lg w-full px-4 py-2 border-b focus:outline-none focus:border-gray-500"

    return (
        <>
            <TopBar />
            <div className="h-20 w-full"></div>
            <div className="min-h-screen h-full flex justify-center">
                <div className="font-blogFont w-full max-w-4xl p-6 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className='flex items-center'>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder='Title'
                                className="w-full px-0 py-2 text-3xl font-semibold border-b focus:outline-none focus:border-gray-500"
                                required
                            />
                        </div>

                        {/* Dynamic Content Sections */}
                        {formData.content.map((section, index) => (
                            <>
                                <>
                                    {section.type === 'text' && section.text.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            <p
                                                onKeyDown={handleKeyDown}
                                                contentEditable={true}
                                                onDoubleClick={removeContentSection}
                                                className="text-gray-800 text-xl">{line}</p>

                                        </React.Fragment>
                                    ))}
                                    {section.type === 'image' && (
                                        <div>
                                            <img src={section.src} alt={section.alt} />
                                        </div>
                                    )}
                                    {section.type === 'code' && (
                                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                                            <code
                                                onKeyDown={handleKeyDown}
                                                contentEditable={true}
                                                onDragCapture={removeContentSection}
                                                className={`font-codeFont language-${section.language}`}>
                                                {section.code}
                                            </code>
                                        </pre>
                                    )}
                                </>
                                {/* <button
                                    type="button"
                                    onClick={() => removeContentSection(index)}
                                    className="text-red-600 hover:text-red-800 font-bold mt-2"
                                >
                                    Remove Section
                                </button> */}
                            </>
                        ))}
                        {/* Content Type */}

                        {/* Content Input Fields */}
                        {currentContent.type === 'text' && (
                            <>

                                <textarea
                                    name="text"
                                    value={currentContent.text}
                                    onChange={handleChange2}
                                    onKeyDown={handleKeyDown}
                                    contentEditable={true}
                                    placeholder='write here...'
                                    onInput={(e) => { e.target.style.height = ""; e.target.style.height = e.target.scrollHeight + "px" }}
                                    className={inputFieldClass + "w-full px-0 py-2 text-xl focus:outline-none focus:border-gray-100"+"resize-none"}
                                />
                            </>
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
                                    className="w-full lext-sm px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        )}
                        {currentContent.type === 'code' && (
                            <div className='bg-gray-100 p-4 rounded-lg'>
                                {/* <label className="font-google2 text-gray-700 text-sm font-bold block mb-2">
                                    Language:
                                </label>
                                <input
                                    type="text"
                                    name="language"
                                    value={currentContent.language}
                                    onChange={handleChange2}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                /> */}

                                <textarea
                                    name="code"
                                    value={currentContent.code}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleChange2}
                                    onInput={(e) => { e.target.style.height = ""; e.target.style.height = e.target.scrollHeight + "px" }}
                                    className="font-codeFont resize-none w-full px-4 py-2 bg-transparent text-lg focus:outline-none focus:border-blue-500"
                                />
                                {/* <pre className=" overflow-x-auto">
                                    <code
                            
                                        onKeyDown={handleKeyDown}
                                        contentEditable={true}
                                        onDragCapture={removeContentSection}
                                        className=''>
                                        #
                                    </code>
                                </pre> */}
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

            <div className="fixed bottom-8 right-8">
                {isOpen && (
                    <div className="absolute p-2 w-full bottom-12 right-2">
                        {/* Add your options here */}
                        <button
                            onClick={handleAddClickAddText}
                            className={`bg-gray-200 mt-2 text-black rounded-full w-12 h-12 flex items-center justify-center transition-transform transform`}>
                            <MdTextFields className='text-xl' />
                        </button>
                        <button
                            onClick={handleAddClickAddCode}
                            className={`bg-gray-200 mt-2 text-black rounded-full w-12 h-12 flex items-center justify-center transition-transform transform`}>
                            <MdOutlineCode className='text-xl' />
                        </button>
                        <button className={`bg-gray-200 mt-2 text-black rounded-full w-12 h-12 flex items-center justify-center transition-transform transform`}>
                            <MdImage className='text-xl' />
                        </button>

                    </div>
                )}
                <button
                    className={`bg-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center transition-transform transform ${isOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                    onClick={toggleOptions}
                >
                    <MdAdd className='text-xl' />
                </button>
            </div>

        </>
    );
};



// const CircularButton = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleOptions = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className="fixed bottom-8 right-8">
//             {isOpen && (
//                 <div className="absolute bg-white p-2 w-full bottom-12 right-2">
//                     {/* Add your options here */}
//                     <button className={`bg-gray-200 mt-2 text-black rounded-full w-12 h-12 flex items-center justify-center transition-transform transform`}>
//                         <MdOutlineCode className='text-xl' />
//                     </button>
//                     <button className={`bg-gray-200 mt-2 text-black rounded-full w-12 h-12 flex items-center justify-center transition-transform transform`}>
//                         <MdImage className='text-xl' />
//                     </button>
//                 </div>
//             )}
//             <button
//                 className={`bg-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center transition-transform transform ${isOpen ? 'rotate-45' : 'rotate-0'
//                     }`}
//                 onClick={toggleOptions}
//             >
//                 <MdAdd className='text-xl' />
//             </button>
//         </div>
//     );
// };