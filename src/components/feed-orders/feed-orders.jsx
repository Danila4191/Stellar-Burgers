import styles from "./feed-orders.module.css";
import FeedOrder from "../feed-order/feed-order";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Data from "../../utils/data";
import { useEffect } from "react";
const FeedOrders = ({
  setOnCloseFunc,
  setModalActive,
  setModal,
  modalActive,
  orders,
}) => {
 
  const ingredientsFromSetver = useSelector( (state) => state.ingredients.productData);
  /*
  function getArr(first, second) {
    return first.reduce((acc, item) => {
      const val = second.find((el) => el._id === item);
      return val ? [...acc, val] : acc;
      // return val ? [...acc, undefined] : acc; // на случай, если надо вернуть undefined
    }, []);
  }
let price = 0
  useEffect(() => {
    if (ingredientsFromSetver !== null) {
      price =  orders.orders
      .forEach((item) => getArr(item.ingredients, ingredientsFromSetver))
      .reduce(
        /////////////исправить
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      )
      console.log(price)
    }
  }, [ingredientsFromSetver]);
  //console.log(orders.orders.map((order) => (console.log(order))))
  */
  return  (
    <div className={`${styles.feed__orders}  `}>
      {orders.orders.map((order) => (
        <FeedOrder
          price={order.ingredients.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0
          )
          }
          key={uuidv4()}
          time={order.createdAt}
          items={ order.ingredients}
         // items={orders.orders.forEach((item) =>
         //  getArr(item.ingredients, ingredientsFromSetver)
         // )}
          status={order.status}
          orderId={order.number}
          title={ "Death Star Starship Main бургер" //order.title
          }
          setOnCloseFunc={setOnCloseFunc}
          setModalActive={setModalActive}
          setModal={setModal}
          modalActive={modalActive}
        />
      ))}
    </div>
  ) ;
};
export default FeedOrders;
