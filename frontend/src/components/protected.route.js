import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ children }) {
    //const {user} = useAuthValue();
    //console.log(user?.token);
    return true ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;