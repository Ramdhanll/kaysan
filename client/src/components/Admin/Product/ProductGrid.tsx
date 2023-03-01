import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

import IProduct from '../../../interfaces/IProduct'
import { Button, HStack } from '@chakra-ui/react'
import { MdDelete, MdEdit } from 'react-icons/md'

const gridStyle = { minHeight: 600 }

type Props = {
   products: IProduct[]
   handleOpenModalAddEdit: (data: any) => void
   handleOpenAlertDelete: (data: any) => void
}

const ProductGrid = ({
   products,
   handleOpenModalAddEdit,
   handleOpenAlertDelete,
}: Props) => {
   const filterValue = [
      { name: 'id', operator: 'startsWith', type: 'string', value: '' },
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
      {
         name: 'name',
         header: 'Name',
         defaultFlex: 1,
         sort: (c1: any, c2: any) => {
            return c1.split(' ')[0].localeCompare(c2.split(' ')[0])
         },
         render: ({ cellProps }: { cellProps: any }) => {
            return cellProps.data.name
         },
      },
      {
         name: `provinsi`,
         header: 'Provinsi',
         defaultFlex: 1,
         sort: (c1: any, c2: any) => {
            return c1.split(' ')[0].localeCompare(c2.split(' ')[0])
         },
         render: ({ cellProps }: { cellProps: any }) => {
            return cellProps.data.provinsi
         },
      },
      {
         name: 'kabOrKota',
         header: 'Kabupaten / Kota',
         defaultFlex: 1,
         sort: (c1: any, c2: any) => {
            return c1.split(' ')[0].localeCompare(c2.split(' ')[0])
         },
         render: ({ cellProps }: { cellProps: any }) => {
            return cellProps.data.location.kabOrKota_name
         },
      },
      {
         name: 'kecamatan',
         header: 'Kecamatan',
         defaultFlex: 1,
         sort: (c1: any, c2: any) => {
            return c1.split(' ')[0].localeCompare(c2.split(' ')[0])
         },
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
                     onClick={() => handleOpenAlertDelete(cellProps.data)}
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
