import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useState, useContext, useEffect } from "react";
import { useDispatch} from "react-redux";
import Form from "../../components/form/form";
import Menu from "../../components/menu/menu";
import { isMobileContext } from "../../services/context/appContext";
import { getUser } from "../../services/actions/userActions/userActions";
import { userFixApi } from "../../services/api/api";
import { useSelectorTyped } from "../../services/types/types";
import { ValidationProps } from "../../services/types/types";
const Profile = () => {
  const [inputType, setInputType] = useState<any>("password");
  const [profileButtonActive, setProfileButtonActive] = useState<boolean>(false);

  const { isMobile } = useContext(isMobileContext);
  const [form, setValue] = useState({ email: "", name: "", password: "" });
  const user = useSelectorTyped((state) => state.User.userData);
  const [errorName, setErrorName] = useState<ValidationProps>({ error: false, errorText: "" });
  const [errorEmail, setErrorEmail] = useState<ValidationProps>({ error: false, errorText: "" });
  const [errorPassword, setErrorPassword] = useState<ValidationProps>({
    error: false,
    errorText: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      setValue({ email: user.email, name: user.name, password: form.password });
    }
  }, [user]);

  function validateEmail(email:string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function setInputTypeClick() {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    // setProfileButtonActive(true);

  };

  function cansel() {
    if(user){
    setValue({ email: user.email, name: user.name, password: "" });
    //setProfileButtonActive(false);
  }
  }
 
  useEffect(() => {
    if (
      form.name == "" ||
      form.email == "" ||
      errorEmail.error ||
      errorName.error || 
      errorPassword.error ||
      (  user && user.name == form.name && user && form.email == user.email && form.password == ""  )
    ) {
      setProfileButtonActive(false);
    } else {
      setProfileButtonActive(true);
      console.log(1)
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
    userFixApi({
      email: form.email,
      password: form.password,
      name: form.name,
    })
      .then((data) => {
        if (data.success) {
          form.password = ""
          setProfileButtonActive(false);

          dispatch<any>(getUser());
        
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
      {user == null ? null : (
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
              error={errorName.error}
              errorText={errorName.errorText}
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
              error={errorEmail.error}
              errorText={errorEmail.errorText}
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
              error={errorPassword.error}
              errorText={errorPassword.errorText}
            />
          </div>
        </Form>
      )}
    </div>
  );
};
export default Profile;
