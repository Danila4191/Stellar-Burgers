import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { NavLink } from "react-router-dom";
import Form from "../../components/form/form";
import { useState } from "react";
const ResetPassword = () => {
  const [inputType, setInputType] = useState("password");

  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }
  const [ ResetPasswordState, setResetPasswordState]= useState(false)
 function onChange (){
  setResetPasswordState(true)
 }

  return (
    <div className={`${styles.container} `}>
      <div>
        <Form    buttonState={ResetPasswordState}
          buttonFunc={setResetPasswordState}
          title={"Восстановление пароля"} button={"Сохранить"} 
        >
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              type={inputType}
              success={true}
              placeholder={"Введите новый пароль"}
              size={"default"}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onIconClick={setInputTypeClick}
              type={inputType}
              success={true}
              icon={"ShowIcon"}
              placeholder={"Повторите новый пароль"}
              size={"default"}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              size={"default"}
            />
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
export default ResetPassword;
