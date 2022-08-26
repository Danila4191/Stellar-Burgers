import styles from "./ingredient-info.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const IngredientInfo = () => {
  const item = useSelector((state) => state.ingredient.data);
  const items = useSelector((state) => state.ingredients.productData);

  let { id } = useParams();
  let navItem = undefined

  useEffect(() => {
    navItem = items.filter((item) => item._id === id);
    let itemsNew = Array.from(navItem);
    navItem =  itemsNew[0]
    if (navItem !== undefined ){
    }
  }, [items]);

  return item !== null || (navItem !== undefined) ? (
    <div className={styles.ingredient_info}>
      <h1 className="text text_type_main-large ">Детали ингредиента</h1>
      <img
        className={`${styles.image} pr-4 pl-4 pb-1`}
        src={item !== null ? item.image : navItem.image}
        alt={item !== null ? item.name : navItem.name}
      />
      <h2 className="text text_type_main-medium pt-4 pb-8">
        {item !== null ? item.name : navItem.name}
      </h2>
      <div className={`${styles.grid__container} pb-5`}>
        <ul className={`${styles.grid} pb-5`}>
          <li>
            <p className="text text_type_main-small">Калории, ккал</p>
            <p className="text text_type_digits-default">
              {item !== null
                ? item.calories
                : navItem.calories}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small">Белки, г</p>
            <p className="text text_type_digits-default">
              {item !== null
                ? item.proteins
                : navItem.proteins}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small">Жиры, г</p>
            <p className="text text_type_digits-default">
              {item !== null ? item.fat : navItem.fat}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small">Углеводы, г</p>
            <p className="text text_type_digits-default">
              {item !== null
                ? item.carbohydrates
                : navItem.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
};

export default IngredientInfo;
