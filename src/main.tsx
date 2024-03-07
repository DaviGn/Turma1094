import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import routes from './routes';
import Providers from './hooks';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Providers>
            <RouterProvider router={routes} />
        </Providers>
    </React.StrictMode>
);
