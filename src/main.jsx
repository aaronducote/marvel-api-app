import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Root from './pages/Root'
import Characters from './pages/Characters'
import Comics from './pages/Comics'
import Events from './pages/Events'
import Series from './pages/Series'
import ErrorPage from './pages/ErrorPage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "characters", element: <Characters /> },     // For character search queries
            { path: "comics", element: <Comics /> },     // For comic search queries
            { path: "events", element: <Events /> },     // For event search queries
            { path: "series", element: <Series /> },     // For series search queries
            { path: "*", element: <ErrorPage /> },  // Catches all other paths 
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)
