import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Template from './routes/Template'
import Titles from './routes/Titles'
import Title from './routes/Title'
import Acquired from './routes/Acquired'
import Wish from './routes/Wish'
import Soon from './routes/Soon'
import Page404 from './routes/Page404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    errorElement: <Page404 />,
    children: [
      { path: '', element: <Titles /> },
      { path: 'titles/:name', element: <Title /> },
      { path: 'acquired', element: <Acquired /> },
      { path: 'characters/:name', element: <Titles /> },
      { path: 'wish', element: <Wish /> },
      { path: 'soon', element: <Soon /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
