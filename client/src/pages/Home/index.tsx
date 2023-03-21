import {
   Avatar,
   Box,
   Button,
   Flex,
   HStack,
   IconButton,
   Link,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   Stack,
   Text,
   useColorModeValue,
   useDisclosure,
} from '@chakra-ui/react'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import Carousel from '../../components/Home/Carousel'
import PropertyItem from '../../components/Home/PropertyItem'
import Navbar from '../../components/Navbar'
import SidebarWithHeader from '../../components/Sidebar'

import Recomendations from '../../components/Home/Recomendations'
import SearchBox from '../../components/Home/SearchBox'
import Footer from '../../components/Footer'
import useSWR from 'swr'

interface IHome {}
const Home: FC<IHome> = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { data: dataProducts } = useSWR(`/api/products`)

   console.log('dataProducts', dataProducts?.products)

   return (
      <Box bg={'whiteAlpha.900'}>
         {/* navbar */}
         <Navbar />

         <Box p={4}>
            <Box mt='60px'>
               <Carousel />
               <Box textAlign='left' width='full' overflow={'hidden'}>
                  <SearchBox />
                  {dataProducts?.products && (
                     <Recomendations products={dataProducts?.products} />
                  )}
               </Box>
            </Box>
         </Box>

         <Footer />
      </Box>
   )
}

export default Home
