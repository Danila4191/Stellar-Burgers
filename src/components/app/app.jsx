import { useState, useEffect } from "react";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/actions";
import AppRoutes from "../app-routes/app-routes";
import { isMobileContext } from "../../services/context/appContext";
import { useMediaQuery } from "react-responsive";
import { TouchBackend } from "react-dnd-touch-backend";
const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modal, setModal] = useState();
  const [onCloseFunc, setOnCloseFunc] = useState();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({
    query: "(max-width: 700px)",
  });

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const auth = true;
  const userId = "1";
  return (
    <div>
      <isMobileContext.Provider value={{ isMobile }}>
        <DndProvider backend={!isMobile ? HTML5Backend : TouchBackend}>
          <AppRoutes
            userId={userId}
            auth={auth}
            setOnCloseFunc={setOnCloseFunc}
            setModalActive={setModalActive}
            setModal={setModal}
            modalActive={modalActive}
          />
          <Modal active={modalActive} onCloseFunc={onCloseFunc}>
            {modal}
          </Modal>
        </DndProvider>
      </isMobileContext.Provider>
    </div>
  );
};
export default App;
