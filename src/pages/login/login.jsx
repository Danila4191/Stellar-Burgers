import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useState, useEffect } from "react";
import Form from "../../components/form/form";
import { NavLink, useNavigate,} from "react-router-dom";
import { authLogin, AUTH_LOGIN_FAILED_RELOAD } from "../../services/actions/userActions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie/cookie";

const Login = ({ lastPage, auth,  setlastPage }) => {
  const [inputType, setInputType] = useState("password");
  const [LoginButtonActive, setLoginButtonActive] = useState(false);
  const [form, setValue] = useState({ email: "", password: "" });
  const { user, loading, failed } = useSelector((state) => state.Login);
  
  const [errorEmail, setErrorEmail] = useState({ error: false, errorText: "" });
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    errorText: "",
  });
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
   // setLoginButtonActive(true);
   if (failed) {

    setErrorEmail({ error: false, errorText: "" });
    dispatch({
      type: AUTH_LOGIN_FAILED_RELOAD,
    });
  }
  };

  function cansel() {
    setValue({ email: "", password: "" });
    //setLoginButtonActive(false);
  }
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
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
    if (
      form.email == "" ||
      form.password == "" ||
      errorEmail.error ||
      errorPassword.error
    ) {
      setLoginButtonActive(false);
    } else {
      setLoginButtonActive(true);
     
    }
    
  });
useEffect(()=> {
  if (failed) {
    setLoginButtonActive(false);
    setErrorEmail({ error: true, errorText: "Неправильный логин или пароль" });
  }
},[failed])
  useEffect(() => {
    if (validateEmail(form.email)) {
      setErrorEmail({ error: false, errorText: "" });
    } else if (form.email.length !== 0) {
      setErrorEmail({ error: true, errorText: "Некоректный email" });
    } else {
      setErrorEmail({ error: false, errorText: "" });
    }
  }, [form.email]);

  useEffect(() => {
    if (form.password.length < 8 && form.password.length !== 0) {
      setErrorPassword({ error: true, errorText: "Слишком короткий пароль" });
    } else {
      setErrorPassword({ error: false, errorText: "" });
    }
  }, [form.password]);


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
  });
 

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
                error={errorEmail.error}
                errorText={errorEmail.errorText}
           
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
                error={errorPassword.error}
                errorText={errorPassword.errorText}
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
