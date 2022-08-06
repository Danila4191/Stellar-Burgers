import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Form from "../../components/form/form";
const Register = () => {
  const [inputType, setInputType] = useState("password");
  const [RegisterState, setRegisterState] = useState(false);
  const [passwordValue, setpasswordValue] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [nameValue, setnNameValue] = useState("");
  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }

  //вызывается при изменении импута
  function onChange() {
    setRegisterState(true);
  }

  return (
    <div className={`${styles.container} `}>
      <div>
        <Form
          title={"Регистрация"}
          button={"Зарегистрироваться"}
          buttonState={RegisterState}
          buttonFunc={setRegisterState}
        >
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              type={"text"}
              placeholder={"Имя"}
              size={"default"}
              value={nameValue}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              type={"email"}
              placeholder={"E-mail"}
              size={"default"}
              value={loginValue}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              onIconClick={setInputTypeClick}
              type={inputType}
              success={true}
              icon={"ShowIcon"}
              placeholder={"Пароль"}
              size={"default"}
              value={passwordValue}
            />
          </div>
        </Form>
        <p className={`${styles.text}  pt-15 text_type_main-small`}>
          Уже зарегистрированы?
          <NavLink className={`${styles.link} `} to="/Login">
            <span className={`${styles.span} `}> Войти </span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default Register;
