import styles from "./feed.module.css";
import FeedOrders from "../../components/feed-orders/feed-orders";
import { v4 as uuidv4 } from "uuid";
import { isMobileContext } from "../../services/context/appContext";
import { useState, useEffect, useContext } from "react";

const Feed = ({
  orders,
  setModalActive,
  setModal,
  setOnCloseFunc,
  modalActive,
}) => {
  const [current, setCurrent] = useState("orders");
  const { isMobile } = useContext(isMobileContext);

  let orderDone = orders.orders.filter((item) => item.status == "done");
  let orderCreated = orders.orders.filter((item) => item.status == "created");
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
              <FeedOrders
                setOnCloseFunc={setOnCloseFunc}
                setModalActive={setModalActive}
                setModal={setModal}
                modalActive={modalActive}
                orders={orders.orders}
              />
            </div>
          </div>
        )}
        {(current === "status" || !isMobile) && (
          <div className={`${styles.feed} `}>
            <div className={`${styles.grid} `}>
              <div>
                <p className={`text text_type_main-medium pb-5`}>Готовы:</p>
                <div className={`${styles.flex}`}>
                  <ul
                    className={`${styles.list} ${
                      orderDone.length > 10 ? styles.list_two : null
                    }  text_type_digits-default`}
                  >
                    {orderDone.slice(0, 10).map((item) => (
                      <li className={`${styles.flex} `} key={uuidv4()}>
                        {item.number}
                      </li>
                    ))}
                  </ul>
                  {orderDone.length > 10 && !isMobile ? (
                    <ul
                      className={`${styles.list} ${styles.list_two}  text_type_digits-default`}
                    >
                      {orderDone.slice(10, 20).map((item) => (
                        <li className={`${styles.flex} `} key={uuidv4()}>
                          {item.number}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
              <div>
                <p className={`text text_type_main-medium pb-5`}>В работе:</p>
                <div className={`${styles.flex}`}>
                  <ul
                    className={`${styles.list} ${
                      orderDone.length > 10 ? styles.list_two : null
                    } text_type_digits-default`}
                  >
                    {orderCreated.slice(0, 10).map((item) => (
                      <li key={uuidv4()}>{item.number}</li>
                    ))}
                  </ul>
                  {orderCreated > 10 ? (
                    <ul
                      className={`${styles.list} ${styles.list_two} text_type_digits-default`}
                    >
                      {orderCreated.slice(10, 20).map((item) => (
                        <li key={uuidv4()}>{item.number}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <h2 className={`text text_type_main-medium`}>
                Выполнено за все время:
              </h2>
              <p className={`   ${styles.count} text text_type_digits-large`}>
                {orders.total}
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
                {orders.totalToday}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default Feed;
