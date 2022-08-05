import AppHeader from "../app-header/app-header";
import styles from "./app-routes.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const AppRoutes = ({
  userId,
  auth,
  setOnCloseFunc,
  setModalActive,
  setModal,
  modalActive,
}) => {
  const { loading, failed } = useSelector((state) => state.ingredients);
  const { isMobile } = useContext(isMobileContext);
  const [page, setPage] = useState("ingredients");
  let userOrders = orders.filter((item) => item.userId == userId);

  function pageChange() {
    if (page == "ingredients") {
      setPage("constructor");
    } else {
      setPage("ingredients");
    }
  }

  return (
    <BrowserRouter>
      <AppHeader auth={auth} />
      <Routes>
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
        <Route path="/Login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route exact path="/feed" element={<Feed orders={orders} />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route
          exact
          path="/profile/orders"
          element={<ProfileOrders orders={userOrders} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/feed/:id" element={<FeedId />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
