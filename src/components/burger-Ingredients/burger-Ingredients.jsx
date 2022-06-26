import React, { useState } from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Ingredients.module.css";

const Grid = (props) => {
  return (
    <ul className={`${styles.Section} pt-10`}>
      <h2 className={`${styles.Subtitle} text_type_main-medium`}>
        {props.title}
      </h2>
      <div className={`${styles.Grid} pr-4 pl-4 pt-6`}>{props.children}</div>
    </ul>
  );
};
Grid.propTypes = {
  title: PropTypes.string.isRequired,
};

const Ingredient = ({ title, image, price, id }) => {
  const [count] = useState(0)
  return (
    <div className={styles.Item}>
      <div className={count === 0 ? styles.Counter : styles.none}>
        <Counter count={count} size="default" />
      </div>
      <img
        className={`${styles.Image} pr-4 pl-4 pb-1`}
        src={image}
        alt={title}
      />
      <p className={`${styles.Price} pb-1`}>
        <div className="text_type_digits-default">{price}</div>
        <CurrencyIcon />
      </p>
      <h3 className={`${styles.Subtitle} text_type_main-small`}>{title}</h3>
    </div>
  );
};
Ingredient.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("one");

  return (
    <div className={styles.BurgerIngredients}>
      <h1 className={`mt-10 mb-5 text_type_main-large`}>Соберите бургер</h1>
      <div className={`${styles.ScrollBar} pb-10`}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.Ingredients}>
        <Grid title="Булки">
          {props.data
            .filter((item) => item.type == "bun")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                title={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            ))}
        </Grid>
        <Grid title="Соусы">
          {props.data
            .filter((item) => item.type == "sauce")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                title={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            ))}
        </Grid>
        <Grid title="Начинки">
          {props.data
            .filter((item) => item.type == "main")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                title={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            ))}
        </Grid>
      </div>
    </div>
  );
};
BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
};
export default BurgerIngredients;
