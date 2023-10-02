import React from "react";
import PropTypes from "prop-types";
import { MdOutlineClose } from "react-icons/md";

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed flex justify-center  items-center w-full h-screen bg-black bg-opacity-50 z-20 top-0 backdrop-blur">
      <div className=" bg-tertiary py-2 rounded-xl shadow-lg w-2/5 h-auto max-h-[80%] overflow-hidden overflow-y-auto">
        <button
          onClick={onClose}
          className="sticky top-0 border border-primary_hover bg-tranparent text-primary p-3 mx-2 rounded-full cursor-pointer hover:bg-secondary_accent"
        >
          <MdOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dialog;
