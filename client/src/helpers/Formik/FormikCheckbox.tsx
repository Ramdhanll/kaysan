import React, { FC } from 'react'
import { Field } from 'formik'
import { FormControl, FormErrorMessage, Checkbox } from '@chakra-ui/react'

interface IFormikCheckbox {
   label?: string
   name: string
   validate?: string
   required?: boolean
   value?: any
}

const FormikCheckbox: FC<IFormikCheckbox> = (props) => {
   const { label, name, validate, required, value, ...rest } = props
   return (
      <Field name={name} validate={validate}>
         {({ field, form }: { field: any; form: any }) => (
            <FormControl
               id={name}
               isInvalid={form.errors[name] && form.touched[name]}
               isRequired={required}
            >
               <Checkbox
                  {...field}
                  {...rest}
                  isChecked={field.value.includes(value)}
               >
                  {label}
               </Checkbox>
               <FormErrorMessage mt='10px' color='red'>
                  {form.errors[name]}
               </FormErrorMessage>
            </FormControl>
         )}
      </Field>
   )
}

// FormikCheckbox.defaultProps = {
//    label: '',
//    name: '',
//    validate: '',
//    required: false,
//    value: undefined,
// }

export default FormikCheckbox
