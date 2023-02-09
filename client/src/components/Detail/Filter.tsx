import {
   Box,
   Button,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   HStack,
   Input,
   InputGroup,
   InputLeftAddon,
   Select,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {}

const Filter = (props: Props) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [placement, setPlacement] = React.useState('right')

   const [bathroom, setBathroom] = useState('2')
   const [bedroom, setBedroom] = useState('2')

   return (
      <Box
         w='xs'
         bg={'white.800'}
         shadow='md'
         position='fixed'
         px={4}
         py={4}
         overflow='auto'
         mt='70px'
      >
         <VStack
            gap={3}
            justifyContent={'start'}
            alignItems={'start'}
            w={'full'}
         >
            <Box w={'full'}>
               <Text
                  textAlign={'left'}
                  fontWeight={'medium'}
                  fontSize={['xl']}
                  color='gray.800'
                  mb={3}
               >
                  Location
               </Text>
               <Flex gap={3} flexDir='column'>
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
               </Flex>
            </Box>

            <Box w={'full'}>
               <Text
                  textAlign={'left'}
                  fontWeight={'medium'}
                  fontSize={['xl']}
                  color='gray.800'
                  mb={3}
               >
                  Property Room
               </Text>
               <Box>
                  <Text fontSize={'md'} color='gray.500' textAlign={'left'}>
                     Bedroom
                  </Text>
                  <HStack gap={1} mt={2}>
                     <Button
                        colorScheme={bedroom == '1' ? 'green' : 'gray'}
                        onClick={() => setBedroom('1')}
                     >
                        1
                     </Button>
                     <Button
                        colorScheme={bedroom == '2' ? 'green' : 'gray'}
                        onClick={() => setBedroom('2')}
                     >
                        2
                     </Button>
                     <Button
                        colorScheme={bedroom == '3' ? 'green' : 'gray'}
                        onClick={() => setBedroom('3')}
                     >
                        3
                     </Button>
                     <Button
                        colorScheme={bedroom == '4' ? 'green' : 'gray'}
                        onClick={() => setBedroom('4')}
                     >
                        4
                     </Button>
                     <Button
                        colorScheme={bedroom == 'max' ? 'green' : 'gray'}
                        onClick={() => setBedroom('max')}
                     >
                        5+
                     </Button>
                  </HStack>
               </Box>
               <Box mt={1}>
                  <Text fontSize={'md'} color='gray.500' textAlign={'left'}>
                     Bathroom
                  </Text>
                  <HStack gap={1} mt={2}>
                     <Button
                        colorScheme={bathroom == '1' ? 'green' : 'gray'}
                        onClick={() => setBathroom('1')}
                     >
                        1
                     </Button>
                     <Button
                        colorScheme={bathroom == '2' ? 'green' : 'gray'}
                        onClick={() => setBathroom('2')}
                     >
                        2
                     </Button>
                     <Button
                        colorScheme={bathroom == '3' ? 'green' : 'gray'}
                        onClick={() => setBathroom('3')}
                     >
                        3
                     </Button>
                     <Button
                        colorScheme={bathroom == '4' ? 'green' : 'gray'}
                        onClick={() => setBathroom('4')}
                     >
                        4
                     </Button>
                     <Button
                        colorScheme={bathroom == 'max' ? 'green' : 'gray'}
                        onClick={() => setBathroom('max')}
                     >
                        5+
                     </Button>
                  </HStack>
               </Box>
            </Box>

            <Box w={'full'}>
               <Text
                  textAlign={'left'}
                  fontWeight={'medium'}
                  fontSize={['xl']}
                  color='gray.800'
                  mb={3}
               >
                  Budget
               </Text>
               <VStack>
                  <InputGroup>
                     <InputLeftAddon children='Rp' />
                     <Input type='number' placeholder='Price minimum' />
                  </InputGroup>
                  <InputGroup>
                     <InputLeftAddon children='Rp' />
                     <Input type='number' placeholder='Price maximum' />
                  </InputGroup>
               </VStack>
            </Box>

            <Box w={'full'}>
               <Button colorScheme={'green'} w='full'>
                  APPLY
               </Button>
            </Box>
         </VStack>
      </Box>
   )
}

export default Filter
