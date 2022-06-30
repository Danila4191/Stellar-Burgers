import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
    >
      <button
        onClick={() => setActive(false)}
        className={`${styles.close} `}
      ></button>
      {children}
    </div>
  );
};
Modal.propTypes = {
  setActive: PropTypes.func.isRequired,
};
export default Modal;
