import React, { FC, useContext } from 'react'
import {
   Box,
   Button,
   Center,
   ListItem,
   Text,
   UnorderedList,
   useToast,
   VStack,
   Link as LinkCUI,
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormikInput, FormikPassword } from '../../helpers/Formik'
import AuthService from '../../services/auth'
import logging from '../../config/logging'
import UserContext from '../../contexts/user'
import { Link, useNavigate } from 'react-router-dom'

interface ILogin {}

const Login: FC<ILogin> = () => {
   const { userDispatch } = useContext(UserContext)
   const navigate = useNavigate()
   const toast = useToast()

   const validationSchema = Yup.object({
      email: Yup.string().required('Email diperlukan').email('Email invalid'),
      password: Yup.string().required('Password diperlukan'),
   })

   const handleSubmit = async (values: any, actions: any) => {
      return AuthService.Login(values, (error, user) => {
         if (error) {
            logging.error(error)

            const renderError = (
               <UnorderedList>
                  {error?.response?.data?.errors?.length ? (
                     error.response.data.errors.map(
                        (item: any, i: React.Key | null | undefined) => (
                           <ListItem key={i}>
                              {Object.keys(item.msg).length ? item.msg : ``}
                           </ListItem>
                        )
                     )
                  ) : (
                     <ListItem></ListItem>
                  )}
               </UnorderedList>
            )

            toast({
               title: `Login tidak berhasil`,
               description: renderError,
               status: 'warning',
               isClosable: true,
               position: 'top',
            })
         } else if (user) {
            // toast({
            //    title: `Login berhasil`,
            //    status: 'success',
            //    isClosable: true,
            //    position: 'top',
            // })

            userDispatch({ type: 'login', payload: { user } })
            return navigate('/admin')
         }
      })
   }

   return (
      <Center h='100vh'>
         <Box boxShadow='lg' borderRadius='md' p='20px'>
            <Text
               mb='10px'
               textAlign='center'
               fontSize={['md', 'lg', 'xl', '2xl']}
            >
               Login
            </Text>
            <Formik
               initialValues={{
                  email: '',
                  password: '',
               }}
               onSubmit={handleSubmit}
               validationSchema={validationSchema}
            >
               {(props) => (
                  <Form>
                     <VStack spacing={5}>
                        <FormikInput
                           name='email'
                           label='Email'
                           required={true}
                           type='email'
                        />
                        <FormikPassword
                           name='password'
                           label='Password'
                           required={true}
                        />

                        <Button
                           type='submit'
                           isLoading={props.isSubmitting}
                           variant='solid'
                           colorScheme='blue'
                           w='100%'
                           mb={5}
                        >
                           Masuk
                        </Button>
                     </VStack>
                  </Form>
               )}
            </Formik>

            <Box mt={4}>
               <Link to='/register' style={{ cursor: 'pointer' }}>
                  <LinkCUI>sign up</LinkCUI>
               </Link>
            </Box>
         </Box>
      </Center>
   )
}

export default Login
