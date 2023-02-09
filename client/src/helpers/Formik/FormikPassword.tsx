import React, { FC, useState } from 'react'
import { Field } from 'formik'
import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   Button,
} from '@chakra-ui/react'

interface IFormikPassword {
   label?: string
   name: string
   validate?: string
   required?: boolean
   value?: any
}

const FormikPassword: FC<IFormikPassword> = (props) => {
   const { label, name, validate, required, ...rest } = props
   const [show, setShow] = useState<boolean>(false)
   const handleClick = () => setShow(!show)

   return (
      <Field name={name} validate={validate}>
         {({ field, form }: { field: any; form: any }) => (
            <FormControl
               id={name}
               isInvalid={form.errors[name] && form.touched[name]}
               isRequired={required}
            >
               {label && <FormLabel color='text'>{label}</FormLabel>}
               <InputGroup size='md'>
                  <Input
                     pr='4.5rem'
                     type={show ? 'text' : 'password'}
                     placeholder='Enter password'
                     {...field}
                     {...rest}
                  />
                  <InputRightElement width='4.5rem'>
                     <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                     </Button>
                  </InputRightElement>
               </InputGroup>
               <FormErrorMessage mt='10px' color='red'>
                  {form.errors[name]}
               </FormErrorMessage>
            </FormControl>
         )}
      </Field>
   )
}

export default FormikPassword
