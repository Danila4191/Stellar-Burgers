import AppHeader from "../app-header/app-header";
import styles from "./app-routes.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import Feed from "../../pages/feed/feed";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ResetPassword from "../../pages/reset-password/reset-password";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import FeedId from "../../pages/feed-id/feed-id";
import { useSelector } from "react-redux";
import orders from "../../utils/orders";
import { useContext, useState } from "react";
import { isMobileContext } from "../../services/context/appContext";
import NotFound from "../../pages/not-found/not-found";
import Out from "../../pages/out/out";
import ProtectedRoute from "../protectedRoute/protectedRoute";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";

const AppRoutes = ({
  userId,
  auth,
  setOnCloseFunc,
  setModalActive,
  setModal,
  modalActive,
  active,
  onCloseFunc,
  modal,
}) => {
  const { loading, failed } = useSelector((state) => state.ingredients);
  const { isMobile } = useContext(isMobileContext);
  const [page, setPage] = useState("ingredients");
  const [lastPage, setlastPage] = useState("");
  const [headerActive, setHeaderActive] = useState(true);
  let userOrders = orders.filter((item) => item.userId == userId);

  function pageChange() {
    if (page == "ingredients") {
      setPage("constructor");
      setHeaderActive(false);
    } else {
      setPage("ingredients");
      setHeaderActive(true);
    }
  }

  let location = useLocation();
  let background = location.state && location.state.background;
  console.log(background);

  return (
    <div>
      {headerActive && <AppHeader auth={auth} />}
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <main className={styles.main}>
              {!loading && !failed && (!isMobile || page == "ingredients") && (
                <BurgerIngredients
                  background={background}
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
            <Login setlastPage={setlastPage} auth={auth} lastPage={lastPage} />
          }
        />

        <Route
          path="/registration"
          element={
            <ProtectedRoute auth={!auth}>
              <Register />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute auth={!auth}>
              <ForgotPassword />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute auth={!auth}>
              <ResetPassword />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/feed/:id" element={<FeedId />} />
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRoute auth={auth}>
              <FeedId />
            </ProtectedRoute>
          }
        />
        <Route path="/feed" element={<Feed orders={orders} />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              link="/profile"
              setlastPage={setlastPage}
              auth={auth}
            >
              <Profile />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/out"
          element={
            <ProtectedRoute link="/out" setlastPage={setlastPage} auth={auth}>
              <Out />{" "}
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
              <ProfileOrders orders={userOrders} />{" "}
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
              <FeedId />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/ingredients/:id"
          element={
            <div className={`${isMobile ? null : "pt-20"}`}>
              <IngredientInfo />
            </div>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {background && (
        <Route
          path="/ingredients/:id"
          element={
            <Modal active={modalActive} onCloseFunc={onCloseFunc}>
              {modal}
            </Modal>
          }
        />
      )}
    </div>
  );
};
export default AppRoutes;
/*
<Route
path="/ingredients/:id"
element={
 <IngredientInfo/>
}
/>*/
