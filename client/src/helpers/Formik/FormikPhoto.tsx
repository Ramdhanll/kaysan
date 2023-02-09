import React, { FC } from 'react'
import { Field } from 'formik'
import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
} from '@chakra-ui/react'

interface IFormikPhoto {
   label?: string
   name: string
   validate?: string
   required?: boolean
   value?: any
   onChange: (e: any) => void
   ref?: any
}

const FormikPhoto: FC<IFormikPhoto> = (props) => {
   const { label, name, validate, required, onChange, ref, ...rest } = props
   return (
      <Field name={name} validate={validate}>
         {({ field, form }: { field: any; form: any }) => (
            <FormControl
               id={name}
               isInvalid={form.errors[name] && form.touched[name]}
               isRequired={required}
            >
               {label && <FormLabel color='text'>{label}</FormLabel>}
               <Input
                  {...field}
                  {...rest}
                  type='file'
                  onChange={(e) => onChange(e)}
                  ref={ref}
               />
               <FormErrorMessage mt='10px' color='red'>
                  {form.errors[name]}
               </FormErrorMessage>
            </FormControl>
         )}
      </Field>
   )
}

export default FormikPhoto
