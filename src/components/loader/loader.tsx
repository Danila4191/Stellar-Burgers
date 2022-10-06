import styles from "../loader/loader.module.css"


const Loader = () => (
  <div className={`${styles.loader_container} pt-20`}>
    <div className={styles.loader}></div>
  </div>
);

export default Loader;