import styles from "./feed-orders.module.css";
import FeedOrder from "../feed-order/feed-order";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import React, {  FC } from "react";
import { IFeedOrdersProps,IOrderProps } from "../../services/types/types";
const FeedOrders:FC<IFeedOrdersProps> = ({
  setOnCloseFunc,
  setModalActive,
  setModal,
  modalActive,
  orders,
}) => {

  return (
    <div className={`${styles.feed__orders}  `}>
      {
      orders.map((order:IOrderProps) => (
        <FeedOrder
          key={order.createdAt }
          time={order.createdAt}
          orders={order.ingredients}
          status={order.status}
          orderId={order.number}
          title={order.name}
          setOnCloseFunc={setOnCloseFunc}
          setModalActive={setModalActive}
          setModal={setModal}
          modalActive={modalActive}
        />
      ))}
    </div>
  );
};
export default FeedOrders;
