import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { useDispatch, useSelector } from "react-redux";
const modalRoot = document.getElementById("react-modals");
const Modal = ({ active, setActive, children }) => {
  const ESC = 27;
  const dispatch = useDispatch()
  const item = useSelector((state) => state.ingredient.data);

  useEffect(() => {
    const handleEscapeClose = (evt) => {
      if (evt.keyCode === ESC) {
        setActive(false);
        setTimeout(()=>{item !== null && ( dispatch({type:"DELETE_INGREDIENT"}))},500)
       
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, []);

  return ReactDom.createPortal(
    <ModalOverlay active={active} setActive={setActive}>
    <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
      >
        <button
          onClick={() =>{
            setTimeout(()=>{item !== null && ( dispatch({type:"DELETE_INGREDIENT"}))},500)
            setActive(false)}}
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
