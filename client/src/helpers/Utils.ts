export const convertToRupiah = (val: number) => {
   return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
   }).format(val)
}
