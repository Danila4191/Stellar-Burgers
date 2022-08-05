import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useState } from "react";
import Form from "../../components/form/form";
import { NavLink } from "react-router-dom";
const Login = () => {
  
  const [inputType, setInputType] = useState("password");
  const [LoginState, setLoginState] = useState(false);

  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }
  //вызывается при изменении импута
  function onChange (){
    setLoginState(true)
   }

  return (
    <div className={`${styles.container} `}>
      <div>
        <Form
          title={"Вход"}
          button={"Войти"}
          buttonState={LoginState}
          buttonFunc={setLoginState}
        >
          <div className={`${styles.input__container}  pt-6`}>
            <Input type={"email"} placeholder={"E-mail"} size={"default"} />
          </div>
          <div className={`${styles.input__container}      pt-6`}>
            <Input
              onIconClick={setInputTypeClick}
              type={inputType}
              success={true}
              icon={"ShowIcon"}
              placeholder={"Пароль"}
              size={"default"}
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
  );
};
export default Login;
