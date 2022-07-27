import React, { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import OrderInfo from "../order-info/order-info";
import { IngredientContext } from "../../services/context/appContext";
import { apiOrder } from "../../services/api/api";
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Constructor.module.css";
import { isMetaProperty } from "typescript";
import { useDispatch, useSelector } from "react-redux";
//import { useDrop } from "react-dnd";
const Item = ({ item, position }) => {
  return (
    <div className={item.type === "bun" ? `` : `${styles.Item} pr-5`}>
      {item.type !== "bun" && <DragIcon />}
      <ConstructorElement
        type={position}
        isLocked={item.type === "bun" ? true : false}
        text={
          position === "bottom"
            ? `${item.name} (низ)`
            : position === "top"
            ? `${item.name} (верх)`
            : item.name
        }
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
};
Item.propTypes = {
  item: PropTypes.object.isRequired,
  position: PropTypes.string,
};

const BurgerConstructor = ({ setModalActive, setModal }) => {
  const [orderTotal, setTotal] = useState(0);
  const items = useSelector((state) => state.ingredients.productData);
/*
  const [, dropTarget] = useDrop({
    accept: "main" | "souse",
    drop(item) {
      orderElements.push(item);

    },});
*/
/*
  const [, dropTarget] = useDrop({
    accept: "bun",
    drop(item) {
      orderElements.push(item);
      orderElements.push(item)
    },});
*/

  const isdrag = true;
  const type = "main";

  let orderElements = [
    items[3],
    items[7],
    items[5],
    items[0],
    items[5],
    items[5],
    items[5],
    items[5],
  ];
  let main = orderElements.filter((item) => item.type !== "bun");
  let bun = orderElements.filter((item) => item.type == "bun");

  const dispatch = useDispatch();

  function openModal() {
    apiOrder({ ingredients: orderElements.map((item) => `${item._id}`) })
      .then((dataFromServer) => {
        dispatch({ type: "GET_ORDER", payload: dataFromServer.order.number });
        setModal(<OrderInfo />);
        setModalActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    let summ = orderElements.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    setTotal(summ);
  }, []);

  return (
    <div className={styles.BurgerConstructor}>
      <div className={`${styles.BurgerList} mt-25 mb-10 pl-4 `}>
        <div 
          //    ref = {(bun.length < 2 ) ?  {dropTarget} : null} 
          className={`${styles.EmpyBun} ${styles.EmpyBun_top} ${
            isdrag && type == "bun" && styles.EmpyBun_active
          }`}
        >
          {" "}
          {bun.length > 0 ? <Item item={bun[0]} position="top" /> : null}
        </div>

        <div
         // ref={dropTarget} 
         className={`${styles.BurgerListScroll}  pr-8 `}>
          {main
            .filter((item) => item.type !== "bun")
            .map((item, index) => (
              <Item item={item} key={item._id} />
            ))}

          {main.length > 0 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isdrag && type !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {main.length > 1 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isdrag && type !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {main.length > 2 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isdrag && type !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {main.length > 3 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isdrag && type !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
          {main.length > 4 ? null : (
            <div
              className={`${styles.EmpyBun} ${styles.EmpyBun_main} ${
                isdrag && type !== "bun" && styles.EmpyBun_active
              }`}
            ></div>
          )}
        </div>

        <div
        //  ref = {(bun.length < 2 ) ?  {dropTarget} : null} 
          className={`${styles.EmpyBun} ${styles.EmpyBun_botton} ${
            isdrag && type == "bun" && styles.EmpyBun_active
          }`}
        >
          {" "}
          {bun.length > 0 ? <Item item={bun[0]} position="bottom" /> : null}
        </div>
      </div>

      <div className={`${styles.Order}`}>
        <div className={`${styles.Total}`}>
          <p className={`${styles.Total__Count} pr-2  text_type_digits-medium`}>
            {orderTotal}
          </p>
          <CurrencyIcon />
        </div>
        <Button onClick={openModal} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
BurgerConstructor.propTypes = {
  setModal: PropTypes.func.isRequired,
  setModalActive: PropTypes.func.isRequired,
};
export default BurgerConstructor;
