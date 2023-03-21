import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { convertToRupiah } from '../../helpers/Utils'
import IProduct from '../../interfaces/IProduct'

type Props = {
   product: IProduct
   setSelectedProduct: (val: IProduct) => void
}

const ProductItem = ({ setSelectedProduct, product }: Props) => (
   <Box>
      <Flex
         mr={4}
         flexDirection={'column'}
         bgColor='whiteAlpha.400'
         shadow={'md'}
         rounded={'lg'}
         minW={'140px'}
         cursor='pointer'
         onClick={() => setSelectedProduct(product)}
      >
         <Image
            src={product.images[0].url_image}
            alt=''
            w={300}
            h={180}
            roundedTop={'lg'}
         />

         <Box p={3}>
            <Text
               color={'blackAlpha.700'}
               fontWeight={'bold'}
               fontSize={['md', 'lg']}
            >
               {convertToRupiah(product.price)}
            </Text>
            <Text
               color={'blackAlpha.700'}
               fontWeight={'medium'}
               fontSize={['sm', 'md']}
            >
               {product.bedroom} Beds, {product.bathroom} Bath, {product.area}{' '}
               sqft
            </Text>

            <Text
               color={'blackAlpha.600'}
               fontWeight={'medium'}
               fontSize={['sm']}
            >
               {product.location.kecamatan_name},{' '}
               {product.location.kabOrKota_name}
            </Text>
         </Box>
      </Flex>
   </Box>
)

export default ProductItem
