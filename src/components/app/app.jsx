import { useState, useEffect } from "react";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import OrderInfo from "../order-info/order-info";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients, getToken } from "../../services/actions/actions";
import AppRoutes from "../app-routes/app-routes";
import { isMobileContext } from "../../services/context/appContext";
import { useMediaQuery } from "react-responsive";
import { TouchBackend } from "react-dnd-touch-backend";
import { getUser } from "../../services/actions/actions";
import { getCookie } from "../../services/actions/actions";
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
    if (getCookie("refreshToken") !== undefined) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (getCookie("refreshToken") !== undefined && user.failed == true) {
      //  setTimeout(() => {
      dispatch(
        getToken({
          token: getCookie("refreshToken"),
        })
      );
      //   }, 600);
    }
  }, [user.failed]);

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
                active={modalActive}
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
