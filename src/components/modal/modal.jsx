import React, { useState } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
const Modal = (props) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}>
        <button className={`${styles.close} `}></button>
        {props.children}
      </div>
    </div>
  );
};
export default Modal;
