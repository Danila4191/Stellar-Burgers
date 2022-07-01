import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./modalOverlay.module.css";
const ModalOverlay = ({ active, setActive, children }) => {

  return (
    <div
      className={
        active ? `${styles.overlay} ${styles.overlay_opened}` : styles.overlay
      }
      onClick={() => setActive(false)}
    >
      {children}
    </div>
  );
};
ModalOverlay.propTypes = {
  setActive: PropTypes.func.isRequired,
};
export default ModalOverlay;
