import { Request, Response } from 'express'
import logging from '../../config/logging'
import Products from '../models/productModel'
import { validationResult } from 'express-validator'
import fs from 'fs'

export const getProducts = async (req: Request, res: Response) => {
   logging.info(`Incoming get products`)

   try {
      const products = await Products.find({})

      res.status(200).json({
         products,
      })
   } catch (error) {
      logging.error(error)
      res.status(500).json({ message: 'Server down!', error })
   }
}

export const createProduct = async (req: Request, res: Response) => {
   logging.info('Incoming create product')

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const {
      images,
      provinsi,
      provinsi_name,
      kabOrKota,
      kabOrKota_name,
      kecamatan,
      kecamatan_name,
      kelurahan,
      kelurahan_name,
      detail_location,
   } = req.body

   try {
      const imagesUrls: any = []

      images.map((imageBase64: any) => {
         const res = saveImage(imageBase64)
         imagesUrls.push({ url_image: res })
      })

      const createProduct = new Products({
         ...req.body,
         location: {
            provinsi,
            provinsi_name,
            kabOrKota,
            kabOrKota_name,
            kecamatan,
            kecamatan_name,
            kelurahan,
            kelurahan_name,
            detail_location,
         },
         images: imagesUrls,
      })

      const createdProduct = await createProduct.save()
      logging.info('Product created successfully')

      res.status(201).json({
         status: 'success',
         message: 'Product has been created',
         product: createdProduct,
      })
   } catch (error) {
      logging.error(error)
      res.status(500).json({ message: 'Server down!', error })
   }
}

const saveImage = (base64: string) => {
   try {
      // let imageBuffer = Buffer.alloc(base64.length, base64, 'base64')
      let imageBuffer = Buffer.from(
         base64.substring(base64.indexOf(',') + 1),
         'base64'
      )

      let filename = `product-${generateRandomString()}.jpg`
      fs.writeFileSync(`./src/uploads/products/${filename}`, imageBuffer)

      return filename
   } catch (error) {
      console.log('error')
      return ''
   }
}

function generateRandomString() {
   return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      Date.now()
   )
}
