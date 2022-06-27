import React from "react";
import ReactDom from "react-dom";
import AppHeader from "../app-header/app-header";
import Data from "../utils/data";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-Constructor/burger-Constructor";
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";
import IngredientInfo from "../ingredient-info/ingredient-info";

/* month-7/step-2
  fetch("https://norma.nomoreparties.space/api/ingredients")
  .then((response) => response.json())
  .then((data) => setData(data));
  
  let array = []
  const setData = (data) => {
    array.push(data);
  };
  console.log(array)
*/
/*
  const config = {
    url: "https://norma.nomoreparties.space/api/ingredients",
    headers: {
      "content-type": "application/json",
    },
  };
  const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };
  let array = getAllApi()
 function getAllApi() {
    return fetch(config.url, {
      method: "GET",
      headers: config.headers,
    }).then(onResponce);
  }*/
  /*
  let array = []
  function Api(){
   return fetch('https://norma.nomoreparties.space/api/ingredients', {
  })
    .then(res => res.json())
   
  }
  Api().then((result) => {
    array.push(result.data);
  
  }); 

*/
  
function App() {
  return (
    <div>
      <AppHeader />
      <main className={styles.Main}>
        <BurgerIngredients data={Data} />
        <BurgerConstructor />
      </main>
    </div>
  );
}
export default App;
