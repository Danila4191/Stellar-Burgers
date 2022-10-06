import styles from "./feed-id.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams, useLocation } from "react-router-dom";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { isMobileContext } from "../../services/context/appContext";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED, WS_GET_MESSAGE,WS_GET_MESSAGE_PROFILE } from "../../services/actions/soketAction/soketAction";
import { getCookie } from "../../utils/cookie/cookie";
import Loader from "../../components/loader/loader";
import { useSelectorTyped } from "../../services/types/types";
import React, {  FC } from "react";
import { FeedIdElementProps, FeedIdProps, ingredientObjectProps } from "../../services/types/types";
const FeedIdElement:FC<FeedIdElementProps> = ({ title, count, price, img }) => {

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
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

const FeedId:FC<FeedIdProps> = ({ orderId, modalActive }) => {

  const orders = useSelectorTyped((state) => state.ws.messagesAllOrders);
 
  const ordersUser = useSelectorTyped((state) => state.ws.messagesUserOrders);
  
  const { isMobile } = useContext(isMobileContext);
  const ingredientsFromSetver = useSelectorTyped(
    (state) => state.ingredients.productData
  );
  const dispatch = useDispatch();
  let location:any = useLocation();
  let param:any = useParams();
  let order:any = undefined;
  let uniqueIngredient:any = null;
  let orderNew:any = undefined;
  let ingredients:any = null;

  useEffect(() => {
    if( param.id !== undefined &&
      location.pathname.includes("feed") &&
      !modalActive){
        dispatch({
          type: WS_CONNECTION_START,
          payload : {url: "/all", caseNameOnMessage: WS_GET_MESSAGE }
        });
       
      } else if(
        param.id !== undefined &&
        location.pathname.includes("profile/orders") &&
        !modalActive
      ) {
        dispatch({
          type: WS_CONNECTION_START,
          payload: {url: `?token=${getCookie(`token`)}`, caseNameOnMessage: WS_GET_MESSAGE_PROFILE }
        });
      }
    return () => {
      if( param.id !== undefined &&
        !modalActive){
          dispatch({
            type: WS_CONNECTION_CLOSED,
          });
        } 
  
    }
  }, [dispatch])


  function setOrders() {
    if ((orders[0] !== undefined || ordersUser[0] !== undefined) && ingredientsFromSetver !== null ) {
      if(orders[0] !== undefined){
        order = orders[0].orders.filter((order:ingredientObjectProps) => order.number == orderNew)[0];
      } else {
        order = ordersUser[0].orders.filter((order:ingredientObjectProps) => order.number == orderNew)[0];
      }
    
      ingredients = getArr(order.ingredients, ingredientsFromSetver);
      uniqueIngredient = ingredients.reduce(
        (r:any, i:any) =>
          !r.some((j:any) => JSON.stringify(i) === JSON.stringify(j))
            ? [...r, i]
            : r,
        []
      );
    }
  }

  function getArr(first:[], second:[]) {
  
    return first.reduce((acc, item) => {
      const val = second.find((el:ingredientObjectProps) => el._id === item);
      return val ? [...acc, val] : acc;
    
    }, []);
  }

  function orderNewSet() {
    if (orderId !== undefined) {
      orderNew = orderId;
    } else if (param.id !== undefined) {
      orderNew = param.id;
    }
  }
 
  orderNewSet();
  setOrders()

  return order !== undefined && ingredients !== null  ? (
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
          {uniqueIngredient.map((item:ingredientObjectProps) => (
            <FeedIdElement
              key={ item._id}
              title={item.name}
              price={
                item.price *
                ingredients.filter((ingredient:ingredientObjectProps) => ingredient._id == item._id)
                  .length
              }
              img={item.image_mobile}
              count={
                ingredients.filter((ingredient:ingredientObjectProps) => ingredient._id == item._id)
                  .length
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
            {new Date(order.createdAt).toLocaleString("ru", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <div className={`${styles.feed__price__total} pr-2`}>
            <p className={`text pr-2 text_type_digits-default`}>
              {ingredients.reduce(
                (accumulator:number, currentValue:ingredientObjectProps) => accumulator + currentValue.price,
                0
              )}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  ) : <Loader/>;
};
export default FeedId;