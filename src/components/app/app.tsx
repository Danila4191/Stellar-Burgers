import { useState, useEffect } from "react";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredientsActions/ingredientsActions";
import { getUser } from "../../services/actions/userActions/userActions";
import AppRoutes from "../app-routes/app-routes";
import { isMobileContext } from "../../services/context/appContext";
import { useMediaQuery } from "react-responsive";
import { TouchBackend } from "react-dnd-touch-backend";
import { getCookie } from "../../utils/cookie/cookie";
import { codeSendContext } from "../../services/context/appContext";
import { HashRouter } from "react-router-dom";
import { AppDispatch } from "../../services/store/store";
import { useSelectorTyped,useDispatchTyped } from "../../services/types/types";
const App = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [onCloseFunc, setOnCloseFunc] = useState<() => void>();
  const [modal, setModal] = useState();
  const [codeSend, setCodeSend] = useState(false);

  const isMobile: boolean = useMediaQuery({
    query: "(max-width: 700px)",
  });
  const dispatch = useDispatchTyped();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    if (getCookie("refreshToken") !== undefined) {
      dispatch(getUser());
    }
  }, []);

  const auth = getCookie("refreshToken") == undefined ? false : true;

  return (
    <div>
      <isMobileContext.Provider value={{ isMobile }}>
        <codeSendContext.Provider value={{ codeSend, setCodeSend }}>
          <DndProvider backend={!isMobile ? HTML5Backend : TouchBackend}>
            <HashRouter>
              <AppRoutes
                auth={auth}
                setOnCloseFunc={setOnCloseFunc}
                setModalActive={setModalActive}
                setModal={setModal}
                modalActive={modalActive}
                onCloseFunc={onCloseFunc}
                modal={modal}
              />
              <Modal active={modalActive} onCloseFunc={onCloseFunc}>
                {modal}
              </Modal>
            </HashRouter>
          </DndProvider>
        </codeSendContext.Provider>
      </isMobileContext.Provider>
    </div>
  );
};
export default App;