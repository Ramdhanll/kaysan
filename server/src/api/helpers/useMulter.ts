import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

import multer from 'multer'

const storage = ({ dirStorage }: { dirStorage: string }) =>
   multer.diskStorage({
      destination(req: any, file: any, cb: (arg0: null, arg1: string) => void) {
         // Cek apakah folder downloadnya ada
         const downloadFolder = path.resolve(
            __dirname,
            `./src/uploads/${dirStorage}`
         )
         if (!fs.existsSync(downloadFolder)) {
            fs.mkdirSync(downloadFolder)
         }
         cb(null, `src/uploads/${dirStorage}`)
      },
      filename(
         req: any,
         file: { originalname: any },
         cb: (arg0: null, arg1: string) => void
      ) {
         const { originalname } = file
         const format = originalname.slice(originalname.indexOf('.'))
         cb(null, `${Date.now()}${format}`)
      },
   })

export default storage
