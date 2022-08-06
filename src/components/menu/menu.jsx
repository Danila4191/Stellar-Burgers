import styles from "./menu.module.css";
import { useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { isMobileContext } from "../../services/context/appContext";

const Menu = ({ text, setMenuMobileActive }) => {
  const [link, setLink] = useState("");
  const { isMobile } = useContext(isMobileContext);
  const location = useLocation();

  useEffect(() => {
    setLink(location.pathname);
  }, []);

  return (
    <div className={`${styles.nav_container} `}>
      <nav className={`${styles.nav} `}>
        <NavLink
          onClick={
            isMobile &&
            (() => {
              setMenuMobileActive(false);
            })
          }
          to={link !== "/profile" && "/profile"}
          className={`${styles.link}  
        ${isMobile ? "text_type_main-small" : "text_type_main-medium"}
          `}
        >
          <h3
            className={`${styles.link}   ${
              link == "/profile" ? styles.active : null
            }`}
          >
            Профиль
          </h3>
        </NavLink>

        <NavLink
          onClick={
            isMobile &&
            (() => {
              setMenuMobileActive(false);
            })
          }
          to={link !== "/profile/orders" && "/profile/orders"}
          className={`${styles.link} 

          ${isMobile ? "text_type_main-small" : "text_type_main-medium"}`}
        >
          <h3
            className={`${styles.link}    ${
              link == "/profile/orders" ? styles.active : null
            }`}
          >
            История заказов
          </h3>
        </NavLink>
        <NavLink
          onClick={
            isMobile &&
            (() => {
              setMenuMobileActive(false);
            })
          }
          to={link !== "/out" && "/out"}
          className={`${styles.link} 

          ${isMobile ? "  text_type_main-small" : "text_type_main-medium"}`}
        >
          <h3
            className={`${styles.link}  ${
              link == "/out" ? styles.active : null
            }`}
          >
            Выход
          </h3>
        </NavLink>
      </nav>
      {!isMobile && (
        <p className={`${styles.text} pt-20 text_type_main-small`}>{text}</p>
      )}
    </div>
  );
};
export default Menu;
