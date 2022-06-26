import React from "react";
import ReactDom from "react-dom";
import AppHeader from "../app-header/app-header";
import Data from "../utils/data";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-Constructor/burger-Constructor";

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
