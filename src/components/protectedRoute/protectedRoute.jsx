import { useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


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
