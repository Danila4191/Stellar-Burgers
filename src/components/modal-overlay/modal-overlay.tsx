import styles from "./modal-overlay.module.css";

import React, { FC } from "react";
import { IModalOverlayProps } from "../../services/types/types";
const ModalOverlay:FC<IModalOverlayProps> = ({ active, children, onCloseFunc }) => {
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
