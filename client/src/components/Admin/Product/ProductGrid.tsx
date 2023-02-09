import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import IProduct from '../../../interfaces/IProduct'
import { Button, HStack } from '@chakra-ui/react'
import { MdDelete, MdEdit } from 'react-icons/md'

const gridStyle = { minHeight: 600 }

type Props = {
   products: IProduct[]
   handleOpenModalAddEdit: (data: any) => void
}

const ProductGrid = ({ products, handleOpenModalAddEdit }: Props) => {
   const filterValue = [
      { name: 'name', operator: 'startsWith', type: 'string', value: '' },
      {
         name: 'provinsi',
         operator: 'startsWith',
         type: 'string',
         value: '',
      },
      {
         name: 'kabOrKota',
         operator: 'startsWith',
         type: 'string',
         value: '',
      },
      {
         name: 'kecamatan',
         operator: 'startsWith',
         type: 'string',
         value: '',
      },
      { name: 'price', operator: 'gte', type: 'number', value: 0 },
   ]

   const columns = [
      {
         name: 'id',
         header: 'Id',
         defaultVisible: false,
         defaultWidth: 80,
         type: 'number',
      },
      { name: 'name', header: 'Name', defaultFlex: 1 },
      {
         name: 'provinsi',
         header: 'Provinsi',
         defaultFlex: 1,
         render: ({ cellProps }: { cellProps: any }) => {
            return cellProps.data.location.provinsi_name
         },
      },
      {
         name: 'kabOrKota',
         header: 'Kabupaten / Kota',
         defaultFlex: 1,
         render: ({ cellProps }: { cellProps: any }) => {
            return cellProps.data.location.kabOrKota_name
         },
      },
      {
         name: 'kecamatan',
         header: 'Kecamatan',
         defaultFlex: 1,
         render: ({ cellProps }: { cellProps: any }) => {
            return cellProps.data.location.kecamatan_name
         },
      },
      { name: 'price', header: 'Price', defaultFlex: 1 },
      {
         name: 'actions',
         header: 'Actions',
         defaultFlex: 1,
         render: ({ value, cellProps }: { value: any; cellProps: any }) => {
            console.log('cellProps', cellProps.data)
            return (
               <HStack spacing={1}>
                  <Button
                     variant='solid'
                     colorScheme='cyan'
                     // onClick={() => console.log(value, cellProps)}
                     size='sm'
                     onClick={() =>
                        handleOpenModalAddEdit({
                           isAdd: false,
                           product: cellProps.data,
                        })
                     }
                  >
                     <MdEdit size='16px' />
                  </Button>
                  <Button
                     variant='outline'
                     colorScheme='red'
                     onClick={() => console.log(value, cellProps)}
                     size='sm'
                  >
                     <MdDelete size='16px' />
                  </Button>
               </HStack>
            )
         },
      },
   ]

   return (
      <ReactDataGrid
         idProperty='id'
         style={gridStyle}
         defaultFilterValue={filterValue}
         columns={columns}
         dataSource={products}
      />
   )
}

export default ProductGrid
