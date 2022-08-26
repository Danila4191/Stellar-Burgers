import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useState, useEffect } from "react";
import Form from "../../components/form/form";
import { NavLink, useNavigate,} from "react-router-dom";
import { authLogin } from "../../services/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../services/actions/actions";
const Login = ({ lastPage, auth,  setlastPage }) => {
  const [inputType, setInputType] = useState("password");
  const [LoginButtonActive, setLoginButtonActive] = useState(false);
  const [form, setValue] = useState({ email: "", password: "" });
  const { user, loading, failed } = useSelector((state) => state.Login);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }
  //вызывается при изменении импута
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setLoginButtonActive(true);
  };

  function cansel() {
    setValue({ email: "", password: "" });
    setLoginButtonActive(false);
  }

  function confirm() {
    dispatch(
      authLogin({
        email: form.email,
        password: form.password,
      })
    );
  }

  useEffect(() => {
    if (user !== null && (!failed == true)  && (lastPage !== null)) {
      navigate(lastPage);
      setlastPage(null)
    }
  }, [user]);
 
  useEffect(() => {
    if (user !== null && (!failed == true) && (lastPage == null)) {
      navigate("/");
    }
  }, [user]);
 

  return (
    user == null && (
      <div className={`${styles.container} `}>
        <div>
          <Form
            title={"Вход"}
            button={
              (user == null && loading == false) || user !== null
                ? "Войти"
                : "wait"
            }
            buttonState={LoginButtonActive}
            buttonFunc={confirm}
            buttonCansel={cansel}
          >
            <div className={`${styles.input__container}  pt-6`}>
              <Input
                value={form.email}
                onChange={onChange}
                name="email"
                type={"email"}
                placeholder={"E-mail"}
                size={"default"}
              />
            </div>
            <div className={`${styles.input__container}   pt-6`}>
              <Input
                onIconClick={setInputTypeClick}
                onChange={onChange}
                type={inputType}
                success={true}
                value={form.password}
                icon={"ShowIcon"}
                placeholder={"Пароль"}
                size={"default"}
                name="password"
              />
            </div>
          </Form>
          <p className={`${styles.text} pt-15 text_type_main-small`}>
            Вы — новый пользователь?
            <NavLink className={`${styles.link} `} to="/registration">
              <span className={`${styles.span} `}> Зарегистрироваться</span>
            </NavLink>
          </p>
          <p className={`${styles.text} pt-4 text_type_main-small`}>
            Забыли пароль?
            <NavLink className={`${styles.link} `} to="/forgot-password">
              <span className={`${styles.span} `}> Восстановить пароль</span>
            </NavLink>
          </p>
        </div>
      </div>
    )
  );
};
export default Login;
