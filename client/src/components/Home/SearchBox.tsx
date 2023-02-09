import { Box, Button, Flex, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const SearchBox = (props: Props) => {
   const navigate = useNavigate()

   const handleClickCari = () => {
      navigate('catalog')
   }
   return (
      <Box
         paddingX={[0, 0, 0, 10]}
         paddingY={4}
         overflow={'hidden'}
         w={'full'}
         position={'relative'}
         bg={'white'}
         mt={3}
      >
         <Box shadow={'md'} p={10}>
            <Text fontSize={['lg', '2xl']} mb={3} fontWeight={'medium'}>
               Jelajahi Properti
            </Text>

            <Flex gap={3}>
               <Select placeholder='Provinsi'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
               </Select>
               <Select placeholder='Kabupaten'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
               </Select>
               <Select placeholder='Kecamatan'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
               </Select>

               <Button colorScheme={'blue'} w={'lg'} onClick={handleClickCari}>
                  Cari
               </Button>
            </Flex>
         </Box>
      </Box>
   )
}

export default SearchBox
