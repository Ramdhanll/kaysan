import config from './config/config'
import logging from './config/logging'
import mongoose from 'mongoose'
import createServer from './api/helpers/server'
import dotenv from 'dotenv'

dotenv.config()

const app = createServer()

// Connect to Mongo
mongoose.set('strictQuery', false)

mongoose
   // @ts-ignore
   .connect(config.mongo.url, config.mongo.options)
   .then(() => {
      logging.info('Mongo connected.')
   })
   .catch((e) => {
      logging.error(e)
   })

// Listen for request
app.listen(config.server.port, () => {
   logging.info(`Server is running at ${config.server.port} ...`)
})
