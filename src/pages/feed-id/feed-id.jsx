import styles from "./feed-id.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import orders from "../../utils/orders";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect } from "react";
import { isMobileContext } from "../../services/context/appContext";
const FeedIdElement = ({ title, count, price, img }) => {
  const { isMobile } = useContext(isMobileContext);
  return (
    <div className={`${styles.feed__order__ingredient} `}>
      <div className={`${styles.feed__image__container} `}>
        <div className={`${styles.feed__image__container__flex} `}>
          <div
            className={`${styles.feed__image} `}
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
        </div>
      </div>
      <p
        className={`${styles.element__title}   ${
          !isMobile ? "pl-20" : "pl-10"
        } text_type_main-default`}
      >
        {title}
      </p>

      <div className={`${styles.feed__price} text pl-2`}>
        <p className={`text pr-2 text_type_digits-default`}>{count}x</p>
        <p className={`text pr-2 text_type_digits-default`}>{price}</p>
        <CurrencyIcon />
      </div>
    </div>
  );
};

const FeedId = ({ modalActive }) => {
  const { isMobile } = useContext(isMobileContext);
  const params = useParams(); ///////////////////// поченить
  let id = null;
  let order = null;
  let uniqueIngredient = null;

  //console.log(params.id !== undefined);

  useEffect(() => {
    let orderItem2 = null
    if (params.id !== undefined) {
      let orderItem;
      id = params.id;
      orderItem = orders.filter((item) => item.orderId == id);
      uniqueIngredient = orderItem[0].items.reduce(
        (r, i) =>
          !r.some((j) => JSON.stringify(i) === JSON.stringify(j))
            ? [...r, i]
            : r,
        []
      );
      orderItem2 = orderItem
      //console.log(orderItem)
    }
    order = orderItem2
  //  console.log(orderItem2)
  }, [params]);

  console.log(order);
  return order !== null ? (
    <div className={`${styles.feed__order} ${isMobile && "pl-2"} `}>
      <div
        className={`${styles.feed__order__container} ${
          isMobile ? "pt-4" : "pt-25"
        }  text_type_digits-default`}
      >
        <p className={`${styles.feed__number} text`}>#{order[0].orderId}</p>
        <h1 className={` text  pt-10 text_type_main-medium`}>
          {order[0].title}
        </h1>

        <p
          className={` ${
            order[0].status === "ready" && styles.color
          } text pt-3 text_type_main-small`}
        >
          {order[0].status}
        </p>
        <p
          className={` text ${
            isMobile ? "pt-4" : "pt-15"
          }  text_type_main-medium`}
        >
          Состав:
        </p>
        <div className={`${styles.feed__list} ${!isMobile && "pt-6 pr-6"}`}>
          {uniqueIngredient.map((item) => (
            <FeedIdElement
              key={uuidv4()}
              title={item.name}
              price={
                item.price *
                order[0].items.filter(
                  (ingredient) => ingredient._id == item._id
                ).length
              }
              img={item.image_mobile}
              count={
                order[0].items.filter(
                  (ingredient) => ingredient._id == item._id
                ).length
              }
            />
          ))}
        </div>
        <div className={`${styles.feed__data__container} `}>
          <p
            className={`${styles.time} text pl-2 ${
              isMobile ? "text_type_main-small " : "text_type_main-default"
            } text_color_inactive`}
          >
            {order[0].time}
          </p>
          <div className={`${styles.feed__price__total} pr-2`}>
            <p className={`text pr-2 text_type_digits-default`}>
              {order[0].items.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price,
                0
              )}
            </p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default FeedId;
