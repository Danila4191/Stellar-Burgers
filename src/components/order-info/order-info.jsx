import styles from "./order-info.module.css";
import {  useSelector } from "react-redux";
import { wait } from "@testing-library/user-event/dist/utils";
const OrderInfo = () => {
  const orderNumber = useSelector(state => state.order.data);
  return (
    <div className={styles.order_info}>
      <h1 className={`${styles.title} text text_type_digits-large pt-15 pb-8`}>{orderNumber !== "" ? orderNumber : "wait..."}</h1>
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
