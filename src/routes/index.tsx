import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/home';
import Users from '../pages/users/list';
import SignIn from '../pages/signin';
import PrivateRoute from './PrivateRoute';
import UsersForm from '../pages/users/editor';

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
    },
    {
        path: '/users/editor/:id',
        element: (
            <PrivateRoute>
                <UsersForm />
            </PrivateRoute>
        )
    }
]);

export default router;
