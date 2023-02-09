import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import React, { FC } from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'

interface IPagination {
   page: number
   pages: number
   handlePagination: (e: number) => void
}

const Pagination: FC<IPagination> = ({ page, pages, handlePagination }) => {
   return (
      <Box
         display='flex'
         justifyContent='center'
         alignItems='center'
         mt={[5, 0, 0, 0]}
      >
         <Button
            variant='ghost'
            _focus={{ outline: 'none' }}
            _active={{ backgroundColor: '', color: 'gray.400' }}
            _hover={{ backgroundColor: '' }}
            onClick={() => handlePagination(page - 1)}
            disabled={page === 1 || pages === 1}
         >
            <MdArrowBack />
         </Button>
         {page > 2 && (
            <>
               <Button
                  size='xs'
                  p={0}
                  m={0}
                  _focus={{ outline: 'none' }}
                  variant='none'
                  onClick={() => {
                     handlePagination(1)
                  }}
               >
                  <Text fontSize='xs'>1</Text>
               </Button>
               <Button
                  size='xs'
                  variant='none'
                  _focus={{ outline: 'none' }}
                  disabled={Math.sign(page - 10) === 1 ? false : true}
                  onClick={() => {
                     handlePagination(page - 10)
                  }}
                  p={0}
                  m={0}
               >
                  <Text fontSize='xs'>...</Text>
               </Button>
            </>
         )}
         {/* {[...Array(pages).keys()].map((x, i) => ( */}
         {Array.from(Array(pages).keys()).map((x, i) => (
            <Button
               size='xs'
               _focus={{ outline: 'none' }}
               variant='none'
               onClick={() => {
                  handlePagination(x + 1)
               }}
               {...(page === x + 1 && style.active)}
               display={x < page - 2 || x > page ? 'none' : ''}
               _hover={{
                  opacity: 0.8,
               }}
               key={i}
            >
               <Text fontSize='xs' backgroundColor='textSecondary'>
                  {x + 1}
               </Text>
            </Button>
         ))}
         {page !== pages && page + 1 !== pages && (
            <>
               <Button
                  size='xs'
                  variant='none'
                  _focus={{ outline: 'none' }}
                  disabled={page + 10 > pages ? true : false}
                  onClick={() => {
                     handlePagination(page + 10)
                  }}
                  p={0}
                  m={0}
               >
                  <Text fontSize='xs'>...</Text>
               </Button>
               <Button
                  size='xs'
                  p={0}
                  m={0}
                  _focus={{ outline: 'none' }}
                  variant='none'
                  onClick={() => {
                     handlePagination(pages)
                  }}
               >
                  <Text fontSize='xs'>{pages}</Text>
               </Button>
            </>
         )}
         <Button
            variant='ghost'
            _focus={{ outline: 'none' }}
            _active={{ backgroundColor: '', color: 'gray.400' }}
            _hover={{ backgroundColor: '' }}
            onClick={() => handlePagination(page + 1)}
            disabled={page === pages}
         >
            <MdArrowForward />
         </Button>
      </Box>
   )
}

const style = {
   active: {
      backgroundColor: '#27375A',
      color: 'white',
      fontWeight: '700',
      fontSize: '14px',
   },
}

export default Pagination
