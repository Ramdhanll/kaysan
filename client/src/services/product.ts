import axios from 'axios'
import config from '../config/config'
import logging from '../config/logging'

const Create = async (values: any) => {
   logging.info('Creating product...')

   try {
      const { data } = await axios.post(
         `${config.server.url}/api/products`,
         values
      )
      logging.info('product created successfully')

      return data
   } catch (error) {
      logging.error(error)
      throw error
   }
}

const Update = async (id: any, values: any) => {
   logging.info('Updating product...')

   try {
      if (!id) throw new Error('Product tidak ditemukan')

      const { data } = await axios.put(
         `${config.server.url}/api/products/${id}`,
         values
      )
      logging.info('product updated successfully')

      return data
   } catch (error) {
      logging.error(error)
      throw error
   }
}

const Delete = async (id: any) => {
   try {
      const { data } = await axios.delete(`/api/products/${id}`)
      return data
   } catch (error) {
      throw error
   }
}

const ProductService = {
   Delete,
   Create,
   Update,
}

export default ProductService
