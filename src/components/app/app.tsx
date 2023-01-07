import { useState, useEffect } from "react";
import Modal from "../modal/modal";
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
import { useDispatchTyped } from "../../services/types/types";
const App = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [onCloseFunc, setOnCloseFunc] = useState<(() => void)|undefined>(undefined);
  const [modal, setModal] = useState<React.ReactElement|null>(null);
  const [codeSend, setCodeSend] = useState<boolean>(false);
const [auth,setAuth]= useState<boolean>(false)
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

  useEffect(() => {
    setAuth(getCookie("refreshToken") == undefined ? false : true)

  }, [] );
  //const auth = getCookie("refreshToken") == undefined ? false : true;
 
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
                setAuth={setAuth}
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
