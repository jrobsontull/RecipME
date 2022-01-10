import { Navigate } from 'react-router-dom';
import Auth from '../services/auth';

function ProtectedRoute ({ children }) {
    let auth = new Auth();
    const response = auth.verifyToken();
    return response ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;