import React, { useContext, useEffect, useState } from "react";
import { isMobileContext } from "../../services/context/appContext";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

const Grid = (props) => {
  return (
    <ul id={`${props.id}`} className={`${styles.section} pb-10`}>
      <h2 className={`${styles.subtitle} text_type_main-medium`}>
        {props.title}
      </h2>
      <div className={`${styles.grid} pr-4 pl-4 pt-6`}>{props.children}</div>
    </ul>
  );
};
Grid.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const BurgerIngredients = ({
  background,
  setModalActive,
  setModal,
  setOnCloseFunc,
  modalActive,
  pageChange,
}) => {
  const ingredientsFromSetver = useSelector(
    (state) => state.ingredients.productData
  );
  const [cursorPosition, setCursorPosition] = React.useState({});
  const [current, setCurrent] = useState("");
  const { isMobile } = useContext(isMobileContext);
  const total = useSelector((state) => state.total.total);
  const location = useLocation();

  function sroll(type) {
    document
      .querySelector(`#${type}`)
      .scrollIntoView({ block: "start", behavior: "smooth" });
    OnScrol();
  }

  const OnScrol = (e) => {
    const bun = document.querySelector(`#${"bun"}`).offsetTop;
    const main = document.querySelector(`#${"main"}`).offsetTop;
    const souse = document.querySelector(`#${"souce"}`).offsetTop;
    const scrollTop = document.querySelector(`#${"list"}`).scrollTop;
    setCursorPosition({
      ...cursorPosition,
      y: scrollTop,
    });

    if (cursorPosition.y < bun) {
      setCurrent("bun");
    } else if (cursorPosition.y > bun && cursorPosition.y < souse) {
      setCurrent("souce");
    } else if (cursorPosition.y < main) {
      setCurrent("main");
    }
  };


 


  return (
    <div className={styles.burger__ingredients}>
      <h1 className={`${styles.title} mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h1>
      <div className={`${styles.scrollbar} pb-10`}>
        <div
          className={`${styles.line} ${
            current == "bun" && styles.line_active
          } pb-4 pt-4`}
        >
          <p
            onClick={() => sroll("bun")}
            className={`${styles.tab__button} text text_type_main-small`}
          >
            Булки
          </p>
        </div>
        <div
          className={`${styles.line} ${
            current == "souce" && styles.line_active
          } pb-4 pt-4`}
        >
          <p
            onClick={() => sroll("souce")}
            className={`${styles.tab__button}  text text_type_main-small`}
          >
            Соусы
          </p>
        </div>
        <div
          className={`${styles.line}  ${
            current == "main" && styles.line_active
          } pb-4 pt-4`}
        >
          <p
            onClick={() => sroll("main")}
            className={`${styles.tab__button}  text text_type_main-small`}
          >
            Начинки
          </p>
        </div>
      </div>

      <div
        id="list"
        onScroll={(e) => {
          OnScrol(e);
        }}
        className={styles.ingredients__list}
      >
        <Grid id="bun" title="Булки">
          {ingredientsFromSetver
            .filter((ingredient) => ingredient.type == "bun")
            .map((ingredient, index) => (
              <NavLink
                className={styles.links}
                state={location}
                //to={`/ingredients/${ingredient._id}`}
                to={{
                  pathname: `/ingredients/${ingredient._id}`,
                  state: { background: location }
                }}
                key={ingredient._id + index}
              >
                <BurgerIngredient
                  ingredient={ingredient}
                  setModalActive={setModalActive}
                  setModal={setModal}
                  setOnCloseFunc={setOnCloseFunc}
                  modalActive={modalActive}
                />
              </NavLink>
            ))}
        </Grid>

        <Grid id="souce" title="Соусы">
          {ingredientsFromSetver
            .filter((ingredient) => ingredient.type == "sauce")
            .map((ingredient, index) => (
              <BurgerIngredient
                key={ingredient._id + index}
                ingredient={ingredient}
                setModalActive={setModalActive}
                setModal={setModal}
                setOnCloseFunc={setOnCloseFunc}
                modalActive={modalActive}
              />
            ))}
        </Grid>
        <div className="pb-15">
          <Grid id="main" title="Начинки">
            {ingredientsFromSetver
              .filter((ingredient) => ingredient.type == "main")
              .map((ingredient, index) => (
                <BurgerIngredient
                  key={ingredient._id + index}
                  ingredient={ingredient}
                  setModalActive={setModalActive}
                  setModal={setModal}
                  setOnCloseFunc={setOnCloseFunc}
                  modalActive={modalActive}
                />
              ))}
          </Grid>
        </div>
      </div>

      {isMobile && (
        <div className={`${styles.scrollbar__mobile}`}>
          <div className={`${styles.scrollbar__mobile__container} pl-2`}>
            <p className={`pr-2 text text_type_digits-default `}>{total}</p>
            <CurrencyIcon />
          </div>
          <div className={`${styles.scrollbar__button__mobile} pt-4 pr-3`}>
            <Button onClick={pageChange} type="primary" size="small">
              <p className={` text text_type_main-small `}>
                {"Смотреть заказ "}
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
BurgerIngredients.propTypes = {
  setModal: PropTypes.func.isRequired,
  setModalActive: PropTypes.func.isRequired,
};
export default BurgerIngredients;
