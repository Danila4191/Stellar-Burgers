import styles from "./feed-orders.module.css";
import FeedOrder from "../feed-order/feed-order";
import { v4 as uuidv4 } from "uuid";
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
          key={uuidv4()}
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
