import styles from "./feed-order.module.css";
import { useContext } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { isMobileContext } from "../../services/context/appContext";
import FeedId from "../../pages/feed-id/feed-id";
const FeedOrder = ({
  price,
  time,
  orderId,
  title,
  items,
  status,
  setModalActive,
  setModal,
  setOnCloseFunc,
  modalActive,
  openModal,
}) => {
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
  function close(e) {
    setModalActive(false);
    back();
  }

  function openModal() {
    setModal(<FeedId modalActive={modalActive} />);
    setModalActive(true);
    setOnCloseFunc(() => close);
  }

  return (
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
              {time}
            </p>
          </div>
          <h2 className={` pt-6  text text_type_main-medium`}>{title}</h2>

          {status !== undefined ? (
            <p
              className={`${
                status === "done" ? styles.color : status === "pending" &&  styles.colorRed
              }  pt-2  text text_type_main-small`}
            >
              {status}
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
              <CurrencyIcon />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
export default FeedOrder;
