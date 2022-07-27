import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import AppHeader from "../app-header/app-header";
import { onResponce } from "../../services/api/api";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-Constructor/burger-Constructor";
import Modal from "../modal/modal";
import baseUrl from "../../utils/utils";
import { IngredientContext } from "../../services/context/appContext";
import { useDispatch, useSelector } from "react-redux";



const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ingredients.loading);
  const [modalActive, setModalActive] = useState(false);
  const [modal, setModal] = useState();
  const [state, setState] = useState({
    productData: [null],
    loading: true,
  });

  useEffect(() => {
    const getProductData = async () => {
      dispatch({
        type: "GET_INGREDIENTS",
        payload: { productData: null, loading: true },
      });
      try {
        const res = await fetch(`${baseUrl}/ingredients/`);
        if (!res.ok) {
          throw new Error(`Ошибка  ${res.status}`);
        }
        const data = await onResponce(res);
        dispatch({
          type: "GET_INGREDIENTS",
          payload: { productData: data.data, loading: false },
        });
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
            {!loading ? (
              <BurgerIngredients
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ) : null}
            {!loading ? (
             
              <BurgerConstructor
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ) : null}
          </main>
          <Modal active={modalActive} setActive={setModalActive}>
            {modal}
          </Modal>
        </IngredientContext.Provider>
   
    </div>
  );
};
export default App;
