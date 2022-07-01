import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import AppHeader from "../app-header/app-header";
import Data from "../../utils/data";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-Constructor/burger-Constructor";
import Modal from "../modal/modal";
import { isConstructorDeclaration } from "typescript";



const http = `https://norma.nomoreparties.space/api/ingredients/`;
const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modal, setModal] = useState();
  const [state, setState] = useState({
    productData: [null],
    loading: true,
  });
  useEffect(() => {
    const getProductData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(`${http}`);
        const data = await res.json();
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
      <main className={styles.Main}>
        {!state.loading ? (
          <BurgerIngredients
            data={state.productData}
            setModalActive={setModalActive}
            setModal={setModal}
          />
        ) : null}
        {!state.loading ? (
          <BurgerConstructor
            data={state.productData}
            setModalActive={setModalActive}
            setModal={setModal}
          />
        ) : null}
      </main>
        <Modal active={modalActive} setActive={setModalActive}>
          {modal}
        </Modal>

    </div>
  );
};
export default App;
