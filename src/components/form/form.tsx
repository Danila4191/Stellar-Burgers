import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form.module.css";
import { IFormProps } from "../../services/types/types";
import React, {  FC } from "react";
const Form: FC<IFormProps> = (props) => {

  //сохранить изменение отключить кнопку
  function onSubmit(e:React.FormEvent): void{
    e.preventDefault();
    props.buttonFunc()
    
  }
  return (
    <form className={`${styles.form}  
    `}     onSubmit={onSubmit} >
      <h2 className={`${styles.title} text_type_main-medium`}>{props.title}</h2>
      {props.children}
    
        <div className={`${styles.button}  pt-6`}>
          <Button 
           disabled={!props.buttonState}
           size="medium">{props.button}</Button>
        </div>
     {props.buttonState  && <button onClick= {props.buttonCansel}className={`${styles.cansel_button} `}><p className={`${styles.cansel} pt-4 text text_type_main-small`}>Отменить</p></button>}
    </form>
  );
};
export default Form;
