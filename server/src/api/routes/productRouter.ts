import express from 'express'
import {
   createProduct,
   getProducts,
   deleteProduct,
   updateProduct,
   getProduct,
} from '../controller/productController'
import { isAdmin, isAuth } from '../middleware/jwt'
const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)

router.post('/', isAuth, isAdmin, createProduct)

router.put('/:id', isAuth, isAdmin, updateProduct)
// router.put('/:id', isAuth, isAdmin, uploadMulter.single('photo'), updateProduct)
router.delete('/:id', isAuth, isAdmin, deleteProduct)

export default router
