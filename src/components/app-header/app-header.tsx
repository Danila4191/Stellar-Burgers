import styles from "./app-header.module.css";
import Navigation from "../navigation/navigation";
import { useState, useContext, FC } from "react";
import { isMobileContext } from "../../services/context/appContext";
import MobileMenu from "../mobile-menu/mobile-menu";
import { NavLink} from "react-router-dom";

const AppHeader = ({auth}:any) => {
  const { isMobile } = useContext(isMobileContext);
  const [menuMobileActive,setMenuMobileActive] = useState(false)

  return (
    <header className={styles.header}>
      {isMobile ? (
        <div className={`${styles.header__container_mobile}`}>
           <NavLink to="/" className={`${styles.link} `}>
           <div className={`${styles.logo_mobile}`}></div>
          </NavLink>
          <button onClick={()=>setMenuMobileActive(true)}  className={`${styles.burger}`}></button>
          { menuMobileActive && <MobileMenu setMenuMobileActive={setMenuMobileActive} auth={auth} menuMobileActive={menuMobileActive} />}
        </div>
      ) : (
      
        <Navigation  auth={auth} />
      )}
    </header>
  );
};

export default AppHeader;
