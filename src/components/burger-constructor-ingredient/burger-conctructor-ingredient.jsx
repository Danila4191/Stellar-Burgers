import PropTypes from "prop-types";
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-conctructor-ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { useDrop, useDrag } from "react-dnd";
import { isMobileContext } from "../../services/context/appContext";
import SwipeToDelete from "react-swipe-to-delete-component";
import "react-swipe-to-delete-component/dist/swipe-to-delete.css";
import {
  DELETE_INGREDIENTS_CONSTRUCTOR,
  SET_TOTAL,
  TOOGLE_INGREDIENTS_CONSTRUCTOR,
} from "../../services/actions/actions";


const IngredientConctructor = ({ ingredient, position }) => {
  const dispatch = useDispatch();
  const { isMobile } = useContext(isMobileContext);
  const ingredientsConstructor = useSelector(
    (state) => state.ingredientsConstructor.items
  );

  const [{ isCanDrag, isDrag, isTypeDrag }, constructorDragRef] = useDrag({
    type: "new",
    item: ingredient,
    collect: (monitor) => ({
      isTypeDrag: monitor.getItemType(),
      isDrag: monitor.isDragging(),
      isCanDrag: monitor.canDrag(),
    }),
  });

  const [{ isItem, isOverItem }, constructorToggle] = useDrop({
    accept: "new",
    hover() {
      move();
    },
    drop() {
      move();
    },
    collect: (monitor) => ({
      isItem: monitor.getItem(),
      isOverItem: monitor.isOver(),
    }),
  });

  function itemsDelete(ingredient) {
    let itemsNew = Array.from(ingredientsConstructor);

    if (ingredient.type !== "bun") {
      let itemDelete = itemsNew.indexOf(ingredient);
      itemsNew.splice(itemDelete, 1);
    } else {
      itemsNew = ingredientsConstructor.filter(
        (ingredient) => ingredient.type !== "bun"
      );
    }

    let summ = itemsNew.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    dispatch({ type: SET_TOTAL, payload: summ });
    dispatch({ type: DELETE_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
  }

  function move() {
    let itemsNew = Array.from(ingredientsConstructor);
    let newItem = itemsNew.indexOf(isItem); // держу в руке
    let oldItem = itemsNew.indexOf(ingredient); // снизу
    itemsNew.splice(oldItem, 1, isItem);
    itemsNew.splice(newItem, 1, ingredient);
    dispatch({ type: TOOGLE_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
  }


  return (
    <div>
      {!isMobile ? (
        <div
          ref={
            ingredient.type !== "bun"
              ? isTypeDrag == "new"
                ? constructorToggle
                : constructorDragRef
              : null
          }
          className={ingredient.type !== "bun" ? `${styles.item}  ` : undefined}
          style={isOverItem ? { opacity: "0" } : undefined}
        >
          {ingredient.type !== "bun" && !isMobile && <DragIcon />}
          <ConstructorElement
            handleClose={() => itemsDelete(ingredient)}
            type={position}
            isLocked={ingredient.type === "bun" ? true : false}
            text={
              position === "bottom"
                ? `${ingredient.name} (низ)`
                : position === "top"
                ? `${ingredient.name} (верх)`
                : ingredient.name
            }
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </div>
      ) : (

        <SwipeToDelete
          background={
            <div
              className={`${
                 styles.draging  
              } ${styles.draging_active}`}
            >
             <DeleteIcon />
            </div>
          }
          onDelete={() => itemsDelete(ingredient)}
        >
          <div
            ref={
              ingredient.type !== "bun"
                ? isTypeDrag == "new"
                  ? constructorToggle
                  : constructorDragRef
                : null
            }
            className={
              ingredient.type !== "bun" || isMobile
                ? `${styles.item}  `
                : undefined
            }
            style={isOverItem ? { opacity: "1" } : undefined}
          >
            {isMobile && <DragIcon />}

            <div className={`${styles.constructor__element}  `}>
              <div className={`${styles.constructor__element__container}  `}>
                <div
                  className={`${styles.constructor__element__img__container}`}
                >
                  <div className={`${styles.image__container__flex}`}>
                    <div
                      style={{
                        backgroundImage: `url(${ingredient.image_mobile})`,
                      }}
                      className={`${styles.constructor__element__img}  `}
                    ></div>
                  </div>
                </div>
                <p
                  className={` ${styles.constructor__element__title} text text_type_main-small pt-4 pt-4 pb-4`}
                >
                  {ingredient.name}
                </p>
                <p className={`text text_type_digits-default pt-4`}>
                  {ingredient.price}
                </p>
                <div className={` pt-4`}>
                  <CurrencyIcon />
                </div>
              </div>
            </div>
          </div>
        </SwipeToDelete>










      )}
    </div>
  );
};
IngredientConctructor.propTypes = {
  ingredient: PropTypes.object.isRequired,
  position: PropTypes.string,
};

export default IngredientConctructor;
