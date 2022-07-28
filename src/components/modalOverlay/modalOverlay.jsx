import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./modalOverlay.module.css";
import { useDispatch, useSelector } from "react-redux";

const ModalOverlay = ({ active, setActive, children,onCloseFunc }) => {

  
  return (
    <div
      className={
        active ? `${styles.overlay} ${styles.overlay_opened}` : styles.overlay
      }
      onClick={() =>{
         onCloseFunc()
        }}
    >
      {children}
    </div>
  );
};
ModalOverlay.propTypes = {
  setActive: PropTypes.func.isRequired,
};
export default ModalOverlay;
