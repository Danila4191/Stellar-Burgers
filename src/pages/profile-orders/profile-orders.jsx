import { useContext ,useEffect } from "react";
import styles from "./profile-orders.module.css";
import FeedOrders from "../../components/feed-orders/feed-orders";
import { isMobileContext } from "../../services/context/appContext";
import Menu from "../../components/menu/menu";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie/cookie";
import { WS_CONNECTION_START } from "../../services/actions/soketAction/soketAction";

const ProfileOrders = ({
  orders,
  setModalActive,
  setModal,
  setOnCloseFunc,
  modalActive,
}) => {
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (getCookie("refreshToken") !== undefined) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: `?token=${getCookie(`token`)}`,
      });
    }
  }, [user]);

  const { isMobile } = useContext(isMobileContext);
  return orders !== undefined ? (
    <div className={`${styles.container} ${!isMobile && "pt-15"}`}>
      {!isMobile && (
        <div className={`pt-15 pr-15`}>
          <Menu
            text={"В этом разделе вы можете просмотреть свою историю заказов"}
          />
        </div>
      )}

      <div className={`${styles.orders__container} mr-2 ml-2`}>
        {isMobile && (
          <h2 className={`${styles.title} text_type_main-large text pt-4 pb-4`}>
            История заказов
          </h2>
        )}
        <FeedOrders
          setOnCloseFunc={setOnCloseFunc}
          setModalActive={setModalActive}
          setModal={setModal}
          modalActive={modalActive}
          orders={[...orders.orders].reverse()}
        />
      </div>
    </div>
  ) : null;
};
export default ProfileOrders;
