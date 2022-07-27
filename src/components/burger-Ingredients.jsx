import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import IngredientType from "../../utils/types";
import PropTypes from "prop-types";
import { IngredientContext } from "../../services/context/appContext";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Ingredients.module.css";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { useDispatch, useSelector } from "react-redux";
//import { useDrag } from "react-dnd";
const Grid = (props) => {
  return (
    <ul id={`${props.id}`} className={`${styles.Section} pt-10`}>
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


const Ingredient = ({ item, setModalActive, setModal }) => {
  const [count] = useState(0);
  const dispatch = useDispatch()
 /* const [, dragRef] = useDrag({
      type: item.type,
      item: item,
      collect: monitor => ({
      isDrag: monitor.isDragging()
    })});
*/
  function openModal() {
    setModal(<IngredientInfo />);
    setModalActive(true);
    dispatch({type:"ADD_INGREDIENT", payload:item})
 
  }
  return (
    <div onClick={openModal} className={styles.Item}>
      <div className={count === 0 ? styles.Counter : styles.none}>
        <Counter count={count} size="default" />
      </div>
      <img
        className={`${styles.Image} pr-4 pl-4 pb-1`}
        src={item.image}
        alt={item.name}
      />
      <div className={`${styles.Price} pb-1`}>
        <div className="text_type_digits-default">{item.price}</div>
        <CurrencyIcon />
      </div>
      <h3 className={`${styles.Subtitle} text_type_main-small`}>{item.name}</h3>
    </div>
  );
};
Ingredient.propTypes = { item: PropTypes.object.isRequired };


const BurgerIngredients = ({ setModalActive, setModal }) => {
  const items = useSelector((state) => state.ingredients.productData);
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
        
        <Grid id="bun" title="Булки">
          {items
            .filter((item) => item.type == "bun")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                item={item}
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ))}
        </Grid>

        <Grid id="souce" title="Соусы">
          {items
            .filter((item) => item.type == "sauce")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                item={item}
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ))}
        </Grid>

        <Grid id="main" title="Начинки">
          {items
            .filter((item) => item.type == "main")
            .map((item, index) => (
              <Ingredient
                key={item._id}
                item={item}
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
  setModal: PropTypes.func.isRequired,
  setModalActive: PropTypes.func.isRequired,
};
export default BurgerIngredients;
