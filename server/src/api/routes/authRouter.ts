import express from 'express'
import {
   login,
   seed,
   register,
   logout,
   validate,
} from '../controller/authController'
import { body } from 'express-validator'
import { isAuth } from '../middleware/jwt'
import Users from '../models/userModel'

const router = express.Router()

router.get('/seed', seed)
router.post(
   '/login',
   body('email').notEmpty().withMessage('Email tidak boleh kosong'),
   body('password').notEmpty().withMessage('Password tidak boleh kosong'),
   login
)

router.post(
   '/register',
   body('name').notEmpty().withMessage('the name field is required!'),
   body('email').notEmpty().withMessage('the email field is required!'),
   body('email').isEmail().withMessage('not an email!'),
   body('email').custom((value) => {
      return Users.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject('E-mail already in use')
      })
   }),
   body('password').notEmpty().withMessage('the password field is required!'),
   register
)

router.post('/logout', isAuth, logout)
router.get('/validate', isAuth, validate)

export default router
