import React, { useState } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./ingredient-info.module.css";
import IngredientType from "../../utils/types"
const IngredientInfo = ({
  item
}) => {
  return (
    <div className={styles.ingredientInfo}>
      <h1 className="text text_type_main-large ">Детали ингредиента</h1>
      <img className={`${styles.image} pr-4 pl-4 pb-1`} src={item.image} alt={item.name} />
      <h2 className="text text_type_main-medium pt-4 pb-8">{item.name}</h2>
      <ul className={`${styles.grid} pb-5`}>
        <li>
          <p className="text text_type_main-small">Калории, ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </li>
        <li>
          <p className="text text_type_main-small">Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins}</p>
        </li>
        <li>
          <p className="text text_type_main-small">Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </li>
        <li>
          <p className="text text_type_main-small">Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};
IngredientInfo.propTypes = {
  item:PropTypes.object.isRequired,
}
export default IngredientInfo;
