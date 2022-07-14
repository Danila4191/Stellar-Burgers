import React, { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import OrderInfo from "../order-info/order-info";
import IngredientType from "../../utils/types";
import { IngredientContext } from "../../services/appContext";
import apiOrder from "../../services/api/api";
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Constructor.module.css";
import { isMetaProperty } from "typescript";

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
  const { state, setState } = useContext(IngredientContext);
  const [orderTotal, setTotal] = useState(0);
  
  let orderElements = [
    state.productData[3],
    state.productData[7],
    state.productData[5],
    state.productData[0],
    state.productData[0],
  ];
  let main = [state.productData[3], state.productData[7], state.productData[5]];
  let bun = [state.productData[0]];

  function openModal() {
    apiOrder({ ingredients: orderElements.map((item) => `${item._id}`) })
      .then((dataFromServer) => {
        setModal(<OrderInfo orderNumber={dataFromServer.order.number} />);
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
        <div className={`${styles.EmpyBun} ${styles.EmpyBun_top} `}>
          {bun.length > 0 ? <Item item={bun[0]} position="top" /> : null}
        </div>
        <div className={`${styles.BurgerListScroll}  pr-8 `}>
          {main
            .filter((item) => item.type !== "bun")
            .map((item, index) => (
              <Item item={item} key={item._id} />
            ))}
        </div>
        <div className={`${styles.EmpyBun} ${styles.EmpyBun_botton} `}>
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
