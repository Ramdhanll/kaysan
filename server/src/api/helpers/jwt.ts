import jwt from 'jsonwebtoken'

export const generateToken = (user: any) => {
   return jwt.sign(
      {
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         photo: user.photo,
         gender: user.gender,
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
   )
}
