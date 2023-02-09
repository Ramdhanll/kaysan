import React, { FC } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'

interface IRegister {}

const Register: FC<IRegister> = () => {
   const navigate = useNavigate()
   const toast = useToast()

   const validationSchema = Yup.object({
      name: Yup.string().required('Nama diperlukan'),
      email: Yup.string().required('Email diperlukan').email('Email invalid'),
      password: Yup.string().required('Password diperlukan'),
      c_password: Yup.string().oneOf(
         [Yup.ref('password'), null],
         'Password must match'
      ),
   })

   const handleSubmit = async (values: any, actions: any) => {
      return AuthService.Register(values, (error, user) => {
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
               title: `Register tidak berhasil`,
               description: renderError,
               status: 'warning',
               isClosable: true,
               position: 'top',
            })
         } else if (user) {
            toast({
               title: `Register berhasil`,
               status: 'success',
               isClosable: true,
               position: 'top',
            })

            return navigate('/login')
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
               Register
            </Text>
            <Formik
               initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  c_password: '',
               }}
               onSubmit={handleSubmit}
               validationSchema={validationSchema}
            >
               {(props) => (
                  <Form>
                     <VStack spacing={5}>
                        <FormikInput name='name' label='Nama' required={true} />
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
                        <FormikPassword
                           name='c_password'
                           label='Konfirmasi Password'
                           required={true}
                        />
                        <Button
                           type='submit'
                           isLoading={props.isSubmitting}
                           variant='solid'
                           colorScheme='blue'
                           w='100%'
                        >
                           Daftar
                        </Button>
                     </VStack>
                  </Form>
               )}
            </Formik>
            <Box mt={4}>
               <Link to='/login' style={{ cursor: 'pointer' }}>
                  <LinkCUI>sign in</LinkCUI>
               </Link>
            </Box>
         </Box>
      </Center>
   )
}

export default Register
