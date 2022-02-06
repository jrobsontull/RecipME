import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../services/auth.context';

function ProtectedRoute ({ children }) {
    const { user } = useContext(AuthContext);
    
    return user.isVerifying ? (
        <p>Is loading...</p>
    ) : user.verified ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;