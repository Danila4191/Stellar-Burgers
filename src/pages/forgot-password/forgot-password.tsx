import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Form from "../../components/form/form";
import { useState, useContext, useEffect } from "react";
import { codeSendContext } from "../../services/context/appContext";
import { getEmailCodeApi } from "../../services/api/api";
import React, {  FC } from "react";
import { IValidationProps } from "../../services/types/types";
const ForgotPassword:FC = () => {
  const [ForgotPasswordButtonActive, setForgotPasswordButtonActive] =
    useState<boolean>(false);
  const [form, setValue] = useState<any>({ email: "" });
  const { setCodeSend } = useContext(codeSendContext);
  const [errorEmail, setErrorEmail] = useState<IValidationProps>({ error: false, errorText: "" });
  let navigate = useNavigate();
  //вызывается при изменении импута

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  function cansel() {
    setValue({ email: "" });
    setForgotPasswordButtonActive(false);
  }
  function validateEmail(email:string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
 
  useEffect(() => {
    if (form.email == "" || errorEmail.error) {
      setForgotPasswordButtonActive(false);
    } else {
      setForgotPasswordButtonActive(true);
    }
  });

  useEffect(() => {
    if (validateEmail(form.email)) {
      setErrorEmail({ error: false, errorText: "" });
    } else if (form.email.length !== 0) {
      setErrorEmail({ error: true, errorText: "Некоректный email" });
    } else {
      setErrorEmail({ error: false, errorText: "" });
    }
  }, [form.email]);

  function confirm() {
    getEmailCodeApi({
      email: form.email,
    })
      .then((data) => {
        if (data.success) {
          setCodeSend(true);
          navigate("/reset-password");
        }
      })
      .catch((err) => {
        alert(`Ошибка ${err.status}`);
      });
  }

  return (
    <div className={`${styles.container} `}>
      <div>
        <Form
          title={"Восстановление пароля"}
          button={"Восстановить"}
          buttonState={ForgotPasswordButtonActive}
          buttonFunc={confirm}
          buttonCansel={cansel}
        >
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              value={form.email}
              name="email"
              type={"email"}
              placeholder={"E-mail"}
              size={"default"}
              error={errorEmail.error}
              errorText={errorEmail.errorText}
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
export default ForgotPassword;
