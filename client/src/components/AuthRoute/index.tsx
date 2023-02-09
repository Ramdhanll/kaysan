import React, { FC, useContext } from 'react'
import { Navigate } from 'react-router'
import logging from '../../config/logging'
import UserContext from '../../contexts/user'

export interface IAuthRouteProps {
   children?: JSX.Element
}

const AuthRoute: FC<IAuthRouteProps> = ({ children }) => {
   const { userState } = useContext(UserContext)

   if (userState.user._id === '') {
      logging.info('Unauthorized, redirection ....')
      return <Navigate to='/login' />
   } else {
      return <> {children} </>
   }
}

export default AuthRoute
