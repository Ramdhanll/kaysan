import { DEFAULT_USER, IUser } from './../interfaces/IUser'
import React, { createContext } from 'react'

export interface IUserState {
   user: IUser
}

export interface IUserActions {
   type: 'login' | 'logout' | 'authenticate'
   payload: IUserState
}

export const initialUserState: IUserState = {
   user: DEFAULT_USER,
}

export const userReducer = (state: IUserState, action: IUserActions) => {
   let { user } = action.payload

   switch (action.type) {
      case 'login':
         localStorage.setItem('user', JSON.stringify(user))
         return { user }
      case 'logout':
         localStorage.removeItem('user')
         return initialUserState
      default:
         return state
   }
}

export type TUserContextProps = {
   userState: IUserState
   userDispatch: React.Dispatch<IUserActions>
}

const UserContext = createContext<TUserContextProps>({
   userState: initialUserState,
   userDispatch: () => {},
})

export const UserContextConsumer = UserContext.Consumer
export const UserContextProvider = UserContext.Provider

export default UserContext
