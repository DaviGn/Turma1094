import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function PrivateRoute({
    children
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/signin" />; // fallback route
}
