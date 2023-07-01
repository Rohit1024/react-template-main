import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function ProvateRoute({ children }: Props) {
  const { user } = useAuth();

  // Render the children if the user is authenticated or redirect to the login page
  return user ? children : <Navigate to='/login' />;
}
