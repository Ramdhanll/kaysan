import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import logging from '../../config/logging'

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
   logging.info('Validating jwt token ...')

   const token = req.cookies.token
   if (!token) {
      logging.warn('Token is null, unauthorized ...')
      return res.status(401).json({ message: 'you must be logged in' })
   }

   try {
      jwt.verify(
         token,
         process.env.JWT_SECRET || 'secret',
         (err: any, decoded: any) => {
            if (err) {
               logging.warn('Token invalid, unauthorized ...')
               return res.status(401).json({ message: 'Invalid token', err })
            }

            logging.info('Token valid ...')
            res.locals.user = decoded
            next()
         }
      )
   } catch (err: any) {
      logging.error(err)
      res.clearCookie('token')
      return res.status(400).send(err.message)
   }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
   if (res.locals.user && res.locals.user.isAdmin) {
      logging.info('Valid admin token')
      next()
   } else {
      logging.error('Invalid admin token')
      res.status(401).json({ message: 'Invalid admin token' })
   }
}
