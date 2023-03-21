import {
   Avatar,
   Box,
   Button,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   HStack,
   IconButton,
   Link,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   Text,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react'
import React from 'react'
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import DetailImages from './DetailImages'
import Filter from '../Detail/Filter'
import Navbar from '../Navbar'
import Simple from '../Navbar'
import IProduct from '../../interfaces/IProduct'
import { convertToRupiah } from '../../helpers/Utils'
import { IoIosBed } from 'react-icons/io'
import { FaBath, FaWhatsapp } from 'react-icons/fa'
import ResultSearch from './ResultSearch'

type Props = {
   product: IProduct | any
}

const Detail = ({ product }: Props) => {
   return (
      <Box w={'full'} px={4} py={4} ml='0px' mt={'0px'} mb={'40px'}>
         <Flex justifyContent={'space-between'}>
            <DetailImages images={product.images} />
            <Box flex='1' ml={2} alignItems={'start'} px={4} textAlign='left'>
               <Text fontWeight='bold' fontSize={['4xl']} color='gray.700'>
                  {product.name}
               </Text>
               <Text mt='-1' mb='2' color={'gray.500'} fontSize='lg'>
                  {`${product.location.kabOrKota_name}, Kecamatan ${product.location.kecamatan_name}`}
               </Text>
               <Text fontWeight='bold' fontSize={['4xl']} color='yellow.400'>
                  {convertToRupiah(product.price)}
               </Text>
               {/* Bedroom, bathroom, area */}
               <Flex mt={5} justifyContent={'flex-start'} gap={24}>
                  <Box>
                     <Text
                        fontSize={'lg'}
                        color='gray.500'
                        fontWeight={'medium'}
                     >
                        Bedrooms
                     </Text>
                     <HStack gap={1}>
                        <Text fontSize={'3xl'} fontWeight='bold'>
                           {product.bedroom}
                        </Text>
                        <Box>
                           <IoIosBed size={'32px'} />
                        </Box>
                     </HStack>
                  </Box>
                  <Box>
                     <Text
                        fontSize={'lg'}
                        color='gray.500'
                        fontWeight={'medium'}
                     >
                        Bathrooms
                     </Text>
                     <HStack gap={1}>
                        <Text fontSize={'3xl'} fontWeight='bold'>
                           {product.bathroom}
                        </Text>
                        <Box>
                           <FaBath size={'32px'} />
                        </Box>
                     </HStack>
                  </Box>
                  <Box>
                     <Text
                        fontSize={'lg'}
                        color='gray.500'
                        fontWeight={'medium'}
                     >
                        Area
                     </Text>
                     <HStack gap={1}>
                        <Text fontSize={'3xl'} fontWeight='bold'>
                           {product.area} ft<sup>2</sup>
                        </Text>
                     </HStack>
                  </Box>
               </Flex>
               {/* Description */}
               <Box mt={2}>
                  <Text
                     fontSize={['2xl', '3xl']}
                     fontWeight='bold'
                     color='gray.700'
                  >
                     Description
                  </Text>
                  <Text
                     fontSize={['xs', 'md']}
                     color='gray.500'
                     dangerouslySetInnerHTML={{ __html: product.description }}
                  >
                     {/* {product.description} */}
                  </Text>
               </Box>
               <Box mt={3}>
                  <Link href='https://wa.me/6282210499859' target={'_blank'}>
                     <Button colorScheme={'blue'}>
                        <HStack alignItems={'center'}>
                           <FaWhatsapp size={24} />
                           <Text>Hubungi Seller</Text>
                        </HStack>
                     </Button>
                  </Link>
               </Box>
            </Box>
         </Flex>

         {/* <Box overflow={'hidden'}>
            <ResultSearch />
         </Box> */}
      </Box>
   )
}

export default Detail
