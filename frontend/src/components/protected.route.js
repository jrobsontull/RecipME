import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../utils/auth.context';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user.isVerifying) {
    return <p>Is loading...</p>;
  }

  if (user.verified === false) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
