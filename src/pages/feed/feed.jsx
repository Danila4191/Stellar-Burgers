import styles from "./feed.module.css";
import FeedOrders from "../../components/feed-orders/feed-orders";
import { v4 as uuidv4 } from "uuid";
import { isMobileContext } from "../../services/context/appContext";
import { useState, useEffect, useContext } from "react";
//import { useDispatch, useSelector } from "react-redux";

//import { getFeedOrders } from "../../services/actions/actions";
/*
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);*/

const Feed = ({ orders }) => {
  let ordersReady = orders.filter((item) => item.status == "ready");
  let newOrders = orders.map((item) => ({
    orderId: item.orderId,
    userId: item.userId,
    title: item.title,
    time: item.time,
    items: item.items,
  }));
  const [current, setCurrent] = useState("orders");
  const { isMobile } = useContext(isMobileContext);

  return (
    <div className={` ${styles.feed__container} `}>
      <h1
        className={` ${styles.title} pl-5 mt-10 ${
          isMobile ? "mb-2" : "mb-10"
        } text_type_main-large`}
      >
        Лента заказов
      </h1>

      {isMobile && (
        <div className={`${styles.scrollbar} pb-4`}>
          <div
            className={`${styles.line} ${
              current === "orders" && styles.line_active
            } pb-4 pt-4`}
          >
            <p
              onClick={() => setCurrent("orders")}
              className={`${styles.tab__button} text text_type_main-small`}
            >
              Заказы
            </p>
          </div>
          <div
            className={`${styles.line} ${
              current === "status" && styles.line_active
            } pb-4 pt-4`}
          >
            <p
              onClick={() => setCurrent("status")}
              className={`${styles.tab__button}  text text_type_main-small`}
            >
              Статистика
            </p>
          </div>
        </div>
      )}

      <main className={styles.main}>
        {(current === "orders" || !isMobile) && (
          <div>
            <div className={styles.feed__list__container}>
              <FeedOrders orders={newOrders} />
            </div>
          </div>
        )}
        {(current === "status" || !isMobile) && (
          <div className={`${styles.feed} `}>
            <div className={`${styles.grid} `}>
              <div>
                <p className={`text text_type_main-medium pb-5`}>Готовы:</p>
                <ul className={`${styles.list}  text_type_digits-default`}>
                  {orders
                    .filter((item) => item.status == "ready")
                    .map((item) => (
                      <li key={uuidv4()}>{item.orderId}</li>
                    ))}
                </ul>
              </div>
              <div>
                <p className={`text text_type_main-medium pb-5`}>В работе:</p>
                <ul className={`${styles.list} text_type_digits-default`}>
                  {orders
                    .filter((item) => item.status == "noready")
                    .map((item) => (
                      <li key={uuidv4()}>{item.orderId}</li>
                    ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className={`text text_type_main-medium`}>
                Выполнено за все время:
              </h2>
              <p className={`   ${styles.count} text text_type_digits-large`}>
                {ordersReady.length}
              </p>
            </div>
            <div>
              <h2
                className={`
            text
           text_type_main-medium`}
              >
                Выполнено за сегодня:
              </h2>
              <p
                className={`
            ${styles.count} text
           text_type_digits-large`}
              >
                {
                  ordersReady.filter((data) => !~data.time.indexOf("Cегодня,"))
                    .length
                }
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Feed;
