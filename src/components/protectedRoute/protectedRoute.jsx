import { useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* 
 Как мне кажется такая функция проще читается и так же универсально работает.
 Не дает доступ неавторизированным пользователям к страницам для авторизованных, а
 в противоположной ситуации возвращает на главную, чтобы пользователь понял, что на ту страницу доступа нет.

 */
 function ProtectedRoute({
  auth,
  link,
  setlastPage,
  children,
}) {
  let navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      if (link) {
        setlastPage(link);
        requestAnimationFrame(() => {
          navigate("/Login");
        });
        return null;
      } else {
        requestAnimationFrame(() => {
          navigate("/");
        });
        return null;
      }
    }
  });

  return children;
}
export default ProtectedRoute;
