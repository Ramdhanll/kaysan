import React, { FC, useContext } from 'react'
import { Navigate } from 'react-router'
import logging from '../../config/logging'
import UserContext from '../../contexts/user'
import SidebarAdmin from '../SidebarAdmin'

export interface IAuthRouteProps {
   children?: JSX.Element
}

const AdminRoute: FC<IAuthRouteProps> = ({ children }) => {
   const { userState } = useContext(UserContext)
   console.log('userState', userState)

   if (userState.user._id === '') {
      logging.info('Unauthorized, redirection ....')
      return <Navigate to='/login' />
   } else if (!userState.user.isAdmin) {
      logging.info('Unauthorized, is not admin redirection ....')
      return <Navigate to='/' />
   } else {
      return (
         <>
            <SidebarAdmin>{children}</SidebarAdmin>
         </>
      )
   }
}

export default AdminRoute
