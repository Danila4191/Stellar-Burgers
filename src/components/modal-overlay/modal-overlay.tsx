import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import React, { FC } from "react";
import { ModalOverlayProps } from "../../services/types/types";
const ModalOverlay:FC<ModalOverlayProps> = ({ active, children, onCloseFunc }) => {
  return (
    <div
      className={
        active ? `${styles.overlay} ${styles.overlay_opened}` : styles.overlay
      }
      onClick={() => {
        if (active == true &&  onCloseFunc ) {
          onCloseFunc();
        }
      }}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
