import { useEffect, FC } from "react";
import { useNavigate, useLocation, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IProtectedRouteProps } from "../../services/types/types";

 const ProtectedRoute:FC<IProtectedRouteProps> = ({
  auth,
  link,
  setlastPage,
  children,
}) => {
  let navigate = useNavigate();

  useEffect(():void => {
    if (!auth) {
      if (link && setlastPage ) {
        setlastPage(link);
        requestAnimationFrame(() => {
          navigate("/Login");
        });//@ts-ignore
        return null;
      } else {
        requestAnimationFrame(() => {
          navigate("/");
        });
        //@ts-ignore
        return null;
      }
    }
  });

  return children;
}
export default ProtectedRoute;
