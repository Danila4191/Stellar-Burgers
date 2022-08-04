import styles from "./mobile-menu.module.css";
import Navigation from "../navigation/navigation";
import { useState, useContext } from "react";
import { isMobileContext } from "../../services/context/appContext";

const MobileMenu = ({ auth, setMenuActive }) => {
  const { isMobile } = useContext(isMobileContext);
 
  return (
    <div className={` ${styles.menu} `}>
      <div className={` ${styles.menu__container} pt-4`}>
        <h2 className={` text text_type_main-large pl-10 `}>Меню</h2>
        <button
          onClick={() => setMenuActive(false)}
          className={` ${styles.button__close} mt-3 pr-10`}
        ></button>
      </div>
      <div className={`  pl-10 pt-10`}>
        <Navigation setMenuActive={setMenuActive} auth={auth} />
      </div>
    </div>
  );
};
export default MobileMenu;
