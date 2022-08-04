import {
  Input,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useState, useContext } from "react";
import Form from "../../components/form/form";
import Menu from "../../components/menu/menu";
import { isMobileContext } from "../../services/context/appContext";
const Profile = () => {
  const [inputType, setInputType] = useState("password");

  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }
  const [profileState, setProfileState] = useState(false);
  function onChange() {
    setProfileState(true);
  }

  const { isMobile } = useContext(isMobileContext);
  const name = "123";
  const login = "123";
  const password = "123";
  return (
    <div className={`${styles.container} `}>
      {!isMobile && (
        <Menu
        
          text={" В этом разделе вы можете изменить свои персональные данные"}
        />
      )}

      <Form
        button={"Сохранить"}
        buttonState={profileState}
        buttonFunc={setProfileState}
      >
       {isMobile && <h1 className={`${styles.title}  text`}>Профиль</h1>}
        <div className={`${styles.input__container}  pt-6`}>
          <Input
            disabled={false}
            value={name}
            icon={"EditIcon"}
            type={"text"}
            placeholder={"Имя"}
            size={"default"}
          />
        </div>
        <div className={`${styles.input__container}  pt-6`}>
          <EmailInput value={login} name={"email"} size={"default"} />
        </div>
        <div className={`${styles.input__container}  pt-6`}>
          <Input
            disabled={false}
            value={password}
            onChange={onChange}
            onIconClick={setInputTypeClick}
            type={inputType}
            success={true}
            icon={"EditIcon"}
            placeholder={"Пароль"}
            size={"default"}
          />
        </div>
      </Form>
    </div>
  );
};
export default Profile;
