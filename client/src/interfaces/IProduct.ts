interface IProduct {
   _id: number
   name: string
   description: string
   bedroom: number
   bathroom: number
   area: number
   images: {
      url_image: string
      id: string
   }[]
   location: {
      provinsi: string
      provinsi_name: string
      kabOrKota: string
      kabOrKota_name: string
      kecamatan: string
      kecamatan_name: string
      detail_location: string
      kelurahan: string
      kelurahan_name: string
   }
   price: number
   provinsi: string
   kabOrKota: string
   kecamatan: string
}

export default IProduct
