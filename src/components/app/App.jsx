import React from "react";
import ReactDom from "react-dom";
import AppHeader from "../app-header/app-header";
import Data from "../utils/data";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-Constructor/burger-Constructor";

function App() {
  return (
    <div>
      <AppHeader />
      <main className={styles.Main}>
        <BurgerIngredients Data={Data} />
        <BurgerConstructor Data={Data} />
      </main>
    </div>
  );
}

export default App;
