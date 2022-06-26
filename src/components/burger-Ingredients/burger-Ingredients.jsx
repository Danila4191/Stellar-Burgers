import React, { useRef, useState } from "react";
import ReactDom from "react-dom";
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

const Item = ({ title, image, price, id }) => {
  return (
    <div className={styles.Item} key={id}>
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

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("one");

  return (
    <div className={styles.BurgerIngredients}>
      <h1 className={`mt-10 mb-5 text_type_main-large`}>Соберите бургер</h1>
      <div className="pb-10" style={{ display: "flex" }}>
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
        <Grid  title="Булки">
          {props.Data.filter((item) => item.type == "bun").map(
            (item, index) => (
              <Item
                title={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            )
          )}
        </Grid>
        <Grid  title="Начинки">
          {props.Data.filter((item) => item.type == "main").map(
            (item, index) => (
              <Item
                title={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            )
          )}
        </Grid>
        <Grid  title="Соусы">
          {props.Data.filter((item) => item.type == "sauce").map(
            (item, index) => (
              <Item
                title={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            )
          )}
        </Grid>
      </div>
    </div>
  );
};

export default BurgerIngredients;
