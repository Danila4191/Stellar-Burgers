import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import AppHeader from "../app-header/app-header";
import Data from "../../utils/data";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-Constructor/burger-Constructor";
import Modal from "../modal/modal";
import baseUrl from "../../utils/utils"
import { isConstructorDeclaration } from "typescript";
import { IngredientContext } from "../../services/appContext";


const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modal, setModal] = useState();
  const [state, setState] = useState({
    productData: [null],
    loading: true,
  });
  useEffect(() => {
    const getProductData = async () => {
      const onResponce = (res) => {
        return res.ok ? res.json() : Promise.reject(res);
      };
      
      setState({ ...state, loading: true });
      try {
        const res = await fetch(`${baseUrl}/ingredients/`);
        if (!res.ok) {
          throw new Error(`Ошибка  ${res.status}`);
        }
        const data = await onResponce(res);
        setState({ productData: data.data, loading: false });
      } catch (err) {
        alert(`Ошибка ${err}`);
      }
    };
    getProductData();
  }, []);

  return (
    <div>
      <AppHeader />
      <IngredientContext.Provider value={{ state, setState }}>
        <main className={styles.Main}>
          {!state.loading ? (
            <BurgerIngredients
              setModalActive={setModalActive}
              setModal={setModal}
            />
          ) : null}
          {!state.loading ? (
            <BurgerConstructor
              setModalActive={setModalActive}
              setModal={setModal}
           
            />
          ) : null}
        </main>
        <Modal
          active={modalActive}
          setActive={setModalActive}
      
        >
          {modal}
        </Modal>
      </IngredientContext.Provider>
    </div>
  );
};
export default App;
