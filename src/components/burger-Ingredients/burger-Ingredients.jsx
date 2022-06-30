import React, { useState } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Ingredients.module.css";
import IngredientInfo from "../ingredient-info/ingredient-info";
const Grid = (props) => {
  return (
    <ul  id={`${props.id}`} className={`${styles.Section} pt-10`}>
      <h2 className={`${styles.Subtitle} text_type_main-medium`}>
        {props.title}
      </h2>
      <div className={`${styles.Grid} pr-4 pl-4 pt-6`}>{props.children}</div>
    </ul>
  );
};
Grid.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
const Ingredient = ({
  title,
  image,
  price,
  setModalActive,
  setModal,
  proteins,
  fat,
  carbohydrates,
  calories,
}) => {
  const [count] = useState(0);
  function openModal() {
    setModal(
      <IngredientInfo
        title={title}
        price={price}
        img={image}
        proteins={proteins}
        fat={fat}
        carbohydrates={carbohydrates}
        calories={calories}
      />
    );
    setModalActive(true);
  }
  return (
    <div onClick={openModal} className={styles.Item}>
      <div className={count === 0 ? styles.Counter : styles.none}>
        <Counter count={count} size="default" />
      </div>
      <img
        className={`${styles.Image} pr-4 pl-4 pb-1`}
        src={image}
        alt={title}
      />
      <div className={`${styles.Price} pb-1`}>
        <div className="text_type_digits-default">{price}</div>
        <CurrencyIcon />
      </div>
      <h3 className={`${styles.Subtitle} text_type_main-small`}>{title}</h3>
    </div>
  );
};
Ingredient.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
};
const BurgerIngredients = ({ data, setModalActive, setModal }) => {
  const [current, setCurrent] = useState("");


  function sroll(type) {
    setCurrent(type);
    document
      .querySelector(`#${type}`)
      .scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <div className={styles.BurgerIngredients}>
      <h1 className={`mt-10 mb-5 text_type_main-large`}>Соберите бургер</h1>
      <div className={`${styles.ScrollBar} pb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={sroll}>
          Булки
        </Tab>
        <Tab value="souce" active={current === "souce"} onClick={sroll}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={sroll}>
          Начинки
        </Tab>
      </div>
      <div className={styles.Ingredients}>
        <Grid   id="bun" title="Булки">
          {data
            .filter((item) => item.type == "bun")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                title={item.name}
                price={item.price}
                image={item.image}
                proteins={item.proteins}
                fat={item.fat}
                carbohydrates={item.carbohydrates}
                calories={item.calories}
                id={item._id}
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ))}
        </Grid>
        <Grid  id="souce" title="Соусы">
          {data
            .filter((item) => item.type == "sauce")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                title={item.name}
                price={item.price}
                image={item.image}
                proteins={item.proteins}
                fat={item.fat}
                carbohydrates={item.carbohydrates}
                calories={item.calories}
                id={item._id}
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ))}
        </Grid>
        <Grid id="main" title="Начинки">
          {data
            .filter((item) => item.type == "main")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                title={item.name}
                price={item.price}
                image={item.image}
                proteins={item.proteins}
                fat={item.fat}
                carbohydrates={item.carbohydrates}
                calories={item.calories}
                id={item._id}
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ))}
        </Grid>
      </div>
    </div>
  );
};
BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
  setModal: PropTypes.func.isRequired,
  setModalActive: PropTypes.func.isRequired,
};
export default BurgerIngredients;
