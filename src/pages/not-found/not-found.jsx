import { NavLink } from "react-router-dom";
import styles from "./not-found.module.css";
const NotFound = () => {
  return (
    <div className={`${styles.container} pt-10`}>
      <div>
        <h1 className={`${styles.color} text `}>
          {" "}
          <p className={`${styles.color} text text_type_digits-large`}>404</p> Упсс...
         бургеров тут нет
        </h1>
        <NavLink to="/" className={`${styles.link} text_type_main-medium`}>
          <h2 className={`${styles.link} ${styles.color} text text_type_main-default pt-4`}> вернуться?</h2>
        </NavLink>
      </div>
    </div>
  );
};
export default NotFound;
