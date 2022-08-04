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
import { NavLink } from "react-router-dom";
import FeedId from "../../pages/feed-id/feed-id";
import { useSelector } from "react-redux";
import orders from "../../utils/orders";
import { useContext, useState } from "react";
import { isMobileContext } from "../../services/context/appContext";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
const AppRoutes = ({
  userId,
  auth,
  setOnCloseFunc,
  setModalActive,
  setModal,
  modalActive,
}) => {
  const { loading, failed } = useSelector((state) => state.ingredients);
  const total = useSelector((state) => state.total.total);
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
              {!loading && !failed ? (
                !isMobile ? (
                  <BurgerIngredients
                    setOnCloseFunc={setOnCloseFunc}
                    setModalActive={setModalActive}
                    setModal={setModal}
                    modalActive={modalActive}
                  />
                ) : (
                  page == "ingredients" && (
                    <BurgerIngredients
                      setOnCloseFunc={setOnCloseFunc}
                      setModalActive={setModalActive}
                      setModal={setModal}
                      modalActive={modalActive}
                    />
                  )
                )
              ) : null}

              {!loading && !failed ? (
                !isMobile ? (
                  <BurgerConstructor
                    setOnCloseFunc={setOnCloseFunc}
                    setModalActive={setModalActive}
                    setModal={setModal}
                  />
                ) : (
                  page == "constructor" && (
                    <BurgerConstructor
                      setOnCloseFunc={setOnCloseFunc}
                      setModalActive={setModalActive}
                      setModal={setModal}
                    />
                  )
                )
              ) : null}
          
              {isMobile && page == "constructor" && (
                <div className={`${styles.scrollbar__constructor}`}>
                  <div
                    className={`${styles.scrollbar__container__constructor}`}
                  >
                    <h2 className={`pl-10 text text_type_main-large `}>
                    Заказ
                    </h2>

                    <button onClick={pageChange} className={` ${styles.button__close} pr-8`}></button>
                  </div>
                </div>
              )}
              {(isMobile &&  page !== "constructor") && (
                <div className={`${styles.scrollbar}`}>
                  <div className={`${styles.scrollbar__container} pl-2`}>
                    <p className={`pr-2 text text_type_digits-default `}>
                      {total}
                    </p>
                    <CurrencyIcon />
                  </div>
                  <div className={`${styles.button} pt-4 pr-3`}>
                    <Button onClick={
                      //page == "constructor" ? openModal : 
                      pageChange
                      
                      } type="primary" size="small">
                     <p className={` text text_type_main-small `}>{
                     //page == "constructor" ? "оформить заказ" :
                      "Смотреть заказ "}</p>
                    </Button>
                  </div>
                </div>
              )}
                     
            </main>
          }
        />




        <Route path="/Login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route exact path="/feed" element={<Feed orders={orders} />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/orders"   element={<ProfileOrders orders={userOrders} />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/feed/:id" element={<FeedId />} />
        <Route
          path="*"
          element={
            <div>
              <h1>страница не найдена</h1>
              <NavLink
                to="/"
                className={`${styles.link} text_type_main-medium`}
              >
                <h2 className={`${styles.link} `}> вернуться?</h2>
              </NavLink>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
