import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const Unprotected: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default Unprotected;
