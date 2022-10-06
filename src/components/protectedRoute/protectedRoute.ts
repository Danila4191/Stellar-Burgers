import { useEffect, FC } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRouteProps } from "../../services/types/types";

 const ProtectedRoute:FC<ProtectedRouteProps> = ({
  auth,
  link,
  setlastPage,
  children,
}) => {
  let navigate = useNavigate();

  useEffect(():void | any => {
    if (!auth) {
      if (link && setlastPage ) {
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
