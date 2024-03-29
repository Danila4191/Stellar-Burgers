import styles from "./feed-order.module.css";
import { useContext } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { isMobileContext } from "../../services/context/appContext";
import FeedId from "../../pages/feed-id/feed-id";
import { useSelector } from "react-redux";
import React, { FC } from "react";
import {
  IFeedOrderProps,
  useSelectorTyped,IOrderNewProps ,
  IingredientObjectProps,
} from "../../services/types/types";

const FeedOrder: FC<IFeedOrderProps> = ({
  time,
  orderId,
  title,
  orders,
  status,
  setModalActive,
  setModal,
  setOnCloseFunc,
  modalActive,
}) => {
  const ingredientsFromSetver = useSelectorTyped(
    (state) => state.ingredients.productData
  );

  //const ordersLoading = useSelectorTyped((state) => state.ws.loading);

  const { isMobile } = useContext(isMobileContext);
  const location = useLocation();
  let navigate = useNavigate();

  function back() {
    if (location.pathname == "/feed") {
      navigate("/feed");
    } else if (location.pathname == "/profile/orders") {
      navigate("/profile/orders");
    }
  }
  function close(e: React.MouseEvent<HTMLButtonElement>) {
    setModalActive(false);
    setTimeout(() => {
      setModal(null);
    }, 500);

    back();
  }

  function openModal() {
    setModalActive(true);
    setModal(<FeedId modalActive={!modalActive} orderId={orderId} />);
    setOnCloseFunc(() => close);
  }

  function getArr(first: string[], second: IingredientObjectProps[]):IingredientObjectProps[] {
    return first.reduce((acc:any, item:string):IingredientObjectProps[] => {
      const val = second.find((el: IingredientObjectProps) => el._id === item);
      return val ? [...acc, val] : acc;
      // return val ? [...acc, undefined] : acc; // на случай, если надо вернуть undefined
    }, []);
  }

  let price:number = 0;
  let items = getArr(orders, ingredientsFromSetver);
  let dataOrder = new Date(time).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  price = items.reduce(
    (accumulator: number, currentValue: IingredientObjectProps) =>
      accumulator + currentValue.price,
    0
  );

  return price !== 0 ? (
    // && !ordersLoading
    <div onClick={openModal}>
      <NavLink
        to={
          location.pathname == "/feed"
            ? `/feed/${orderId}`
            : `/profile/orders/${orderId}`
        }
        state={{ backgroundLocation: location }}
        className={`${styles.link}`}
      >
        <div className={`${styles.feed__order}  `}>
          <div className={`${styles.feed__order__container}  `}>
            <p className={` text  text_type_digits-default`}>#{orderId}</p>
            <p className={`${styles.time} text text_type_main-default`}>
              {dataOrder}
            </p>
          </div>
          <h2 className={` pt-6  text text_type_main-medium`}>{title}</h2>

          {location.pathname.includes("profile") ? (
            <p
              className={`${
                status === "done"
                  ? styles.color
                  : status === "pending" && styles.colorRed
              }  pt-2  text text_type_main-small`}
            >
              {status === "done"
                ? "Выполнен"
                : status === "pending"
                ? "Отменен"
                : "Готовиться"}
            </p>
          ) : null}

          <div
            className={`${styles.feed__order__container} ${
              !isMobile ? "pt-6" : "pb-4"
            }`}
          >
            <div
              className={`${styles.images__container} ${isMobile && "pt-4"}`}
            >
              <div
                style={{ left: "0px", zIndex: "7" }}
                className={`${styles.image__container} `}
              >
                <div className={`${styles.image__container__flex} `}>
                  <div
                    className={`${styles.images} `}
                    style={{
                      backgroundImage: `url(${items[0].image_mobile})`,
                    }}
                  ></div>
                </div>
              </div>
              {items.length > 1 ? (
                <div
                  style={{
                    left: `${isMobile ? "25px" : " 50px"}`,
                    zIndex: "6",
                  }}
                  className={`${styles.image__container} `}
                >
                  <div className={`${styles.image__container__flex} `}>
                    <div
                      className={`${styles.images} `}
                      style={{
                        backgroundImage: `url(${items[1].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {items.length > 2 ? (
                <div
                  style={{
                    left: `${isMobile ? "50px" : " 100px"}`,
                    zIndex: "5",
                  }}
                  className={`${styles.image__container} `}
                >
                  <div className={`${styles.image__container__flex} `}>
                    <div
                      className={`${styles.images} `}
                      style={{
                        backgroundImage: `url(${items[2].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {items.length > 3 ? (
                <div
                  style={{
                    left: `${isMobile ? "75px" : " 150px"}`,
                    zIndex: "4",
                  }}
                  className={`${styles.image__container} `}
                >
                  <div className={`${styles.image__container__flex} `}>
                    <div
                      className={`${styles.images} `}
                      style={{
                        backgroundImage: `url(${items[3].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {items.length > 4 ? (
                <div
                  style={{
                    left: `${isMobile ? "100px" : " 200px"}`,
                    zIndex: "3",
                  }}
                  className={`${styles.image__container} `}
                >
                  <div className={`${styles.image__container__flex} `}>
                    <div
                      className={`${styles.images} `}
                      style={{
                        backgroundImage: `url(${items[4].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {items.length > 5 ? (
                <div
                  style={{
                    left: `${isMobile ? "125px" : " 250px"}`,
                    zIndex: "2",
                  }}
                  className={`${styles.image__container} `}
                >
                  <div className={`${styles.image__container__flex} `}>
                    <div
                      className={`${styles.images} `}
                      style={{
                        opacity: ` ${items.length > 6 ? 0.5 : null}`,
                        backgroundImage: `url(${items[5].image_mobile})`,
                      }}
                    ></div>
                    {items.length > 6 ? (
                      <div
                        className={`${styles.total} text ${
                          isMobile
                            ? "text_type_digits-small  pt-7"
                            : "text_type_digits-default pt-15"
                        } `}
                      >
                        +{items.length - 6}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className={`${styles.feed__order__container} pt-5 `}>
              <p className={` text text_type_digits-default pr-1`}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  ) : null;
};
export default FeedOrder;
