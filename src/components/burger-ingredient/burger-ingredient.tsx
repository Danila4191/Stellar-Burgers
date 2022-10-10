
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectorTyped } from "../../services/types/types";
import styles from "./burger-ingredient.module.css";
import { useNavigate } from "react-router-dom";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { useDrag } from "react-dnd";
import { NavLink, useLocation } from "react-router-dom";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENTS_CONSTRUCTOR,
  SET_TOTAL,
} from "../../services/actions/ingredientsActions/ingredientsActions";
import { useContext, useState,FC  } from "react";
import { isMobileContext } from "../../services/context/appContext";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { IingredientObjectProps, IIngredientProps,useDispatchTyped } from "../../services/types/types";
const BurgerIngredient:FC<IIngredientProps> = ({
  ingredient,
  setModalActive,
  setModal,
  setOnCloseFunc,
  modalActive,
}) => {
  
  const ingredientsConstructor:IingredientObjectProps[] = useSelectorTyped(
    (state) => state.ingredientsConstructor.items
  );
  let count = ingredientsConstructor.filter(
    (ingredientsConstructor:IingredientObjectProps) => ingredient._id == ingredientsConstructor._id
  ).length;
  const [, dragRef] = useDrag({
    type: ingredient.type == "bun" ? "bun" : "main",
    item: ingredient,
  });
  
  const { isMobile } = useContext(isMobileContext);
  const dispatch = useDispatchTyped();
  const ingredientData = useSelectorTyped((state) => state.ingredient.data);
  const location = useLocation();

  let navigate = useNavigate();
  function back() {
    navigate("/");
  }

  function close(e?: React.MouseEvent<HTMLButtonElement>):void {
    setModalActive(false);
    setTimeout(() => {
      if (modalActive == false) {
        dispatch({ type: DELETE_INGREDIENT });
      }
    }, 500);
    back();
  }
  function openModal() {
    if (ingredientData == null) {
      
      dispatch({ type: ADD_INGREDIENT, payload: ingredient });
      setModal(<IngredientInfo />);
      setModalActive(true);
      setOnCloseFunc(() => close);
    }
  }

  function addIngredient() {
    let itemsNew:IingredientObjectProps[] = Array.from(ingredientsConstructor);
    ingredient.idKey = uuidv4();
    let itemCopy:IingredientObjectProps = Object.assign({}, ingredient);
    itemsNew.push(itemCopy);
    let summ:number = itemsNew.reduce(

      (accumulator:number, currentValue:IingredientObjectProps) => accumulator + currentValue.price,
      0
    );
    dispatch({ type: SET_TOTAL, payload: summ });
    dispatch({ type: ADD_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
  }
  function onClickAddBun(
 
    ) {
    function addBun(itemsNew:IingredientObjectProps[], item:IingredientObjectProps) {
      itemsNew.push(item);
      itemsNew.push(item);
      let summ = itemsNew.reduce(
        (accumulator:number, currentValue:IingredientObjectProps) => accumulator + currentValue.price,
        0
      );
      dispatch({ type: SET_TOTAL, payload: summ });
      dispatch({ type: ADD_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
    }
    if (ingredientsConstructor.some((item:IingredientObjectProps) => item.type == "bun")) {
      let itemsNew = Array.from(ingredientsConstructor).filter(
   
        (itemIngredient:any) => itemIngredient.type !== "bun"
      );
      addBun(itemsNew, ingredient);
    } else {
      let itemsNew = Array.from(ingredientsConstructor);
      addBun(itemsNew, ingredient);
    }
  }
  return (
    <div
      ref={!isMobile ? dragRef : undefined}
      onClick={openModal}
      className={styles.item}
    >
      <NavLink
        className={styles.links}
        to={ `/ingredients/${ingredient._id}`}
        state = {{ backgroundLocation: location }}
      >
        <div className={count === 0 ? styles.counter : undefined}>
          <Counter count={count} size={!isMobile ? "default" : "small"} />
        </div>
        <img
          className={`${styles.image} pr-4 pl-4 pb-1`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styles.price} pb-1`}>
          <div className="text text_type_digits-default">
            {ingredient.price}
          </div>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.subtitle} text_type_main-small`}>
          {ingredient.name}
        </h3>
      </NavLink>
      {isMobile && (
        <p
          onClick={(e) => {
            e.stopPropagation();

            {
              ingredient.type == "bun" ? onClickAddBun() : addIngredient();
            }
          }}
          className={`${styles.add} text text_type_main-default`}
        >
          Добавить
        </p>
      )}
    </div>
  );
};

export default BurgerIngredient;
