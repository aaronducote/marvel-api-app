import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Root from './pages/Root'
import Characters from './pages/Characters'
import SingleCharacter from './pages/SingleCharacter'
import Comics from './pages/Comics'
import SingleComic from './pages/SingleComic'
import Events from './pages/Events'
import SingleEvent from './pages/SingleEvent'
import Series from './pages/Series'
import SingleSeries from './pages/SingleSeries'
import ErrorPage from './pages/ErrorPage'
import GlobalStyle from './pages/GlobalStyle'

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "characters", element: <Characters /> },     // For character search queries
            { path: "characters/:id", element: <SingleCharacter /> },      // For a single character
            { path: "comics", element: <Comics /> },     // For comic search queries
            { path: "comics/:id", element: <SingleComic /> },     // For a single comic
            { path: "events", element: <Events /> },     // For event search queries
            { path: "events/:id", element: <SingleEvent /> },     // For a single cevent
            { path: "series", element: <Series /> },     // For series search queries
            { path: "series/:id", element: <SingleSeries /> },     // For a single cevent
            { path: "*", element: <ErrorPage /> },  // Catches all other paths 
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)
