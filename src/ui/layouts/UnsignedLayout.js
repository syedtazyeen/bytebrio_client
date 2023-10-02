import SignupDialog from '../components/SignupDialog'
import LeftNavContainer from "../containers/nav/LeftNavContainer"
import React, { useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom';
import HomeContainer from '../containers/home/HomeContainer';
//import BlogViewPage from '../containers/LogsViewContainer';
import { BiHomeAlt, BiMessageSquareAdd } from 'react-icons/bi';
//import SignDialogContainer from '../containers/sign/SignDialogContainer'
import Dialog from '../components/Dialog';
import { MdOutlineClose } from 'react-icons/md';
import SignDialogContainer from '../containers/sign/SignDialogContainer'
import SignupFormContainer from '../containers/sign/SignupFormContainer';
import { GoHome, GoHomeFill } from 'react-icons/go';
import LogsViewContainer from '../containers/LogsViewContainer';

export default function UnsignedLayout({children}) {

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
    if (activeMenuItem) {
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
      icon: <GoHome />,
      activeIcon: <GoHomeFill />,
      component: <HomeContainer isNavWide={isNavWide}/>,
      tag: null,
    },
  ];


  const [isSignDialogOpen, setIsSignDialogOpen] = useState(false);

  const handleSignOpenDialog = () => {
    setIsSignDialogOpen(true);
  };

  const handleSignCloseDialog = () => {
    setIsSignDialogOpen(false);
  }

  const [currentSignForm, setCurrentSignForm] = useState(null)


  function setCurrentFormToLogin() {
    setCurrentSignForm(<LoginFormContainerThis setCurrentFormToSignup={setCurrentFormToSignup} />)
  }
  function setCurrentFormToSignup() {
    setCurrentSignForm(<SignupFormContainerThis setCurrentFormToLogin={setCurrentFormToLogin} />)
  }


  useEffect(() => {
    //setActiveContainerData(setCurrentFormToSignup())
    setCurrentFormToSignup()
  }, [])


  return (
    <div className='flex font-barlow fixed bg-secondary w-full'>
      <LeftNavContainer
        menuItems={menuItems}
        handleCurrentIndex={handleCurrentIndex}
        currentIndex={currentIndex}
        handleNavWide={handleNavWide}
        isNavWide={isNavWide}
      />

      <div className={`h-screen overflow-y-auto w-full ${isNavWide ? "lg:w-[calc(100vw-18rem)]" : "lg:w-[calc(100vw-5rem)]"}`}>
      {(activeContainerData?.component)}
      </div>


      <Dialog isOpen={isSignDialogOpen} onClose={handleSignCloseDialog}>
        {currentSignForm}
      </Dialog>
      <SignupDialog onClick={handleSignOpenDialog} />
    </div>
  )

}

function SignupFormContainerThis({ setCurrentFormToLogin }) {
  return (
    <div className='mx-6 my-4'>
      <div className='flex items-center'>
        <p className='font-bold text-2xl text-primary mr-2'>Already have an account?</p>
        <p
          onClick={setCurrentFormToLogin}
          className='text-blue-400 font-semibold cursor-pointer hover:border-b-[2px] border-primary_accent'>Login</p>
      </div>
      <SignupFormContainer />
    </div>
  )
}

function LoginFormContainerThis({ setCurrentFormToSignup }) {
  return (
    <div className='mx-6 my-4'>
      <div className='flex items-center'>
        <p className='font-bold text-2xl text-primary mr-2'>New to the community?</p>
        <p
          onClick={setCurrentFormToSignup}
          className='text-blue-400 font-semibold cursor-pointer hover:border-b-[2px] border-primary_accent'>Sign up</p>
      </div>
      <SignDialogContainer />
    </div>
  )
}