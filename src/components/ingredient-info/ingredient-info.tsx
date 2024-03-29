import styles from "./ingredient-info.module.css";
import { useParams } from "react-router-dom";
import { IingredientObjectProps } from "../../services/types/types";
import { useSelectorTyped } from "../../services/types/types";
const IngredientInfo = () => {

  const item = useSelectorTyped((state) => state.ingredient.data);

  const items = useSelectorTyped((state) => state.ingredients.productData);
  let { id } = useParams();
  let navItem = undefined

  let itemNew:IingredientObjectProps = Array.from(items.filter((item:IingredientObjectProps) => item._id === id))[0];
  navItem =  itemNew

      
  return item !== null || (navItem !== undefined) ? (
    <div className={styles.ingredient_info}>
      <h1 className="text text_type_main-large ">Детали ингредиента</h1>
      <img
        className={`${styles.image} pr-4 pl-4 pb-1`}
        src={item !== null ? item.image : ((navItem !== undefined) ? navItem.image : undefined)}
        alt={item !== null ? item.name : ((navItem !== undefined) ? navItem.name : undefined)}
      />
      <h2 className="text text_type_main-medium pt-4 pb-8">
        
        {
        item !== null ? item.name : ((navItem !== undefined) ? navItem.name : null)}
      </h2>
      <div className={`${styles.grid__container} pb-5`}>
        <ul className={`${styles.grid} pb-5`}>
          <li>
            <p className="text text_type_main-small">Калории, ккал</p>
            <p className="text text_type_digits-default">
              {
           
               item !== null? item.calories : ((navItem !== undefined) ? navItem.calories : null)}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small">Белки, г</p>
            <p className="text text_type_digits-default">
              {
           
               item !== null  ? item.proteins : ((navItem !== undefined) ? navItem.proteins : null)}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small">Жиры, г</p>
            <p className="text text_type_digits-default">
              
              {
              item !== null ? item.fat : ((navItem !== undefined) ? navItem.fat : null)}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small">Углеводы, г</p>
            <p className="text text_type_digits-default">
              {
             
              item !== null ? item.carbohydrates : ((navItem !== undefined) ? navItem.carbohydrates : null)}
            </p>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
};

export default IngredientInfo;
