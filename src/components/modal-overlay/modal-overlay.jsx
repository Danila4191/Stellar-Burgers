import styles from "./modal-overlay.module.css";

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
ModalOverlay.propTypes = {};
export default ModalOverlay;
