import AppHeader from "../app-header/app-header";
import styles from "./app-routes.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import Feed from "../../pages/feed/feed";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ResetPassword from "../../pages/reset-password/reset-password";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import FeedId from "../../pages/feed-id/feed-id";
import { FC, useContext, useState } from "react";
import { isMobileContext } from "../../services/context/appContext";
import NotFound from "../../pages/not-found/not-found";
import Out from "../../pages/out/out";
import ProtectedRoute from "../protectedRoute/protectedRoute";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import Loader from "../loader/loader";
import { IApproutesProps } from "../../services/types/types";
import {
  IOrdersProps,
  useSelectorTyped,
  useDispatchTyped,LocationState
} from "../../services/types/types";
const AppRoutes: FC<IApproutesProps> = ({
  auth,
  setOnCloseFunc,
  setModalActive,
  setModal,
  modalActive,
  onCloseFunc,
  modal,
  setAuth,
}) => {
  const { loading, failed } = useSelectorTyped((state) => state.ingredients);
  const { isMobile } = useContext(isMobileContext);
  const [page, setPage] = useState<string>("ingredients");
  const [lastPage, setlastPage] = useState<string | null>(null);
  const [headerActive, setHeaderActive] = useState<boolean>(true);

  const orders = useSelectorTyped((state) => state.ws.messagesAllOrders);
  const ordersUser = useSelectorTyped((state) => state.ws.messagesUserOrders);
  const dispatch = useDispatchTyped();

  function pageChange() {
    if (page == "ingredients") {
      setPage("constructor");
      setHeaderActive(false);
    } else {
      setPage("ingredients");
      setHeaderActive(true);
    }
  }

  let location:LocationState = useLocation();
  let state = location.state;
  const { user } = useSelectorTyped((state) => state.Login);

  return (
    <div>
      {headerActive && <AppHeader auth={auth} />}
      <Routes
        location={modalActive == true ? state?.backgroundLocation : location}
      >
        <Route
          path="/"
          element={
            <main className={styles.main}>
              {!loading && !failed && (!isMobile || page == "ingredients") && (
                <BurgerIngredients
                  setOnCloseFunc={setOnCloseFunc}
                  setModalActive={setModalActive}
                  setModal={setModal}
                  modalActive={modalActive}
                  pageChange={pageChange}
                />
              )}

              {!loading && !failed && (!isMobile || page == "constructor") && (
                <BurgerConstructor
                  setOnCloseFunc={setOnCloseFunc}
                  setModalActive={setModalActive}
                  setModal={setModal}
                  pageChange={pageChange}
                />
              )}
            </main>
          }
        />
        <Route
          path="/Login"
          element={
            //user == null && (
            <Login setAuth={setAuth} setlastPage={setlastPage} auth={auth} lastPage={lastPage} />
            //)
          }
        />

        <Route
          path="/registration"
          element={
            <ProtectedRoute auth={!auth}>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute auth={!auth}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute auth={!auth}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/feed"
          element={
            orders !== null ? (
              <Feed
                setOnCloseFunc={setOnCloseFunc}
                setModalActive={setModalActive}
                setModal={setModal}
                modalActive={modalActive}
                orders={orders[0]}
              />
            ) : (
              <Loader />
            )
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              link="/profile"
              setlastPage={setlastPage}
              auth={auth}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/out"
          element={
            <ProtectedRoute link="/out" setlastPage={setlastPage} auth={auth}>
              <Out setAuth={setAuth}/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute
              link="/profile/orders"
              setlastPage={setlastPage}
              auth={auth}
            >
              {ordersUser !== null ? (
                <ProfileOrders
                  setOnCloseFunc={setOnCloseFunc}
                  setModalActive={setModalActive}
                  setModal={setModal}
                  modalActive={modalActive}
                  orders={ordersUser[0]}
                />
              ) : (
                <Loader />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRoute
              link="/profile/orders/:id"
              setlastPage={setlastPage}
              auth={auth}
            >
              {ordersUser !== null ? <FeedId /> : null}
            </ProtectedRoute>
          }
        />
        <Route path="/feed/:id" element={orders !== null ? <FeedId /> : null} />

        <Route
          path="/ingredients/:id"
          element={
            <div className={`${isMobile ? null : "pt-20"}`}>
              <IngredientInfo />
            </div>
          }
        />

        {state?.backgroundLocation && (
          <Route
            path="/feed/:id"
            element={
              orders !== null ? (
                <Modal active={modalActive} onCloseFunc={onCloseFunc}>
                  {modal}
                </Modal>
              ) : null
            }
          />
        )}

        {state?.backgroundLocation && (
          <Route
            path="/profile-orders/:id"
            element={
              ordersUser !== null ? (
                <Modal active={modalActive} onCloseFunc={onCloseFunc}>
                  {modal}
                </Modal>
              ) : null
            }
          />
        )}

        {state?.backgroundLocation && (
          <Route
            path="/ingredients/:id"
            element={
              <Modal active={modalActive} onCloseFunc={onCloseFunc}>
                {modal}
              </Modal>
            }
          />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default AppRoutes;
