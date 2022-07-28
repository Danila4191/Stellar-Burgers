import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";

const modalRoot = document.getElementById("react-modals");
const Modal = ({ active, setActive, children, onCloseFunc }) => {
  const ESC = 27;
 
  useEffect(() => { 
    const handleEscapeClose = (evt) => {
      if (evt.keyCode === ESC) {
        //в useEffect функцию почему-то не видно 
        onCloseFunc()
          document.removeEventListener("keydown", handleEscapeClose);
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
    
    };
  }, []);
  return ReactDom.createPortal(
    <ModalOverlay active={active} setActive={setActive} onCloseFunc ={onCloseFunc}>
    <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
      >
        <button
          onClick={() =>{
            onCloseFunc()
          }
          }
          className={`${styles.close} `}
        ></button>
        {children}
      </div>
    </ModalOverlay>,
  modalRoot
  )
};
Modal.propTypes = {
  setActive: PropTypes.func.isRequired,
 
};
export default Modal;
