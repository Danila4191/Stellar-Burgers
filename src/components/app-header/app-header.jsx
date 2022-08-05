import styles from "./app-header.module.css";
import Navigation from "../navigation/navigation";
import { useState, useContext } from "react";
import { isMobileContext } from "../../services/context/appContext";
import MobileMenu from "../mobile-menu/mobile-menu";
import { NavLink} from "react-router-dom";
const AppHeader = ({ auth }) => {
  const { isMobile } = useContext(isMobileContext);
  const [menuActive,setMenuActive] = useState(false)

  return (
    <header className={styles.header}>
      {isMobile ? (
        <div className={`${styles.header__container_mobile}`}>
           <NavLink to="/" className={`${styles.link} `}>
           <div className={`${styles.logo_mobile}`}></div>
          </NavLink>
          
          <button onClick={()=>setMenuActive(true)}  className={`${styles.burger}`}></button>
        </div>
      ) : (
        <Navigation  auth={auth} />
      )}
      {(isMobile && menuActive) && <MobileMenu setMenuActive={setMenuActive} auth={auth} />}
    </header>
  );
};

export default AppHeader;
