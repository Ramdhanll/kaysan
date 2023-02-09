import { Request, Response } from 'express'
import { usersDummy } from '../../dummies'
import Users from '../models/userModel'
import { validationResult } from 'express-validator'
import { generateToken } from '../helpers/jwt'
import bcrypt from 'bcrypt'
import logging from '../../config/logging'
import IUser from '../../interfaces/IUser'
import { SALT } from '../../config/jwt'

export const seed = async (req: Request, res: Response) => {
   logging.info('Incoming seed users')
   await Users.deleteMany({})

   const createdUsers = await Users.insertMany(usersDummy)

   logging.info('Users created')
   res.send(createdUsers)
}

export const login = async (req: Request, res: Response) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { email, password } = req.body

   try {
      const user = await Users.findOne({ email })
      if (user) {
         const token = generateToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            gender: user.gender,
            isAdmin: user.isAdmin,
         })
         if (bcrypt.compareSync(password, user.password)) {
            return res
               .status(200)
               .cookie('token', token, { httpOnly: true })
               .json({
                  user: {
                     _id: user._id,
                     name: user.name,
                     email: user.email,
                     photo: user.photo,
                     gender: user.gender,
                     isAdmin: user.isAdmin,
                     token,
                  },
               })
         }
         throw 'Email atau password salah'
      } else {
         throw 'Email belum terdaftar'
      }
   } catch (error: any) {
      logging.error(error)
      res.status(422).json({
         status: 'error',
         errors: [{ msg: error?.name === 'CastError' ? error.message : error }],
         message: error,
      })
   }
}

export const register = async (req: Request, res: Response) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { name, email, password } = req.body

   const user = new Users({
      name,
      email,
      password: bcrypt.hashSync(password, SALT),
   })

   const createdUser = await user.save()
   res.status(200).json({
      user: {
         _id: createdUser._id,
         name: createdUser.name,
         email: createdUser.email,
         photo: createdUser.photo,
         gender: createdUser.gender,
         token: generateToken(createdUser),
      },
   })
}

export const logout = async (req: Request, res: Response) => {
   res.clearCookie('token')
   res.send({ success: true })
}

export const validate = async (req: Request, res: Response) => {
   logging.info('Incoming validate users')

   try {
      const user = await Users.findById(res.locals.user._id)

      if (user) {
         logging.info('user logged')

         return res.status(200).json({
            user: {
               _id: user._id,
               name: user.name,
               email: user.email,
               photo: user.photo,
               gender: user.gender,
               isAdmin: user.isAdmin,
               token: generateToken(user),
            },
         })
      } else {
         return res.status(401).json({ message: 'user not found' })
      }
   } catch (error) {
      logging.error(error)
      return res.status(500).json({ error })
   }
}

/**
 * Upload image from client to cloudinary
 * 
 * import cloudinary from '../helpers/cloudinary.js'
   import streamifier from 'streamifier'
   
 *   if (req.file) {
         streamifier.createReadStream(req.file.buffer).pipe(
            cloudinary.uploader.upload_stream(
               {
                  folder: 'Hilman App',
               },
               async function (error, result) {
                  if (error)
                     return res
                        .status(404)
                        .json({ message: 'error upload photo' })
                  user.photo = result.url

                  const updatedUser = await user.save()
                  res.status(200).json({
                     message: 'User updated successfully!',
                     data: { user: updatedUser },
                  })
               }
            )
         )
      } 
 */
