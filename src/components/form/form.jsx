import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form.module.css";
import { useContext } from "react";
import { isMobileContext } from "../../services/context/appContext";
const Form = (props) => {
  const { isMobile } = useContext(isMobileContext);
  function onClick(){
    props.buttonFunc()
  }
  return (
    <form className={`${styles.form} 
    `}>
      <h2 className={`${styles.title} text_type_main-medium`}>{props.title}</h2>
      {props.children}
    
        <div className={`${styles.button}  pt-6`}>
          <Button 
           disabled={!props.buttonState}
           onClick={onClick} 
          size="medium">{props.button}</Button>
        </div>
     {props.buttonState  && <p className={`${styles.cansel} pt-4 text text_type_main-small`}>Отменить</p>}
    </form>
  );
};
export default Form;
