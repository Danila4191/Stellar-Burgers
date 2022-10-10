import { useState, useContext, useEffect, FC } from "react";
import styles from "./navigation.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import { isMobileContext } from "../../services/context/appContext";
import Menu from "../menu/menu";

import { INavigationProps } from "../../services/types/types";
const Navigation: FC<INavigationProps> = ({
  auth,
  setMenuMobileActive,
  menuMobileActive,
}) => {
  const { isMobile } = useContext(isMobileContext);
  const location = useLocation();
  const [link, setLink] = useState<string>("");
  const [menuActiveProfile, setMenuActiveProfile] = useState<boolean>(false);

  useEffect(() => {
    setLink(location.pathname);
  });

  function menuActiveChange() {
    if (menuActiveProfile == false) {
      setMenuActiveProfile(true);
    } else {
      setMenuActiveProfile(false);
    }
  }
  //console.log(auth)
  return (
    <nav className={`${styles.nav} `}>
      <div className={`${styles.links} `}>
        <NavLink
          to="/"
          className={`${styles.link}`}
          onClick={
            isMobile && setMenuMobileActive
              ? () => {
                  setMenuMobileActive(false);
                }
              : undefined
          }
        >
          <div
            className={`${styles.container} ${
              "/" == link ? styles.active : null
            }  mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small `}
          >
            <BurgerIcon type={"/" == link ? "primary" : "secondary"} />
            Конструктор
          </div>
        </NavLink>

        <NavLink
          to="/feed"
          className={`${styles.link}`}
          onClick={
            isMobile && setMenuMobileActive
              ? () => {
                  setMenuMobileActive(false);
                }
              : undefined
          }
        >
          <div
            className={`${styles.container} ${
              "/feed" == link ? styles.active : null
            }  mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small`}
          >
            <ListIcon type={"/feed" == link ? "primary" : "secondary"} />
            Лента заказов
          </div>
        </NavLink>
      </div>
      {!isMobile && (
        <div className={`${styles.logo} pr-30 mr-8  pt-5 `}>
          <NavLink to="/" className={`${styles.link} `}>
            <Logo />
          </NavLink>
        </div>
      )}
      {isMobile && menuActiveProfile && auth && (
        <div className="pl-10 ml-3">
          {<Menu setMenuMobileActive={setMenuMobileActive} />}
        </div>
      )}
      {!isMobile ? (
        <NavLink
          to={auth ? "/profile" : "/Login"}
          className={`${styles.container}  ${
            "/Login" == link ||
            "/profile" == link ||
            "/profile/orders" == link ||
            "/registration" == link ||
            "/forgot-password" == link ||
            "/reset-password" == link
              ? styles.active
              : undefined
          } mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small`}
          onClick={() => setLink("/profile")}
        >
          <ProfileIcon
            type={
              "/Login" == link ||
              "/profile" == link ||
              "/profile/orders" == link ||
              "/registration" == link ||
              "/forgot-password" == link ||
              "/reset-password" == link
                ? "primary"
                : "secondary"
            }
          />{" "}
          Личный кабинет
        </NavLink>
      ) : !auth ? (<NavLink
      to={ "/Login"}
      className={`${styles.container}  ${
        "/Login" == link ||
        "/profile" == link ||
        "/profile/orders" == link ||
        "/registration" == link ||
        "/forgot-password" == link ||
        "/reset-password" == link
          ? styles.active
          : undefined
      } mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small`}
      onClick={  !isMobile
        ? () => setLink("/profile")
        : !auth && setMenuMobileActive !== undefined
        ? () => setMenuMobileActive(false)
        : () => menuActiveChange()}
    >
      <ProfileIcon
        type={
          "/Login" == link ||
          "/profile" == link ||
          "/profile/orders" == link ||
          "/registration" == link ||
          "/forgot-password" == link ||
          "/reset-password" == link
            ? "primary"
            : "secondary"
        }
      />{" "}
      Личный кабинет
    </NavLink>) : (
        <div
          className={`${styles.container}  ${
            "/Login" == link ||
            "/profile" == link ||
            "/profile/orders" == link ||
            "/registration" == link ||
            "/forgot-password" == link ||
            "/reset-password" == link
              ? styles.active
              : undefined
          } mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small`}
          onClick={
            !isMobile
              ? () => setLink("/profile")
              : !auth && setMenuMobileActive !== undefined
              ? () => setMenuMobileActive(false)
              : () => menuActiveChange()
          }
        >
          <ProfileIcon
            type={
              "/Login" == link ||
              "/profile" == link ||
              "/profile/orders" == link ||
              "/registration" == link ||
              "/forgot-password" == link ||
              "/reset-password" == link
                ? "primary"
                : "secondary"
            }
          />
          Личный кабинет
          {isMobile && auth && (
            <button
              onClick={menuActiveChange}
              className={`${styles.open__menu} ${
                menuActiveProfile && styles.menu__close
              } `}
            ></button>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navigation;
