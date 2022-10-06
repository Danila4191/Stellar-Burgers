import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../../components/form/form";
import { registrationApi } from "../../services/api/api";
import { ValidationProps } from "../../services/types/types";
import React, {  FC } from "react";
const Register:FC = () => {
  const [inputType, setInputType] = useState<any>("password");
  const [errorName, setErrorName] = useState<ValidationProps>({ error: false, errorText: "" });
  const [errorEmail, setErrorEmail] = useState<ValidationProps>({ error: false, errorText: "" });
  const [errorPassword, setErrorPassword] = useState<ValidationProps>({
    error: false,
    errorText: "",
  });
  const [RegisterButtonActive, setRegisterButtonActive] = useState<boolean>(false);
  const [form, setValue] = useState({ email: "", name: "", password: "" });

  let navigate = useNavigate();

  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }

  //вызывается при изменении импута

  const onChange = (e: React.ChangeEvent<HTMLInputElement>|any) => {
    if (form.name.length < 40) {
      setValue({ ...form, [e.target.name]: e.target.value });
      
    } else if (form.name.length == 40 && e.nativeEvent.data == null) {
      setValue({ ...form, [e.target.name]: e.target.value });
    }
  };
  function cansel() {
    setValue({ email: "", name: "", password: "" });

  }
  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  useEffect(() => {
    if (
      form.name == "" ||
      form.email == "" ||
      form.password == "" ||
      errorEmail.error ||
      errorName.error ||
      errorPassword.error
    ) {
      setRegisterButtonActive(false);
    } else {
      setRegisterButtonActive(true);
    }
  });

  useEffect(() => {
    if (form.name.length < 5 && form.name.length !== 0) {
      setErrorName({ error: true, errorText: "Слишком короткое имя" });
    } else {
      setErrorName({ error: false, errorText: "" });
    }
  }, [form.name]);

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

  function confirm() {
    registrationApi({
      email: form.email,
      password: form.password,
      name: form.name,
    })
      .then((data) => {
        if (data.success) {
          navigate("/Login");
        }
      })
      .catch((err) => {
        setErrorEmail({
          error: true,
          errorText: "Пользователь уже зарегистрирован",
        });
      });
  }

  return (
    <div className={`${styles.container} `}>
      <div>
        <Form
          title={"Регистрация"}
          button={"Зарегистрироваться"}
          buttonState={RegisterButtonActive}
          buttonFunc={confirm}
          buttonCansel={cansel}
        >
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              type={"text"}
              placeholder={"Имя"}
              size={"default"}
              value={form.name}
              name="name"
              error={errorName.error}
              errorText={errorName.errorText}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              onChange={onChange}
              type={"email"}
              placeholder={"E-mail"}
              size={"default"}
              value={form.email}
              name="email"
              error={errorEmail.error}
              errorText={errorEmail.errorText}
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
              value={form.password}
              name="password"
              error={errorPassword.error}
              errorText={errorPassword.errorText}
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
