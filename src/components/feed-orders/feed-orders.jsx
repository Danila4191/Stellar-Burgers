import styles from "./feed-orders.module.css";
import FeedOrder from "../feed-order/feed-order";
import { v4 as uuidv4 } from "uuid";
const FeedOrders = (props) => {
  return (
    <div className={`${styles.feed__orders}  `}>
      {props.orders.map((order) => (
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
        />
      ))}
    </div>
  );
};
export default FeedOrders;
