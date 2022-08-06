import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form.module.css";

const Form = (props) => {

  //сохранить изменение отключить кнопку
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
     {props.buttonState  && <button className={`${styles.cansel_button} `}><p className={`${styles.cansel} pt-4 text text_type_main-small`}>Отменить</p></button>}
    </form>
  );
};
export default Form;
