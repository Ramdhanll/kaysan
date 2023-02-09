import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import Filter from '../../components/Detail/Filter'
import Navbar from '../../components/Navbar'
import Detail from '../../components/Catalog/Detail'
import products from '../../data/products.json'
import IProduct from '../../interfaces/IProduct'

type Props = {}

const Catalog = (props: Props) => {
   const productDummy: IProduct = {
      name: products[0].name,
      area: products[0].area,
      bathroom: products[0].bathroom,
      bedroom: products[0].bedroom,
      description: products[0].description,
      id: products[0].id,
      images: products[0].images,
      location: products[0].location,
      price: products[0].price,
   }

   const [selectedProduct, setSelectedProduct] =
      useState<IProduct>(productDummy)

   return (
      <Box maxW='78vw'>
         <Navbar />
         <Box
            display={'flex'}
            justifyContent='space-between'
            // position={'relative'}
            flexDir='row'
         >
            <Filter />
            <Detail product={selectedProduct} />
         </Box>
      </Box>
   )
}

export default Catalog
