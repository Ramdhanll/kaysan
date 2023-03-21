import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Filter from '../../components/Detail/Filter'
import Navbar from '../../components/Navbar'
import Detail from '../../components/Catalog/Detail'
import products from '../../data/products.json'
import IProduct from '../../interfaces/IProduct'
import ResultSearch from '../../components/Catalog/ResultSearch'
import useSWR from 'swr'
import ProductItem from '../../components/Catalog/ProductItem'

import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ProductService from '../../services/product'

type Props = {
   product?: IProduct
}

function useQuery() {
   const { search } = useLocation()

   return React.useMemo(() => new URLSearchParams(search), [search])
}

const Catalog = ({ product }: Props) => {
   let query = useQuery()
   const id = query.get('id')

   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
   const { data: dataProducts } = useSWR(`/api/products`)
   console.log('product', product)

   useEffect(() => {
      const getProductById = async (id: any) => {
         console.log('run')
         try {
            const { product } = await ProductService.GetProductByID(id)
            if (product != null) {
               setSelectedProduct(product)
            }
            console.log('res', product)
         } catch (error) {
            console.log('error', error)
         }
      }

      getProductById(id)
   }, [])

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      })
   }

   const handleClickItem = (product: IProduct) => {
      scrollToTop()
      setSelectedProduct(product)
   }

   console.log(dataProducts)
   return (
      <Box maxW='100vw'>
         <Navbar />
         <Box
            display={'flex'}
            justifyContent='space-between'
            // position={'relative'}
            flexDir='row'
         >
            <Filter />
            <Box
               w={'full'}
               px={4}
               py={4}
               ml='320px'
               mt={'70px'}
               bg='yellow.200  '
            >
               {/* <Box overflow={'hidden'}>
                  <ResultSearch />
               </Box> */}

               {selectedProduct && <Detail product={selectedProduct} />}

               <Box
                  display='flex'
                  flexWrap='wrap'
                  gap={8}
                  w='full'
                  justifyContent={'space-around'}
               >
                  {/* {Array(20)
                     .fill(1)
                     .map(() => (
                        <ProductItem product={} setSelectedProduct={setSelectedProduct} />
                     ))} */}

                  {dataProducts?.products &&
                     dataProducts.products.map((product: IProduct) => (
                        <ProductItem
                           product={product}
                           setSelectedProduct={handleClickItem}
                        />
                     ))}
               </Box>
            </Box>
            {/* <Detail product={[]} /> */}
         </Box>
      </Box>
   )
}

export default Catalog
