import mongoose, { Schema, Document, mongo } from 'mongoose'
const { ObjectId } = mongoose.Types

export interface IProductModel extends Document {
   _id?: string | object // type object for query search in controller
   name: string | object // type object for query search in controller
   description: string
   bedroom: number
   bathroom: number
   area: number
   price: number
   images: {
      url_image: string
   }[]
   location: {
      provinsi: string
      provinsi_name: string
      kabOrKota: string
      kabOrKota_name: string
      kecamatan: string
      kecamatan_name: string
      kelurahan: string
      kelurahan_name: string
      detail_location: string
   }
   isRecommended: boolean
}

const productSchema = new Schema<IProductModel>(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
      },
      bedroom: {
         type: Number,
         required: true,
      },
      bathroom: {
         type: Number,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      area: {
         type: Number,
         required: true,
      },
      images: [
         {
            url_image: {
               type: String,
            },
         },
      ],
      location: {
         provinsi: {
            type: String,
            required: true,
         },
         provinsi_name: {
            type: String,
            required: true,
         },
         kabOrKota: {
            type: String,
            required: true,
         },
         kabOrKota_name: {
            type: String,
            required: true,
         },
         kecamatan: {
            type: String,
            required: true,
         },
         kecamatan_name: {
            type: String,
            required: true,
         },
         kelurahan: {
            type: String,
            required: true,
         },
         kelurahan_name: {
            type: String,
            required: true,
         },
         detail_location: {
            type: String,
            required: true,
         },
      },
      isRecommended: {
         type: Boolean,
         required: true,
      },
   },
   {
      timestamps: true,
   }
)

const Products = mongoose.model<IProductModel>('Products', productSchema)

export default Products
