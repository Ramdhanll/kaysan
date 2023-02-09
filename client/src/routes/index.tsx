import { createBrowserRouter } from 'react-router-dom'
import AdminRoute from '../components/AdminRoute'
import AuthRoute from '../components/AuthRoute'
import Dashboard from '../pages/Admin/Dashboard'
import Catalog from '../pages/Catalog'
import Detail from '../components/Catalog/Detail'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AdminProduct from '../pages/Admin/Product'

export const router = createBrowserRouter([
   {
      path: '/',
      element: <AuthRoute children={<Home />} />,
   },
   {
      path: '/catalog',
      element: <AuthRoute children={<Catalog />} />,
   },
   {
      path: '/login',
      element: <Login />,
   },
   {
      path: '/register',
      element: <Register />,
   },
   {
      path: '/admin',
      element: <AdminRoute children={<Dashboard />} />,
   },
   {
      path: '/admin/product',
      element: <AdminRoute children={<AdminProduct />} />,
   },
])
