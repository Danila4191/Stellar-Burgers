import { NavLink } from "react-router-dom";
import styles from "./not-found.module.css";
const NotFound = () => {
  return (
    <div>
      <h1>страница не найдена</h1>
      <NavLink to="/" className={`${styles.link} text_type_main-medium`}>
        <h2 className={`${styles.link} `}> вернуться?</h2>
      </NavLink>
    </div>
  );
};
export default NotFound