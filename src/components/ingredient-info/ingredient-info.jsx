import styles from "./ingredient-info.module.css";
import { useSelector } from "react-redux";
const IngredientInfo = () => {
  const item = useSelector((state) => state.ingredient.data);

  return item !== null ? (
    <div className={styles.ingredient_info}>
      <h1 className="text text_type_main-large ">Детали ингредиента</h1>
      <img
        className={`${styles.image} pr-4 pl-4 pb-1`}
        src={item.image}
        alt={item.name}
      />
      <h2 className="text text_type_main-medium pt-4 pb-8">{item.name}</h2>
      <div className={`${styles.grid__container} pb-5`}>
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
            <p className="text text_type_digits-default">
              {item.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
};

export default IngredientInfo;
