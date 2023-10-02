import React, { useState } from "react";
import LogoButton from "../../components/LogoButton";
import { BiLogOutCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { HiMenuAlt2, HiOutlineDocumentAdd } from "react-icons/hi";
import DropMenuContainer from "../menu/DropMenuContainer";
import { MdOutlineNewLabel } from "react-icons/md";
import LinkedNavButton from "../menu/LinkedNavButton";
import UnlinkedNavButton from "../menu/UnlinkedNavButton";
import Dialog from "../../components/Dialog";
// import CreateByteContainer from "../containers/CreateByteContainer";
import { useSelector } from "react-redux";
import CreateByteContainer from "../CreateByteContainer";

export default function LeftNavContainer({
  menuItems,
  handleCurrentIndex,
  currentIndex,
  handleNavWide,
  isNavWide,
  handleLogout,
  handleActiveContainer,
}) {
  function toggleNav() {
    handleNavWide(!isNavWide);
  }

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAddBtnDropdownVisible, setIsAddBtnDropdownVisible] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleAddBtnDropdown = () => {
    setIsAddBtnDropdownVisible(!isAddBtnDropdownVisible);
  };

  function handleSettingsBtn() {
    toggleDropdown();
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateByteBtn = () => {
    toggleAddBtnDropdown();
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  function handleCreateLogBtn() {
    toggleAddBtnDropdown();
    //handleActiveContainer({component:<CreateLogContainer/>})
  }

  const moreMenuList = [
    {
      name: "Settings & Privacy",
      icon: <IoSettingsOutline />,
      onClick: handleSettingsBtn,
    },
    {
      name: "Logout",
      icon: <BiLogOutCircle />,
      onClick: handleLogout,
    },
  ];

  const addMenuList = [
    {
      name: "Create a Byte",
      icon: <MdOutlineNewLabel />,
      onClick: handleCreateByteBtn,
    },
    {
      name: "Create a Byte Log",
      icon: <HiOutlineDocumentAdd />,
      onClick: handleCreateLogBtn,
    },
  ];

  return (
    <div
      className={`invisible w-0 lg:visible flex flex-col h-screen select-none border-r border-secondary_accent relative ${
        isNavWide ? "lg:w-[18rem]" : "lg:w-[5rem]"
      }`}
    >
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <CreateByteContainer onClose={handleCloseDialog} />
      </Dialog>
      <div className="mx-4 py-4 ">
        <div className="mb-4">
          <LogoButton onClick={toggleNav} />
        </div>
        {menuItems.map((menu) => (
          <div
            key={menu.id}
            className={`py-2 text-md group/item ${
              isNavWide ? "w-full" : "w-fit"
            }`}
          >
            {menu.id === 3 ? (
              <>
                <DropMenuContainer
                  isDropdownVisible={isAddBtnDropdownVisible}
                  menuDataList={addMenuList}
                  onHide={toggleAddBtnDropdown}
                  isBelow={true}
                  menuButton={
                    <UnlinkedNavButton
                      menu={menu}
                      isNavWide={isNavWide}
                      toggleAddBtnDropdown={toggleAddBtnDropdown}
                    />
                  }
                />
              </>
            ) : (
              <>
                <LinkedNavButton
                  menu={menu}
                  currentIndex={currentIndex}
                  handleCurrentIndex={handleCurrentIndex}
                  isNavWide={isNavWide}
                />
              </>
            )}
          </div>
        ))}

        {isAuthenticated && (
          <div className="flex-1 w-full h-[1px] mb-2 bg-secondary_accent"></div>
        )}

        {isAuthenticated && (
          <div className="left-0 m-0 w-[calc(100%)]">
            <DropMenuContainer
              isDropdownVisible={isDropdownVisible}
              menuDataList={moreMenuList}
              onHide={toggleDropdown}
              isBelow={false}
              menuButton={
                <UnlinkedNavButton
                  menu={{
                    name: "More",
                    icon: <HiMenuAlt2 className="text-[1.6rem]" />,
                  }}
                  isNavWide={isNavWide}
                  toggleAddBtnDropdown={toggleDropdown}
                />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
