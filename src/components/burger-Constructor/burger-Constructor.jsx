import React, { useState } from "react";
import ReactDom from "react-dom";
import {
  DragIcon,
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-Constructor.module.css";

const Item = ({ text, type, thumbnail, price, id }) => {
  return (
    <div className={styles.Item}>
      <DragIcon />
      <ConstructorElement
        type={type}
        isLocked={false}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
    </div>
  );
};

class BurgerConstructor extends React.Component {
  render() {
  
    return (
      <div className={styles.BurgerConstructor}>
        <div className={`${styles.BurgerList} mt-25 mb-10 pr-4 pl-4`}>
          <Item
            type="top"
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />

          <Item
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
          <Item
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
          <Item
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
          <Item
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
          
          <Item
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
          <Item
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
          />
          <Item
            type="bottom"
           
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>
        <div className={`${styles.Order}`}>
          <div className={`${styles.Total}`}>
            <p
              style={{ margin: "0" }}
              className={` pr-2  text_type_digits-medium`}
            >
              0
            </p>
            <CurrencyIcon />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;
