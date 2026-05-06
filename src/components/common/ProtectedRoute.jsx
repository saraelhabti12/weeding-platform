import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../context/userStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useUserStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // User role not allowed for this route
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
