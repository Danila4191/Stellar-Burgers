import { useEffect } from "react";
import ReactDom from "react-dom";

import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");
const Modal = ({ active, children, onCloseFunc }) => {
  const ESC = 27;
  

  useEffect(() => {
    const handleEscapeClose = (evt) => {
      if (evt.keyCode === ESC) {
        if (active == true) {
          onCloseFunc();
        }
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  });
  return ReactDom.createPortal (
    <ModalOverlay active={active} onCloseFunc={onCloseFunc}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
      >
        <button
          onClick={() => {
            if (active == true) {
              onCloseFunc();
            }
          }}
          className={`${styles.close} `}
        ></button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
Modal.propTypes = {
  active: PropTypes.bool.isRequired,
};
export default Modal;
