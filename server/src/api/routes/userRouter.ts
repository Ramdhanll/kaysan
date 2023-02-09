import express from 'express'
import {
   createUser,
   deleteUser,
   getUser,
   getUsers,
   updateUser,
} from '../controller/userController'
import multer from 'multer'
import useStorage from '../helpers/useMulter'
import { check } from 'express-validator'
import Users from '../models/userModel'
import { isAdmin, isAuth } from '../middleware/jwt'

const storage = useStorage({ dirStorage: 'users' })
const uploadMulter = multer({ storage })

const router = express.Router()

router.get('/', isAuth, getUsers)
router.get('/:id', getUser)
router.post(
   '/',
   uploadMulter.single('photo'),
   check('name').notEmpty().withMessage('the name field is required!'),
   check('email').notEmpty().withMessage('the email field is required!'),
   check('email').isEmail().withMessage('not an email!'),
   check('email').custom((value) => {
      return Users.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject('E-mail already in use')
      })
   }),
   check('password').notEmpty().withMessage('the password field is required!'),
   createUser
)
router.put('/:id', isAuth, uploadMulter.single('photo'), updateUser)
router.delete('/:id', isAuth, isAdmin, deleteUser)
export default router
