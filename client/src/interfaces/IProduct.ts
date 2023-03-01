interface IProduct {
   id: number
   name: string
   description: string
   bedroom: number
   bathroom: number
   area: number
   images: string[]
   location: {
      provinsi: string
      provinsi_name: string
      kabOrKota: string
      kabOrKota_name: string
      kecamatan: string
      kecamatan_name: string
      detail_location: string
   }
   price: number
   provinsi: string
   kabOrKota: string
   kecamatan: string
}

export default IProduct
