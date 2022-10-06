import styles from "./menu.module.css";
import { useState, useContext, useEffect, FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { isMobileContext } from "../../services/context/appContext";
import { MenuProps } from "../../services/types/types";
const Menu:FC<MenuProps> = ({ text, setMenuMobileActive }) => {
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
            isMobile && setMenuMobileActive &&
            (() => {
              setMenuMobileActive(false);
            })
          }
      
          to={ "/profile"}
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
            isMobile && setMenuMobileActive &&
            (() => {
              setMenuMobileActive(false);
            })
          }
        
          to={"/profile/orders"}
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
            isMobile && setMenuMobileActive &&
            (() => {
              setMenuMobileActive(false);
            })
          }
       
          to={ "/out"}
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
