import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Form from "../../components/form/form";
import { useState, useContext, useEffect } from "react";
import { resetPasswordApi } from "../../services/api/api";
import { codeSendContext } from "../../services/context/appContext";
import React, {  FC } from "react";
import { IValidationProps } from "../../services/types/types";
const ResetPassword:FC = () => {
  const [inputType, setInputType] = useState<"text" | "password" | "email" | undefined>("password");
  const [errorPasswordOne, setErrorPasswordOne] = useState<IValidationProps>({
    error: false,
    errorText: "",
  });
  const [errorPasswordTwo, setErrorPasswordTwo] = useState<IValidationProps>({
    error: false,
    errorText: "",
  });
  const [ResetPasswordButtonActive, setResetPasswordButtonActive] =
    useState<boolean>(false);
  
  const { codeSend, setCodeSend } = useContext(codeSendContext);
  const [form, setValue] = useState({
    passwordOne: "",
    passwordTwo: "",
    code: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (!codeSend) {
      navigate("/forgot-password");
    }
  }, []);

  useEffect(() => {
    if (
      form.passwordOne == "" ||
      errorPasswordOne.error ||
      form.passwordTwo == "" ||
      errorPasswordTwo.error ||
      form.code == ""
    ) {
      setResetPasswordButtonActive(false);
    } else {
      setResetPasswordButtonActive(true);
    }
  });

  useEffect(() => {
    if (form.passwordOne.length < 8 && form.passwordOne.length !== 0) {
      setErrorPasswordOne({
        error: true,
        errorText: "Слишком короткий пароль",
      });
    } else {
      setErrorPasswordOne({ error: false, errorText: "" });
    }
  }, [form.passwordOne]);

  useEffect(() => {
    if (
      form.passwordOne !== form.passwordTwo &&
      form.passwordTwo.length !== 0
    ) {
      setErrorPasswordTwo({ error: true, errorText: "Пароль не совападает" });
    } else {
      setErrorPasswordTwo({ error: false, errorText: "" });
    }
  }, [form.passwordTwo]);

  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }

  //вызывается при изменении импута

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  function cansel() {
    setValue({ passwordOne: "", passwordTwo: "", code: "" });
  }

  function confirm() {
    resetPasswordApi({
      password: form.passwordTwo,
      token: form.code,
    })
      .then((data) => {
        if (data.success) {
          setCodeSend(false);
          navigate("/Login");
          console.log(data);
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
          buttonState={ResetPasswordButtonActive}
          buttonFunc={confirm}
          title={"Восстановление пароля"}
          button={"Сохранить"}
          buttonCansel={cansel}
        >
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              value={form.passwordOne}
              type={inputType}
              success={true}
              name="passwordOne"
              placeholder={"Введите новый пароль"}
              size={"default"}
              error={errorPasswordOne.error}
              errorText={errorPasswordOne.errorText}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              value={form.passwordTwo}
              name="passwordTwo"
              onIconClick={setInputTypeClick}
              type={inputType}
              success={true}
              icon={"ShowIcon"}
              placeholder={"Повторите новый пароль"}
              size={"default"}
              error={errorPasswordTwo.error}
              errorText={errorPasswordTwo.errorText}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              value={form.code}
              name="code"
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
