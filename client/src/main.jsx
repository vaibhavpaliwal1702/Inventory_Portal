import React from 'react'
import ReactDOM from 'react-dom/client'
import App,{loader as AppLoader} from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error_Page from './components/Error_Page.jsx';
import Index from './components/Index.jsx';
import Login,{action as LoginAction} from './components/Login.jsx';
import SignUp, {action as SignupAction} from './components/SignUp.jsx';
import User,{loader as UserLoader} from './components/User.jsx';
import Item,{loader as ItemLoader} from './content/Item.jsx';
import AddProduct,{action as AddAction} from './content/AddProduct.jsx';
import 'react-loading-skeleton/dist/skeleton.css'
import 'bootstrap/dist/css/bootstrap.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: AppLoader,
    errorElement: <Error_Page />,
    children:[{
      errorElement: <Error_Page />,
      children:[
        {
          index: true,
          element: <Index />,
        },
        {
          path:"/login",
          element:<Login />, 
          action: LoginAction,
        },
        {
          path:"/signup",
          element:<SignUp />,
          action: SignupAction,
        },
        {
          path:"/user/:id",
          element:<User />,
          loader: UserLoader,
        },
        {
          path:"/item/:id",
          element:<Item />,
          loader:ItemLoader,
        },
        {
          path:"/AddProduct",
          element: <AddProduct />,
          action: AddAction,
        }
      ]
    }]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
