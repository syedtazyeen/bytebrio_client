import React, { useEffect, useState } from 'react'
import LeftNavContainer from '../containers/nav/LeftNavContainer'
import HomeContainer from '../containers/home/HomeContainer'
import { BiHomeAlt, BiMessageSquareAdd, BiMessageSquareDetail, BiSolidDashboard, BiSolidMessageSquareDetail } from 'react-icons/bi';
import { FiMessageCircle } from 'react-icons/fi';
import {LuLayoutDashboard} from 'react-icons/lu'
import { useLocation } from 'react-router-dom';
import { RiHome5Line } from 'react-icons/ri';
import {GoHome, GoHomeFill} from 'react-icons/go'
import LogsViewContainer from '../containers/LogsViewContainer'
import { useDispatch } from 'react-redux';
import {logout} from '../../app/redux/auth/authSlice'

export default function SignedLayout({children}) {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [activeContainerData, setActiveContainerData] = useState()
  const [isNavWide, setIsNavWide] = useState(true);

  function handleActiveContainer(containerData) {
    setActiveContainerData(containerData)
  }

  function handleCurrentIndex(index) {
    setCurrentIndex(index)
  }

  function handleNavWide(state) {
    setIsNavWide(state)
  }

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    if(children){
      setActiveContainerData({component:children})
      document.title="Not Found"
      return
    }
    document.title = menuItems[currentIndex]?.name + " @ B" ?? "B";
    const activeMenuItem = menuItems.find((item) =>
      currentPath.includes(item.path)
    );
    if (currentPath.includes("/bytes")) {
      handleActiveContainer({ component: <LogsViewContainer /> })
      setCurrentIndex(null);
      return
    }
    if (activeMenuItem && activeMenuItem.id!==3) {
      handleActiveContainer(activeMenuItem);
      setCurrentIndex(activeMenuItem.id)
      return
    }

    handleActiveContainer(menuItems[currentIndex]);

  }, [currentIndex, location.pathname]);
  
  const menuItems = [
    {
      id: 0,
      name: "Home",
      path: "/home",
      icon: <GoHome/>,
      activeIcon:<GoHomeFill/>,
      component: <HomeContainer isNavWide={isNavWide}/>,
      tag: null,
    },
    {
      id: 1,
      name: "Stage",
      path: "/stage",
      //component: <StageContainer />,
      icon: <LuLayoutDashboard/>,
      activeIcon:<BiSolidDashboard/>,
      tag: null,
    },
    {
      id: 2,
      name: "Inbox",
      path: "/inbox",
      //component: <InboxContainer />,
      icon: <BiMessageSquareDetail className="font-thin" />,
      activeIcon:<BiSolidMessageSquareDetail/>,
      tag: "34",
    },

    {
      id: 3,
      name: "Add",
      path: "",
      //component: <HomeContainer isNavWide={isNavWide} />, // Updated component to HomeContainer
      icon: <BiMessageSquareAdd />,
      tag: null,
    },
  ];

  const dispatch = useDispatch()
  function handleLogout(){
    dispatch(logout())
  }


  return (
    <div className='flex font-barlow fixed bg-secondary w-full'>
      <LeftNavContainer
        menuItems={menuItems}
        handleCurrentIndex={handleCurrentIndex}
        currentIndex={currentIndex}
        handleNavWide={handleNavWide}
        isNavWide={isNavWide}
        handleActiveContainer={handleActiveContainer}
        handleLogout={handleLogout}
      />

      <div className={`h-screen overflow-y-auto w-full ${isNavWide ? "lg:w-[calc(100vw-18rem)] " : "lg:w-[calc(100vw-5rem)]"}`}>
      {(activeContainerData?.component)}
      </div>
    </div>
  )
}
