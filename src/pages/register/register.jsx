import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { NavLink , useNavigate} from "react-router-dom";
import { useState } from "react";
import Form from "../../components/form/form";
import { registrationApi } from "../../services/api/api";
const Register = () => {
  const [inputType, setInputType] = useState("password");
  const [RegisterButtonActive, setRegisterButtonActive] = useState(false);
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

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setRegisterButtonActive(true);
  };
  function cansel() {
    setValue({ email: "", name: "", password: "" });
    setRegisterButtonActive(false);
  }

  function confirm() {
    registrationApi({
      email: form.email, 
      password: form.password, 
      name: form.name
  } )
      .then((data) => {
        if (data.success) {
          navigate("/Login");
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
