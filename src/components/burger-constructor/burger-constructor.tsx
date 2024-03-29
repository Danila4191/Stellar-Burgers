//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import OrderInfo from "../order-info/order-info";
import { useContext,FC } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { isMobileContext } from "../../services/context/appContext";
import { useNavigate } from "react-router-dom";
import {
  DELETE_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_CONSTRUCTOR,
  SET_TOTAL,
  getOrderNumber,
} from "../../services/actions/ingredientsActions/ingredientsActions";
import IngredientConctructor from "../burger-constructor-ingredient/burger-conctructor-ingredient";
import { useSelectorTyped, IBurgerConstructorProps, IingredientObjectProps, useDispatchTyped} from "../../services/types/types";
const BurgerConstructor:FC<IBurgerConstructorProps> = ({
  setModalActive,
  setModal,
  setOnCloseFunc,
  pageChange,
}) => {
  const dispatch = useDispatchTyped();
  const ingredientsConstructor:IingredientObjectProps[] = useSelectorTyped(
    (state) => state.ingredientsConstructor.items
  );
  const total = useSelectorTyped((state) => state.total.total);
  const { loading, failed } = useSelectorTyped((state) => state.order);
  const { isMobile } = useContext(isMobileContext);
  const [{ isHoverMain, isTypeMain }, dropTargetMain] = useDrop({
    accept: "main",
    drop(item:IingredientObjectProps) {
      let itemsNew = Array.from(ingredientsConstructor);
     
      item.idKey = uuidv4();
      let itemCopy = Object.assign({}, item);
      itemsNew.push(itemCopy);
      let summ = itemsNew.reduce(
        (accumulator:number, currentValue:IingredientObjectProps) => accumulator + currentValue.price,
        0
      );
      dispatch({ type: SET_TOTAL, payload: summ });
      dispatch({ type: ADD_INGREDIENTS_CONSTRUCTOR, payload: itemsNew });
    },

    collect: (monitor) => ({
      isHoverMain: monitor.isOver(),
      isTypeMain: monitor.getItemType(),
    }),
  });

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

  const [{ isHover, isHoverBun }, dropTargetBun] = useDrop({
    accept: "bun",
    drop(item:IingredientObjectProps) {
      if (ingredientsConstructor.some((item:IingredientObjectProps) => item.type == "bun")) {
        let itemsNew = Array.from(ingredientsConstructor).filter(
          (item) => item.type !== "bun"
        );
        addBun(itemsNew, item);
      } else {
        let itemsNew = Array.from(ingredientsConstructor);
        addBun(itemsNew, item);
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isHoverBun: monitor.getItemType(),
    }),
  });
  let navigate = useNavigate();
  const  user = useSelectorTyped((state) => state.User);
  const close = () => {
    dispatch({ type: SET_TOTAL, payload: 0 });
    dispatch({ type: DELETE_INGREDIENTS_CONSTRUCTOR, payload: [] });
    setModalActive(false);
  };
  
  function openModal() {
    if(user.userData !== null){
    dispatch(
      getOrderNumber({
        ingredients: ingredientsConstructor.map((item:IingredientObjectProps) => `${item._id}`),
      })
    );
    setTimeout(() => {
      if (loading == false && failed == false) {
        setModal(<OrderInfo />);
        setOnCloseFunc(() => close);
        setModalActive(true);
      }
    }, 200);} else {
      navigate("/Login");
    }
  }

  return (
    <div className={styles.burger__constructor}>
      {!isMobile ? (
        <div
          ref={dropTargetBun}
          className={`${styles.burger__list} mt-25 mb-10  `}
        >
          <div
            className={`${styles.empy} ${styles.empy_top} ${
              isHover && isHoverBun == "bun" ? styles.empy_active : undefined
            }`}
          >
            {" "}
            {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun")
              .length > 0 ? (
              <IngredientConctructor
                ingredient={
                  ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun")[0]
                }
                position="top"
              />
            ) : null}
          </div>

          <div
            ref={dropTargetMain}
            className={`${styles.burger__list__scroll}   `}
          >
            {ingredientsConstructor.length == 0
              ? null
              : ingredientsConstructor
                  .filter((item:IingredientObjectProps) => item.type !== "bun")
                  .map((item:IingredientObjectProps, index:number) => (
                    <IngredientConctructor ingredient={item} key={item.idKey} />
                  ))}

            {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type !== "bun")
              .length > 0 ? null : (
              <div
                className={`${styles.empy} ${styles.empy__main} ${
                  isHoverMain && isTypeMain !== "bun"
                    ? styles.empy_active
                    : undefined
                }`}
              ></div>
            )}
            {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type !== "bun")
              .length > 1 ? null : (
              <div
                className={`${styles.empy} ${styles.empy__main} ${
                  isHoverMain && isTypeMain !== "bun"
                    ? styles.empy_active
                    : undefined
                }`}
              ></div>
            )}
            {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type !== "bun")
              .length > 2 ? null : (
              <div
                className={`${styles.empy} ${styles.empy__main} ${
                  isHoverMain && isTypeMain !== "bun"
                    ? styles.empy_active
                    : undefined
                }`}
              ></div>
            )}
            {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type !== "bun")
              .length > 3 ? null : (
              <div
                className={`${styles.empy} ${styles.empy__main} ${
                  isHoverMain && isTypeMain !== "bun"
                    ? styles.empy_active
                    : undefined
                }`}
              ></div>
            )}
            {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type !== "bun")
              .length > 4 ? null : (
              <div
                className={`${styles.empy} ${styles.empy__main} ${
                  isHoverMain && isTypeMain !== "bun"
                    ? styles.empy_active
                    : undefined
                }`}
              ></div>
            )}
          </div>

          <div
            className={`${styles.empy} ${styles.empy_botton} ${
              isHover && isHoverBun == "bun" ? styles.empy_active : undefined
            }`}
          >
            {" "}
            {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun")
              .length > 0 ? (
              <IngredientConctructor
                ingredient={
                  ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun")[0]
                }
                position="bottom"
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className={`${styles.modile__list}`}>
          {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun").length >
          0 ? (
            <IngredientConctructor
              ingredient={
                ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun")[0]
              }
            />
          ) : null}
          {ingredientsConstructor.length == 0
            ? null
            : ingredientsConstructor
                .filter((item:IingredientObjectProps) => item.type !== "bun")
                .map((item:IingredientObjectProps, index:number) => (
                  <IngredientConctructor ingredient={item} key={item.idKey} />
                ))}
          {ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun").length >
          0 ? (
            <IngredientConctructor
              ingredient={
                ingredientsConstructor.filter((item:IingredientObjectProps) => item.type == "bun")[0]
              }
            />
          ) : null}
        </div>
      )}
      <div className={`${styles.order}`}>
        <div className={`${styles.total__container}`}>
          <p
            className={`${styles.total} pr-2 
          ${
            isMobile ? "text_type_digits-default" : "text_type_digits-medium"
          } `}
          >
            {total}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button
          disabled={
            !ingredientsConstructor.some((item:IingredientObjectProps) => item.type == "bun")
              ? true
              : false
          }
          onClick={openModal 
            }
          type="primary"
          size={isMobile ? "small" : "large"}
        >
          <p className={` text text_type_main-small `}>
            {" "}
            {loading ? "Wait..." : "Оформить заказ"}{" "}
          </p>
        </Button>
      </div>
      {isMobile && (
        <div className={`${styles.scrollbar__constructor}`}>
          <div className={`${styles.scrollbar__container__constructor}`}>
            <h2 className={`pl-10 text text_type_main-large `}>Заказ</h2>
            <button
              onClick={pageChange
            }
              className={` ${styles.button__close} pr-8`}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerConstructor;
