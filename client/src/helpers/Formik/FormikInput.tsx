import React, { FC } from 'react'
import { Field } from 'formik'
import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
} from '@chakra-ui/react'

interface IFormikInput {
   label: string
   name: string
   validate?: string
   required?: boolean
   value?: any
   type?: string
   placeholder?: string
}

const FormikInput: FC<IFormikInput> = (props) => {
   const { label, name, type, validate, required, ...rest } = props
   return (
      <Field name={name} validate={validate}>
         {({ field, form }: { field: any; form: any }) => (
            <FormControl
               id={name}
               isInvalid={form.errors[name] && form.touched[name]}
               isRequired={required}
            >
               {label && <FormLabel color='text'>{label}</FormLabel>}
               <Input {...field} {...rest} type={type} autoComplete='off' />
               <FormErrorMessage mt='10px' color='red'>
                  {form.errors[name]}
               </FormErrorMessage>
            </FormControl>
         )}
      </Field>
   )
}

FormikInput.defaultProps = {
   type: 'text',
}

export default FormikInput
