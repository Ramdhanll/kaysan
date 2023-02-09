import { ReactNode, useContext } from 'react'
import {
   Box,
   Flex,
   Avatar,
   HStack,
   Link,
   IconButton,
   Button,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   MenuDivider,
   useDisclosure,
   useColorModeValue,
   Stack,
   Text,
   UnorderedList,
   ListItem,
   toast,
   useToast,
} from '@chakra-ui/react'
import AuthService from '../services/auth'
import UserContext, { initialUserState } from '../contexts/user'
import { useNavigate, Link as LinkRouter } from 'react-router-dom'

const Links = ['Catalog', 'Tentang Kami']

const NavLink = ({ children }: { children: ReactNode }) => (
   <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
         textDecoration: 'none',
         bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
   >
      {children}
   </Link>
)

export default function Navbar() {
   const { userState, userDispatch } = useContext(UserContext)
   const { isOpen, onOpen, onClose } = useDisclosure()
   const navigate = useNavigate()
   const toast = useToast()

   const handleLogout = async () => {
      try {
         await AuthService.Logout()
         userDispatch({ type: 'logout', payload: initialUserState })
         navigate('login')
      } catch (error: any) {
         const renderError = (
            <UnorderedList>
               {error?.response?.data?.errors?.length ? (
                  error.response.data.errors.map((item: any, i: any) => (
                     <ListItem key={i}>
                        {Object.keys(item.msg).length
                           ? item.msg
                           : `Logout failed`}
                     </ListItem>
                  ))
               ) : (
                  <ListItem>Logout failed</ListItem>
               )}
            </UnorderedList>
         )
         toast({
            title: 'Failed',
            description: renderError,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   return (
      <Box
         position={'fixed'}
         bg={useColorModeValue('gray.100', 'gray.900')}
         px={8}
         w='100vw'
         zIndex={999}
      >
         <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
               size={'md'}
               // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
               aria-label={'Open Menu'}
               display={{ md: 'none' }}
               onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
               <LinkRouter to={'/'}>
                  <Box>
                     <Text fontSize={'2xl'} fontWeight='bold'>
                        Kaysan
                     </Text>
                  </Box>
               </LinkRouter>
               <HStack
                  as={'nav'}
                  spacing={4}
                  display={{ base: 'none', md: 'flex' }}
               >
                  {Links.map((link) => (
                     <NavLink key={link}>{link}</NavLink>
                  ))}
               </HStack>
            </HStack>
            <Flex alignItems={'center'}>
               <Menu>
                  <MenuButton
                     as={Button}
                     rounded={'full'}
                     variant={'link'}
                     cursor={'pointer'}
                     minW={0}
                  >
                     <HStack spacing={3}>
                        <Avatar
                           size={'sm'}
                           src={
                              'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                           }
                        />
                        <Text
                           _hover={{
                              outline: 'none',
                              backgroundColor: 'red',
                           }}
                        >
                           {userState.user.name}
                        </Text>
                     </HStack>
                  </MenuButton>
                  <MenuList>
                     <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
               </Menu>
            </Flex>
         </Flex>

         {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
               <Stack as={'nav'} spacing={4}>
                  {Links.map((link) => (
                     <NavLink key={link}>{link}</NavLink>
                  ))}
               </Stack>
            </Box>
         ) : null}
      </Box>
   )
}
