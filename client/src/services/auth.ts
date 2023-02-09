import axios from 'axios'
import config from '../config/config'
import logging from '../config/logging'
import { IUser } from '../interfaces/IUser'

const Validate = async (
   callback: (error: string | null, user: IUser | null) => void
) => {
   try {
      const response = await axios.get(`${config.server.url}/api/auth/validate`)
      logging.info('Successfuly validated.')
      callback(null, response.data.user)
   } catch (error) {
      logging.error(error)
      callback(`Unable to validated`, null)
   }
}

const Login = async (
   values: any,
   callback: (error: any | null, user: IUser | null) => void
) => {
   try {
      const response = await axios.post(
         `${config.server.url}/api/auth/login`,
         values
      )
      logging.info('Login successfully')
      callback(null, response.data.user)
   } catch (error) {
      logging.error(error)
      callback(error, null)
   }
}

const Register = async (
   values: any,
   callback: (error: any | null, user: IUser | null) => void
) => {
   try {
      const response = await axios.post(
         `${config.server.url}/api/auth/register`,
         values
      )
      logging.info('Register successfully')
      callback(null, response.data.user)
   } catch (error) {
      logging.error(error)
      callback(error, null)
   }
}

const Logout = async () => {
   try {
      const { data } = await axios.post(`${config.server.url}/api/auth/logout`)
      return data
   } catch (error) {
      throw error
   }
}

const AuthService = {
   Validate,
   Login,
   Register,
   Logout,
}

export default AuthService
