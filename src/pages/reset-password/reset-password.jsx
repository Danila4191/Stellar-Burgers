import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Form from "../../components/form/form";
import { useState, useContext, useEffect } from "react";
import { resetPasswordApi } from "../../services/api/api";
import { codeSendContext } from "../../services/context/appContext";

const ResetPassword = () => {
  const [inputType, setInputType] = useState("password");
  const [ResetPasswordButtonActive, setResetPasswordButtonActive] =
    useState(false);
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
    setResetPasswordButtonActive(true);
  };
  function cansel() {
    setValue({ passwordOne: "", passwordTwo: "", code: "" });
    setResetPasswordButtonActive(false);
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
