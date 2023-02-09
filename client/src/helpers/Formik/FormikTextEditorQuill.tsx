import React, { useMemo } from 'react'
import { Field } from 'formik'
import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
} from '@chakra-ui/react'

import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// @ts-ignore
window.katex = katex

function FormikTextEditorQuill(props: any) {
   const { label, name, validate, required, ...rest } = props

   const modules = useMemo(
      () => ({
         toolbar: {
            container: [
               [{ header: [1, 2, 3, false] }],
               ['bold', 'italic', 'underline'],
               [{ list: 'ordered' }, { list: 'bullet' }],
               ['image', 'code-block', 'formula'],
               [{ color: [] }, { background: [] }], // dropdown with defaults from theme
               [{ align: [] }],
            ],
         },
      }),
      []
   )

   return (
      <Field name={name} validate={validate}>
         {({ field, form }: any) => (
            <FormControl
               id={name}
               isInvalid={form.errors[name] && form.touched[name]}
               isRequired={required}
            >
               {label && <FormLabel color='text'>{label}</FormLabel>}
               <Input {...field} {...rest} type='hidden' />
               <ReactQuill
                  theme='snow'
                  modules={modules}
                  onChange={(e) => {
                     form.setFieldValue(name, e)
                  }}
                  value={field.value}
               />
               <FormErrorMessage mt='10px' color='red'>
                  {form.errors[name]}
               </FormErrorMessage>
            </FormControl>
         )}
      </Field>
   )
}

export default FormikTextEditorQuill
