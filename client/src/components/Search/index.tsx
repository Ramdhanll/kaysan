import { Input, InputGroup } from '@chakra-ui/react'
import React, { FC, memo, useEffect, useRef, useState } from 'react'

interface ISearch {
   setQuerySearch: (e: string) => void
   bg?: string
   borderColor?: string
   placeholder?: string
   borderRadius?: string
   color?: string
   px?: string
}

const Search: FC<ISearch> = memo(({ setQuerySearch, ...rest }) => {
   const [searchTyping, setSearchTyping] = useState<string>('')
   const timeoutRef = useRef<any>(null)

   useEffect(() => {
      if (timeoutRef.current !== null) {
         clearInterval(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
         timeoutRef.current = null
         setQuerySearch(searchTyping)
      }, 500)
   }, [searchTyping, setQuerySearch])

   return (
      <InputGroup w={['200px', '220px', '230px', '250px']}>
         <Input {...rest} onChange={(e) => setSearchTyping(e.target.value)} />
      </InputGroup>
   )
})

export default Search
