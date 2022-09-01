import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
const ModalOverlay = ({ active, children, onCloseFunc }) => {
  return (
    <div
      className={
        active ? `${styles.overlay} ${styles.overlay_opened}` : styles.overlay
      }
      onClick={() => {
        if (active == true) {
          onCloseFunc();
        }
      }}
    >
      {children}
    </div>
  );
};
ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  onCloseFunc:  PropTypes.func
};
export default ModalOverlay;
