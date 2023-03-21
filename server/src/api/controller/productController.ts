import { Request, Response } from 'express'
import logging from '../../config/logging'
import Products from '../models/productModel'
import { validationResult } from 'express-validator'
import fs from 'fs'
import config from '../../config/config'

export const getProduct = async (req: Request, res: Response) => {
   logging.info('Incoming get product')

   try {
      const product = await Products.findById(req.params.id)

      if (!product)
         return res.status(404).json({ message: 'Product not found' })

      res.status(200).json({ product })
   } catch (error) {
      res.status(500).json({ message: 'Server down!', error })
   }
}

export const getProducts = async (req: Request, res: Response) => {
   logging.info(`Incoming get products`)

   try {
      const products = await Products.find({})

      const result = []

      for (const product of products) {
         result.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            bedroom: product.bedroom,
            bathroom: product.bathroom,
            area: product.area,
            price: product.price,
            images: product.images,
            location: product.location,
            isRecommended: product.isRecommended,
            provinsi: product.location.provinsi_name,
            kabOrKota: product.location.kabOrKota_name,
            kecamatan: product.location.kecamatan_name,
         })
      }

      // console.log(products)
      res.status(200).json({
         products: result,
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

export const updateProduct = async (req: Request, res: Response) => {
   const _id = req.params.id
   logging.info(`Incoming update product for ${_id}`)

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const {
      name,
      description,
      bedroom,
      bathroom,
      area,
      price,
      isRecommended,
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
      // validations
      const product = await Products.findById(_id)
      if (!product) throw 'Product not found'

      const imagesUrls: any = []

      images.map((imageBase64: any) => {
         const res = saveImage(imageBase64)
         imagesUrls.push({ url_image: res })
      })

      const values = {
         name: name ? name : product.name,
         description: description ? description : product.description,
         bedroom: bedroom ? bedroom : product.bedroom,
         bathroom: bathroom ? bathroom : product.bathroom,
         area: area ? area : product.area,
         price: price ? price : product.price,
         isRecommended: isRecommended,
         images: imagesUrls,
         location: {
            provinsi: provinsi ? provinsi : product.location.provinsi,
            provinsi_name: provinsi_name
               ? provinsi_name
               : product.location.provinsi_name,
            kabOrKota: kabOrKota ? kabOrKota : product.location.kabOrKota,
            kabOrKota_name: kabOrKota_name
               ? kabOrKota_name
               : product.location.kabOrKota_name,
            kecamatan: kecamatan ? kecamatan : product.location.kecamatan,
            kecamatan_name: kecamatan_name
               ? kecamatan_name
               : product.location.kecamatan_name,
            kelurahan: kelurahan ? kelurahan : product.location.kelurahan,
            kelurahan_name: kelurahan_name
               ? kelurahan_name
               : product.location.kelurahan_name,
            detail_location: detail_location
               ? detail_location
               : product.location.detail_location,
         },
      }

      product.set(values)
      const productUpdate = await product.save()

      logging.info('Product created successfully')

      res.status(201).json({
         status: 'success',
         message: 'Product has been updated',
         product: productUpdate,
      })
   } catch (error) {
      logging.error(error)
      res.status(500).json({ message: 'Server down!', error })
   }
}

export const deleteProduct = async (req: Request, res: Response) => {
   const _id = req.params.id

   try {
      logging.info(`Incoming delete for ${_id}`)
      await Products.deleteOne({ _id })

      logging.info('Product deleted successfully')
      return res.status(200).json({ message: 'Product deleted successfully' })
   } catch (error) {
      logging.error('Product failed to delete')
      return res.status(500).json({ error })
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

      return `${config.server.uri}/uploads/${filename}`
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
