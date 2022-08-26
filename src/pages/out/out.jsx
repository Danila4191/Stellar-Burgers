import styles from "./out.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import { authOutApi } from "../../services/api/api";
import { useSelector, useDispatch } from "react-redux";
import { GET_USER, AUTH_LOGIN } from "../../services/actions/userActions/userActions";
import { getCookie, deleteCookie } from "../../utils/cookie/cookie";
import { useContext } from "react";
import { codeSendContext } from "../../services/context/appContext";

const Out = () => {
  const refreshToken = useSelector((state) => state.Login.refreshToken);
  const { codeSend, setCodeSend } = useContext(codeSendContext);

  let navigate = useNavigate();
  function onClick() {
    authOutApi({
      token: getCookie("refreshToken"), // refreshToken
    });
    dispatch({ type: GET_USER, payload: { userData: null } });
    dispatch({
      type: AUTH_LOGIN,
      payload: { user: null, accessToken: null, refreshToken: null },
    });
    deleteCookie("token");
    deleteCookie("refreshToken");
    navigate("/Login");
    setCodeSend(false);
  }
  const dispatch = useDispatch();
  return (
    <div className={` ${styles.out} `}>
      <div className={` ${styles.container} `}>
        <h1 className={` text_type_main-medium pb-5`}>
          Вы уверены что хотите выйти?
        </h1>
        <Button onClick={onClick} size="small">
          <p className={` text text_type_main-default `}>Выход</p>
        </Button>
        <NavLink to="/profile" className={`${styles.link} pt-5`}>
          <p className={` text text_type_main-default`}>Вернуться</p>
        </NavLink>
      </div>
    </div>
  );
};
export default Out;
