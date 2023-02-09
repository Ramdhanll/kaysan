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

type Props = {}

const PropertyItemSearch = (props: Props) => {
   const navigate = useNavigate()

   return (
      <Box>
         <Flex
            mr={4}
            flexDirection={'column'}
            bgColor='whiteAlpha.400'
            shadow={'md'}
            rounded={'lg'}
            minW={'100px'}
            cursor='pointer'
         >
            <Image
               src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
               alt='Green double couch with wooden legs'
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
                  Rp. 300.000.000
               </Text>
               <Text
                  color={'blackAlpha.700'}
                  fontWeight={'medium'}
                  fontSize={['sm', 'md']}
               >
                  3 Beds, 2 Bath, 1,800sqft
               </Text>

               <Text
                  color={'blackAlpha.600'}
                  fontWeight={'medium'}
                  fontSize={['sm']}
               >
                  Kelapa dua, Kabupaten Tangerang
               </Text>
            </Box>
         </Flex>
      </Box>
   )
}

export default PropertyItemSearch
