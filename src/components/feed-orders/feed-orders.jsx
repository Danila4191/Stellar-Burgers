import styles from "./feed-orders.module.css";
import FeedOrder from "../feed-order/feed-order";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

const FeedOrders = ({
  setOnCloseFunc,
  setModalActive,
  setModal,
  modalActive,
  orders,
}) => {
  return (
    <div className={`${styles.feed__orders}  `}>
      {orders.map((order) => (
        <FeedOrder
          price={order.items.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0
          )}
          key={uuidv4()}
          time={order.time}
          orderId={order.orderId}
          title={order.title}
          items={order.items}
          status={order.status}
          order={order}
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
