import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import routes from './routes';
import Providers from './hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            gcTime: 5 * 60_000,
            staleTime: 5_000
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Providers>
                <RouterProvider router={routes} />
            </Providers>
        </QueryClientProvider>
    </React.StrictMode>
);
