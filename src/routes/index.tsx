import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/home';
import Users from '../pages/users';
import SignIn from '../pages/signin';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        )
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/users',
        element: (
            <PrivateRoute>
                <Users />
            </PrivateRoute>
        )
    }
]);

export default router;
