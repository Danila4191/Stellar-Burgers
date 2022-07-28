import  { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-Ingredients/burger-Ingredients";
import BurgerConstructor from "../burger-Constructor/burger-Constructor";
import Modal from "../modal/modal";
import { IngredientContext } from "../../services/context/appContext";
import { useDispatch, useSelector } from "react-redux";
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import {getIngredients} from "../../services/actions/actions"

const App = () => {
 
  const [modalActive, setModalActive] = useState(false);
  const [modal, setModal] = useState();
  const [onCloseFunc, setOnCloseFunc] = useState();
  const [state, setState] = useState({
    productData: [null],
    loading: true,
  });

  const {loading,failed,} = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, []);


  return (
    <div>
<DndProvider backend={HTML5Backend}>
        <AppHeader />
      <IngredientContext.Provider value={{ state, setState }}>
          <main className={styles.Main}>
            {(!loading && !failed ) ? (
              <BurgerIngredients 
                setOnCloseFunc={setOnCloseFunc}
                setModalActive={setModalActive}
                setModal={setModal}
                modalActive={modalActive}
              />
            ) : null}
            {(!loading && !failed) ? (
             
              <BurgerConstructor
              setOnCloseFunc={setOnCloseFunc}
                setModalActive={setModalActive}
                setModal={setModal}
              />
            ) : null}
          </main>
          <Modal active={modalActive} setActive={setModalActive} onCloseFunc={onCloseFunc} >
            {modal}
          </Modal>
        </IngredientContext.Provider>
        </DndProvider>
    </div>
  );
};
export default App;
