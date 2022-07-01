import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import OrderInfo from "../order-info/order-info";
import IngredientType from "../../utils/types";
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Constructor.module.css";

const Item = ({ item, position }) => {
  return (
    <div className={item.type === "bun" ? `` : `${styles.Item} pr-5`}>
      {item.type !== "bun" && <DragIcon />}
        <ConstructorElement
          type={position}
          isLocked={item.type === "bun" ? true : false}
          text={item.name}
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

const BurgerConstructor = ({ data, setModalActive, setModal }) => {
  function openModal() {
    setModal(<OrderInfo />);
    setModalActive(true);
  }
 
  return (
    <div className={styles.BurgerConstructor}>
      <div className={`${styles.BurgerList} mt-25 mb-10 pl-4 `}>
        <div className={`${styles.EmpyBun} ${styles.EmpyBun_top} `}>
          <Item item={data[0]} position="top" />
        </div>
        <div className={`${styles.BurgerListScroll}  pr-8 `}>
          <Item item={data[3]} />
          <Item item={data[5]} />
          <Item item={data[7]} />
          <Item item={data[7]} />
          <Item item={data[7]} />
          <Item item={data[7]} />
          <Item item={data[7]} />
          <Item item={data[7]} />
          <Item item={data[7]} />
          <Item item={data[7]} />
        </div>
        <div className={`${styles.EmpyBun} ${styles.EmpyBun_botton} `}>
          <Item item={data[0]} position="bottom" />
        </div>
      </div>
      <div className={`${styles.Order}`}>
        <div className={`${styles.Total}`}>
          <p className={`${styles.Total__Count} pr-2  text_type_digits-medium`}>
            0
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
  data: PropTypes.array.isRequired,
  setModal: PropTypes.func.isRequired,
  setModalActive: PropTypes.func.isRequired,
};
export default BurgerConstructor;
