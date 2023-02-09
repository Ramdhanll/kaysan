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
      url: 'mongodb://localhost/kaysan',
   },
   server: {
      host: `localhost`,
      port: process.env.PORT || 5001,
   },
}

export default config
