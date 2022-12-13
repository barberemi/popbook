import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home'
import Page404 from './routes/Page404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Page404 />
  },
  {
    path: '/acquired',
    element: <Home />,
    errorElement: <Page404 />
  },
  {
    path: '/soon',
    element: <Home />,
    errorElement: <Page404 />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
