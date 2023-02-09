import React, { FC } from 'react'
import { Text } from '@chakra-ui/react'

interface IHeading {}

const Heading: FC<IHeading> = ({ children }) => {
   return (
      <Text
         color='gray.900'
         fontSize={['md', 'lg', 'xl', '2xl']}
         fontWeight='500'
      >
         {children}
      </Text>
   )
}

export default Heading
