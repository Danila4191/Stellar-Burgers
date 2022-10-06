import styles from "./mobile-menu.module.css";
import Navigation from "../navigation/navigation";
import React, {  FC } from "react";
import { MobileMenuProps } from "../../services/types/types";
const MobileMenu: FC<MobileMenuProps> = ({ auth, setMenuMobileActive,  menuMobileActive }) => {
  return (
    <div className={` ${styles.menu} `}>
      <div className={` ${styles.menu__container} pt-4`}>
        <h2 className={` text text_type_main-large pl-10 `}>Меню</h2>
        <button
          onClick={() => setMenuMobileActive(false)}
          className={` ${styles.button__close} mt-3 pr-10`}
        ></button>
      </div>
      <div className={`  pl-10 pt-10`}>
        <Navigation setMenuMobileActive={setMenuMobileActive} auth={auth} menuMobileActive={menuMobileActive} />
      </div>
    </div>
  );
};
export default MobileMenu;
