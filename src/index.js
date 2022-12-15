import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Template from './routes/Template'
import Title from './routes/Title'
import Page404 from './routes/Page404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    errorElement: <Page404 />,
    children: [
      { path: '', element: <Title /> },
      { path: 'acquired', element: <Title /> },
      { path: 'wish', element: <Title /> },
      { path: 'soon', element: <Title /> },
      { path: 'titles/:name', element: <Title /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
