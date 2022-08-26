import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProtectedRoute({ auth, link, setlastPage, children }) {
  const user = useSelector((state) => state.User.loading);

  let navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      if (link) {
        setlastPage(link);
        requestAnimationFrame(() => {
          navigate("/Login", { replace: true });
        });
        return null;
      } else {
        requestAnimationFrame(() => {
          navigate("/", { replace: true });
        });
        return null;
      }
    }
  });

  return children;
}
export default ProtectedRoute;
