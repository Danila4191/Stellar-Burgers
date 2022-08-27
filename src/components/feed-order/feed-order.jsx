import styles from "./feed-order.module.css";
import { useContext } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { isMobileContext } from "../../services/context/appContext";

const FeedOrder = (
  props,
  { setModalActive, setModal, setOnCloseFunc, modalActive }
) => {
  const { isMobile } = useContext(isMobileContext);
  const location = useLocation();

  let navigate = useNavigate();
  function back() {
    if (location.pathname == "/feed/:id") {
      navigate("/feed");
    } else if (location.pathname == "/profile-orders/:id") {
      navigate("/profile-orders");
    }
  }

  function close(e) {
    setModalActive(false);
    back();
  }
  function openModal() {
  setModal(<FeedOrder />);
    setModalActive(true);
    setOnCloseFunc(() => close);
  }

  return (
    <div onClick={openModal}>
      <NavLink
        to={
          location.pathname == "/feed"
            ? `/feed/${props.orderId}`
            : `/profile/orders/${props.orderId}`
        }
        className={`${styles.link}`}
      >
        <div className={`${styles.feed__order}  `}>
          <div className={`${styles.feed__order__container}  `}>
            <p className={` text  text_type_digits-default`}>
              #{props.orderId}
            </p>
            <p className={`${styles.time} text text_type_main-default`}>
              {props.time}
            </p>
          </div>
          <h2 className={` pt-6  text text_type_main-medium`}>{props.title}</h2>

          {props.status !== undefined ? (
            <p
              className={`${
                props.status === "ready" && styles.color
              }  pt-2  text text_type_main-small`}
            >
              {props.status}
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
                      backgroundImage: `url(${props.items[0].image_mobile})`,
                    }}
                  ></div>
                </div>
              </div>
              {props.items.length > 1 ? (
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
                        backgroundImage: `url(${props.items[1].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {props.items.length > 2 ? (
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
                        backgroundImage: `url(${props.items[2].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {props.items.length > 3 ? (
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
                        backgroundImage: `url(${props.items[3].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {props.items.length > 4 ? (
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
                        backgroundImage: `url(${props.items[4].image_mobile})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}
              {props.items.length > 5 ? (
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
                        opacity: ` ${props.items.length > 6 ? 0.5 : null}`,
                        backgroundImage: `url(${props.items[5].image_mobile})`,
                      }}
                    ></div>
                    {props.items.length > 6 ? (
                      <div
                        className={`${styles.total} text ${
                          isMobile
                            ? "text_type_digits-small  pt-7"
                            : "text_type_digits-default pt-15"
                        } `}
                      >
                        +{props.items.length - 6}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className={`${styles.feed__order__container} pt-5 `}>
              <p className={` text text_type_digits-default pr-1`}>
                {props.price}
              </p>
              <CurrencyIcon />
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
export default FeedOrder;
