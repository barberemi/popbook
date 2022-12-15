import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Title from './routes/Title'
import Page404 from './routes/Page404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Title />,
    errorElement: <Page404 />
  },
  {
    path: '/acquired',
    element: <Title />,
    errorElement: <Page404 />
  },
  {
    path: '/soon',
    element: <Title />,
    errorElement: <Page404 />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
