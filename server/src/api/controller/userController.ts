import { Request, Response } from 'express'
import logging from '../../config/logging'
import bcrypt from 'bcrypt'
import Users from '../models/userModel'
import { validationResult } from 'express-validator'
import { SALT } from '../../config/jwt'

export const getUsers = async (req: Request, res: Response) => {
   logging.info(`Incoming read all`)

   const pageSize = Number(req.query.limit) || 100
   const page = Number(req.query.page) || 1
   const name = req.query.name || ''
   const email = req.query.email || ''
   const isAdmin = req.query.isAdmin || ''
   const _id = req.query.id || ''

   const _idFilter = _id ? { _id } : {}
   const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
   const emailFilter = email ? { email: { $regex: email, $options: 'i' } } : {}
   const isAdminFilter = isAdmin ? { isAdmin } : {}

   try {
      const count = await Users.countDocuments({
         ..._idFilter,
         ...nameFilter,
         ...emailFilter,
         ...isAdminFilter,
      })

      const users = await Users.find({
         ..._idFilter,
         ...nameFilter,
         ...emailFilter,
         ...isAdminFilter,
      })
         .select('-password')
         .skip(pageSize * (page - 1))
         .limit(pageSize)

      res.status(200).json({
         users,
         page,
         pages: Math.ceil(count / pageSize),
      })
   } catch (error) {
      res.status(500).json({ message: 'Server down!', error })
   }
}

export const getUser = async (req: Request, res: Response) => {
   try {
      const user = await Users.findById(req.params.id)
      if (!user) throw 'User not found'
      return res.status(200).json({ user })
   } catch (error) {
      return res.status(404).json({ message: 'User not found' })
   }
}

export const createUser = async (req: Request, res: Response) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { password } = req.body

   try {
      const user = new Users({
         ...req.body,
         photo: `${process.env.SERVER_URI}/uploads/${req.file?.filename}`,
         password: bcrypt.hashSync(password, SALT),
      })

      const createdUser = await user.save()
      res.status(201).json({ user: createdUser })
   } catch (error) {
      res.status(500).json({ message: 'Failed create user', error })
   }
}

export const updateUser = async (req: Request, res: Response) => {
   const _id = req.params.id
   logging.info(`Incoming update for ${_id}`)

   const { name, email, password, isAdmin, gender } = req.body

   try {
      // validation duplicate email
      if (email !== '') {
         const emailExist = await Users.findOne({ email: req.body.email })
         if (emailExist) throw 'E-mail already in use'
      }

      const user = await Users.findById(_id)
      if (!user) throw 'User not found'

      const values = {
         name: name ? name : user.name,
         email: email ? email : user.email,
         password: password ? password : user.password,
         isAdmin: isAdmin && res.locals.user.isAdmin ? isAdmin : user.isAdmin,
         gender: gender ? gender : user.gender,
         photo: req.file?.filename
            ? `${process.env.SERVER_URI}/uploads/${req.file?.filename}`
            : user.photo,
      }

      user.set(values)

      const userUpdate = await user.save()

      return res.status(200).json({ user: userUpdate })
   } catch (error) {
      return res.status(500).json({ message: 'Failed update user', error })
   }
}

export const deleteUser = async (req: Request, res: Response) => {
   const _id = req.params.id

   try {
      logging.info(`Incoming delete ${_id}`)
      await Users.deleteOne({ _id })

      logging.info('User deleted successfully')
      return res.status(200).json({ message: 'User deleted successfully' })
   } catch (error) {
      logging.error('User failed to delete')
      return res.status(500).json({ message: 'Failed to delete user', error })
   }
}
