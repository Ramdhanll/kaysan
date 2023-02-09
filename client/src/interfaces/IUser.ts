import { isAdmin } from './../../../server/src/api/middleware/jwt'
export interface IUser {
   _id: string
   name: string
   email: string
   isAdmin: boolean
}

export const DEFAULT_USER: IUser = {
   _id: '',
   name: '',
   email: '',
   isAdmin: false,
}
