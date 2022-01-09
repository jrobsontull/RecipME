import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ children }) {
    const auth = false;
    return auth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;