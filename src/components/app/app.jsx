import { useState, useEffect } from "react";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredientsActions/ingredientsActions";
import {
  getToken,
  getUser,
} from "../../services/actions/userActions/userActions";
import AppRoutes from "../app-routes/app-routes";
import { isMobileContext } from "../../services/context/appContext";
import { useMediaQuery } from "react-responsive";
import { TouchBackend } from "react-dnd-touch-backend";
import { WS_CONNECTION_START } from "../../services/actions/soketAction/soketAction";
import { getCookie } from "../../utils/cookie/cookie";
import { codeSendContext } from "../../services/context/appContext";
import { HashRouter } from "react-router-dom";
const App = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modal, setModal] = useState();
  const [onCloseFunc, setOnCloseFunc] = useState();
  const user = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const [codeSend, setCodeSend] = useState(false);

  const isMobile = useMediaQuery({
    query: "(max-width: 700px)",
  });

  useEffect(() => {
    dispatch(getIngredients());
 
  }, []);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    })
  }, []);

  useEffect(() => {
    if (getCookie("refreshToken") !== undefined && user.failed == true) {
      //  setTimeout(() => {
      console.log("токент обновлен");
      dispatch(
        getToken({
          token: getCookie("refreshToken"),
        }),
        getUser()
      );
 
      //   }, 600);
    }
  }, [user.failed]);
  useEffect(() => {
    if (getCookie("refreshToken") !== undefined) {
      dispatch(getUser());
    }
  }, []);

  const auth = getCookie("refreshToken") == undefined ? false : true;
  const userId = user.userData == null ? null : user.userData.email;

  return (
    <div>
      <isMobileContext.Provider value={{ isMobile }}>
        <codeSendContext.Provider value={{ codeSend, setCodeSend }}>
          <DndProvider backend={!isMobile ? HTML5Backend : TouchBackend}>
            <HashRouter>
              <AppRoutes
                userId={userId}
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