import React from "react";
import ReactDOM from "react-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={styles.Header}>
        <nav className={styles.Nav}>
        <div className={`${styles.Links} `}>
          <a
            href="/feed"
            className={`${styles.Container} ${styles.Active}   mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small `}
          >
            <BurgerIcon type="primary" />
            Конструктор
          </a>
          <a
            href="/order"
            className={`${styles.Container}  mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small`}
          >
            <ListIcon type="secondary" />
            Лента заказов
          </a>
        </div>
        <div className={`${styles.Logo} pr-30 mr-8  pt-5 `}>
          <Logo />
        </div>
          <a
            href="/account"
            className={`${styles.Container}   mt-4 pl-5 pr-5 pt-4 pb-4 text_type_main-small`}
          >
            <ProfileIcon type="secondary" />
            Личный кабинет
          </a>
          </nav>
      </header>
    );
  }
}

export default AppHeader;
