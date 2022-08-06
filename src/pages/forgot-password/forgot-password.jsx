import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { NavLink } from "react-router-dom";
import Form from "../../components/form/form";
import { useState } from "react";
const ForgotPassword = () => {
  const [ ForgotPasswordState, setForgotPasswordState]= useState(false)
 
  const [loginValue, setLoginValue] = useState("");
  //вызывается при изменении импута
  function onChange (){
   setForgotPasswordState(true)
  }
 
  return (
    <div className={`${styles.container} `}>
      <div>
        <Form
          title={"Восстановление пароля"}
          button={"Восстановить"}
          buttonState={ForgotPasswordState}
          buttonFunc={setForgotPasswordState}
        >
          <div className={`${styles.input__container}  pt-6`}>
            <Input  onChange={onChange} value={loginValue} type={"email"} placeholder={"E-mail"} size={"default"} />
          </div>
        </Form>
        <p className={`${styles.text} pt-15 text_type_main-small`}>
          Вспомнили пароль?
          <NavLink className={`${styles.link} `} to="/Login">
            <span className={`${styles.span} `}> Войти</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
