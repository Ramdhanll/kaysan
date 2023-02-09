import bcrypt from 'bcrypt'
import { SALT } from '../config/jwt'
import IUser from '../interfaces/IUser'

const salt = bcrypt.genSaltSync(SALT)

export const usersDummy: IUser[] = [
   {
      name: 'admin',
      password: bcrypt.hashSync('password', salt),
      isAdmin: true,
      email: 'admin@gmail.com',
      gender: 'L',
   },
   {
      name: 'Ramadhani',
      password: bcrypt.hashSync('password', salt),
      isAdmin: false,
      email: 'ramadhani@gmail.com',
      gender: 'L',
   },
]
