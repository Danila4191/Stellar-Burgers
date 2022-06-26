import React from "react";
import ReactDom from "react-dom";
import PropTypes from 'prop-types';
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Constructor.module.css";

const Item = ({ text, type, ingType, thumbnail, price, id }) => {
  return (
    <div className={ingType === "bun" ? `pl-8` : styles.Item}>
      {ingType !== "bun" && <DragIcon />}
      <ConstructorElement
        type={type}
        isLocked={ingType === "bun" ? true : false}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
    </div>
  );
};
Item.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

class BurgerConstructor extends React.Component {
  render() {
    return (
      <div className={styles.BurgerConstructor}>
        <div className={`${styles.BurgerList} mt-25 mb-10 pl-4 `}>
       <div className={`${styles.EmpyBun} ${styles.EmpyBun_top} ml-8 `}></div>
          <div className={`${styles.BurgerListScroll}  pr-4 `}>
        
          </div>
          <div className={`${styles.EmpyBun} ${styles.EmpyBun_botton} ml-8`}></div>
        </div>
        <div className={`${styles.Order}`}>
          <div className={`${styles.Total}`}>
            <p
              className={`${styles.Total__Count} pr-2  text_type_digits-medium`}
            >
              0
            </p>
            <CurrencyIcon />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;
