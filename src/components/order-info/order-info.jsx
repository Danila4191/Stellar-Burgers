import React, { useState } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./order-info.module.css";
const OrderInfo = ({orderNumber}) => {
  return (
    <div className={styles.orderInfo}>
      <h1 className={`${styles.title} text text_type_digits-large pt-15 pb-8`}>{orderNumber}</h1>
      <h2 className="text text_type_main-medium pb-15">идентификатор заказа</h2>
      <div className={`${styles.icon} `}></div>
      <p className={` text text_type_main-small`}>Ваш заказ начали готовить</p>
      <p className={` ${styles.color} text text_type_main-small pt-2 pb-20`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
export default OrderInfo;
OrderInfo.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};