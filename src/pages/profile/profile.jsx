import {
  Input,
  EmailInput,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/form/form";
import Menu from "../../components/menu/menu";
import { isMobileContext } from "../../services/context/appContext";
import { getUser } from "../../services/actions/actions";
import { userFixApi } from "../../services/api/api";
//import { getCookie } from "../../services/actions/actions";
const Profile = () => {
  const [inputType, setInputType] = useState("password");
  const [profileButtonActive, setProfileButtonActive] = useState(false);
  const { isMobile } = useContext(isMobileContext);
  const [form, setValue] = useState({ email: "", name: "", password: "" });
  const user = useSelector((state) => state.User.userData);
  const dispatch = useDispatch();

 
  useEffect(() => {
    if (user !== null) { 
      setValue({ email: user.email, name: user.name, password: form.password });
    } 
  },[user]);

  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setProfileButtonActive(true);
  };

  function cansel() {
    setValue({ email: user.email, name: user.name, password: "" });
    setProfileButtonActive(false);
  }

  function confirm() {
    userFixApi({
      email: form.email,
      //password: form.password,
      name: form.name,
    })
      .then((data) => {
        if (data.success) {
          setProfileButtonActive(false);
          dispatch(getUser());
        }
      })
      .catch((err) => {
        alert(`Ошибка ${err.status}`);
      });
  }

  return (
    <div className={`${styles.container} `}>
      {!isMobile && user !== null ? (
        <Menu
          text={" В этом разделе вы можете изменить свои персональные данные"}
        />
      ) : null}
      {(user == null ) ? null : (
        <Form
          button={"Сохранить"}
          buttonState={profileButtonActive}
          buttonFunc={confirm}
          buttonCansel={cansel}
        >
          {isMobile && <h1 className={`${styles.title}  text`}>Профиль</h1>}
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              disabled={false}
              onChange={onChange}
              value={form.name}
              name="name"
              icon={"EditIcon"}
              type={"text"}
              placeholder={"Имя"}
              size={"default"}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              disabled={false}
              value={form.email}
              onChange={onChange}
              type={"text"}
              name="email"
              success={true}
              icon={"EditIcon"}
              placeholder={"Email"}
              size={"default"}
            />
          </div>
          <div className={`${styles.input__container}  pt-6`}>
            <Input
              disabled={false}
              value={form.password}
              onChange={onChange}
              onIconClick={setInputTypeClick}
              type={inputType}
              name="password"
              success={true}
              icon={"ShowIcon"}
              placeholder={"Пароль"}
              size={"default"}
            />
          </div>
        </Form>
      )}
    </div>
  );
};
export default Profile;
