import React, { FC } from 'react'
import { Field } from 'formik'
import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Textarea,
} from '@chakra-ui/react'

interface IFormikTextArea {
   label: string
   name: string
   required: boolean
   validate?: string
   h: any
   placeholder?: string
}

const FormikTextArea: FC<IFormikTextArea> = (props) => {
   const { label, name, validate, required, h, placeholder, ...rest } = props
   return (
      <Field name={name} validate={validate}>
         {({ field, form }: { field: any; form: any }) => (
            <FormControl
               id={name}
               isInvalid={form.errors[name] && form.touched[name]}
               isRequired={required}
               // h='110px'
               h={h}
            >
               {label && <FormLabel color='text'>{label}</FormLabel>}

               <Textarea {...field} {...rest} placeholder={placeholder} />
               <FormErrorMessage mt='10px' color='red'>
                  {form.errors[name]}
               </FormErrorMessage>
            </FormControl>
         )}
      </Field>
   )
}

export default FormikTextArea
