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
      'Kota/Kabupaten': string
      Kecamatan: string
      detail_location: string
   }
   price: number
}

export default IProduct
