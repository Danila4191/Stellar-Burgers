import { useEffect, FC } from "react";
import ReactDom from "react-dom";

import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ModalProps } from "../../services/types/types";
const modalRoot = document.getElementById("react-modals") as HTMLElement;
const Modal: FC<ModalProps> = ({ active, children, onCloseFunc }) => {
  const ESC = 27;

  useEffect(() => {
    const handleEscapeClose = (evt: { keyCode: number; }) => {
  
      if (evt.keyCode === ESC) {
        if (active == true &&  onCloseFunc ) {
    
          onCloseFunc();
        }
      }
    };
    if (active == true) {
      document.addEventListener("keydown", handleEscapeClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [active]);

  return ReactDom.createPortal(
  
    <ModalOverlay active={active} onCloseFunc={onCloseFunc}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
      >
        <button
          onClick={() => {
            if (active == true && onCloseFunc ) {
              
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

export default Modal;
