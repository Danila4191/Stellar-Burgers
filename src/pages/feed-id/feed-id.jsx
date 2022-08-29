import styles from "./feed-id.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import orders from "../../utils/orders";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { isMobileContext } from "../../services/context/appContext";
import FeedOrder from "../../components/feed-order/feed-order";
import { useSelector } from "react-redux";

const FeedIdElement = ({ title, count, price, img }) => {


  const { isMobile } = useContext(isMobileContext);
  return (
    <div className={`${styles.feed__order__ingredient} `}>
      <div className={`${styles.feed__image__container} `}>
        <div className={`${styles.feed__image__container__flex} `}>
          <div
            className={`${styles.feed__image} `}
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
        </div>
      </div>
      <p
        className={`${styles.element__title}   ${
          !isMobile ? "pl-20" : "pl-10"
        } text_type_main-default`}
      >
        {title}
      </p>

      <div className={`${styles.feed__price} text pl-2`}>
        <p className={`text pr-2 text_type_digits-default`}>{count}x</p>
        <p className={`text pr-2 text_type_digits-default`}>{price}</p>
        <CurrencyIcon />
      </div>
    </div>
  );
};

const FeedId = ({ modalActive }) => {
  const { isMobile } = useContext(isMobileContext);
  const ingredientsFromSetver = useSelector(
    (state) => state.ingredients.productData
  );
  let { id } = useParams();
  let order = undefined;
  let uniqueIngredient = null;

  function getArr(first, second) {
    return first.reduce((acc, item) => {
      const val = second.find((el) => el._id === item);
      return val ? [...acc, val] : acc;
      // return val ? [...acc, undefined] : acc; // на случай, если надо вернуть undefined
    }, []);
  }


  let copyThisOrder = Array.from(orders.orders.filter((order) => order.number == id));
  order = copyThisOrder[0];
  
  let ingredients = getArr(order.ingredients, ingredientsFromSetver);

  uniqueIngredient = ingredients.reduce(
    (r, i) =>
      !r.some((j) => JSON.stringify(i) === JSON.stringify(j)) ? [...r, i] : r,
    []
  );

  return order !== undefined ? (
    <div className={`${styles.feed__order} ${isMobile && "pl-2"} `}>
      <div
        className={`${styles.feed__order__container} ${
          isMobile ? "pt-4" : "pt-25"
        }  text_type_digits-default`}
      >
        <p className={`${styles.feed__number} text`}>#{order.number}</p>
        <h1 className={` text  pt-10 text_type_main-medium`}>
          {
            "Death Star Starship Main бургер" //order.title
          }
        </h1>

        <p
          className={` ${
            order.status === "done"
              ? styles.color
              : order.status === "pending" && styles.colorRed
          } text pt-3 text_type_main-small`}
        >
          {order.status === "done"
            ? "Выполнен"
            : order.status === "pending"
            ? "Отменен"
            : "Готовиться"}
        </p>
        <p
          className={` text ${
            isMobile ? "pt-4" : "pt-15"
          }  text_type_main-medium`}
        >
          Состав:
        </p>
        <div className={`${styles.feed__list} ${!isMobile && "pt-6 pr-6"}`}>
          {uniqueIngredient.map((item) => (
            <FeedIdElement
              key={uuidv4()}
              title={item.name}
              price={
                item.price *
                ingredients.filter(
                  (ingredient) => ingredient._id == item._id
                ).length
              }
              img={item.image_mobile}
              count={
                ingredients.filter(
                  (ingredient) => ingredient._id == item._id
                ).length
              }
            />
          ))}
        </div>
        <div className={`${styles.feed__data__container} `}>
          <p
            className={`${styles.time} text pl-2 ${
              isMobile ? "text_type_main-small " : "text_type_main-default"
            } text_color_inactive`}
          >
            {order.createdAt}
          </p>
          <div className={`${styles.feed__price__total} pr-2`}>
            <p className={`text pr-2 text_type_digits-default`}>
              {ingredients.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price,
                0
              )}
            </p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default FeedId;
