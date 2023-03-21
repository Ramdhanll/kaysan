import React from 'react'
import {
   Image,
   Stack,
   Heading,
   Text,
   Divider,
   ButtonGroup,
   Button,
   Box,
   Flex,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import IProduct from '../../interfaces/IProduct'
import { convertToRupiah } from '../../helpers/Utils'

type Props = {
   product: IProduct
}

const PropertyItem = ({ product }: Props) => {
   const navigate = useNavigate()

   console.log('pp', product)
   return (
      <Link to={`catalog?id=${product._id}`}>
         <Flex
            mr={4}
            flexDirection={'column'}
            bgColor='whiteAlpha.400'
            shadow={'md'}
            rounded={'lg'}
            minW={'200px'}
            cursor='pointer'
         >
            <Image
               src={product.images[0].url_image}
               alt=''
               w={360}
               h={180}
               roundedTop={'lg'}
            />

            <Box p={3}>
               <Text
                  color={'blackAlpha.700'}
                  fontWeight={'bold'}
                  fontSize={['lg', 'xl']}
               >
                  {convertToRupiah(product.price)}
               </Text>
               <Text
                  color={'blackAlpha.700'}
                  fontWeight={'medium'}
                  fontSize={['md', 'lg']}
               >
                  {product.bedroom} Beds, {product.bathroom} Bath,{' '}
                  {product.area} sqft
               </Text>

               <Text
                  color={'blackAlpha.600'}
                  fontWeight={'medium'}
                  fontSize={['md']}
               >
                  {product.location.kecamatan_name},{' '}
                  {product.location.kabOrKota_name}
               </Text>
            </Box>
         </Flex>
      </Link>
   )
}

export default PropertyItem
