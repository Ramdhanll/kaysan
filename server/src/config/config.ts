import dotenv from 'dotenv'
dotenv.config()

const config = {
   mongo: {
      options: {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         socketTimeoutMS: 30000,
         keepAlive: true,
         autoIndex: false,
         retryWrites: false,
      },
      url: process.env.MONGO_URI,
   },
   server: {
      uri: process.env.SERVER_URI,
      port: process.env.EXPRESS_PORT || 5001,
   },
}

export default config
