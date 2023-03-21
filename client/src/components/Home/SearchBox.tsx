import { Box, Button, Flex, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const SearchBox = (props: Props) => {
   const navigate = useNavigate()

   const handleClickCari = () => {
      console.log(formSearchProduct)
      // navigate('catalog')
   }

   const [provinces, setProvinces] = useState([])
   const [kabOrKota, setKabOrKota] = useState([])
   const [kecamatans, setKecamatans] = useState([])

   const [formSearchProduct, setFormSearchProduct] = useState<any>(null)

   useEffect(() => {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
         .then((response) => response.json())
         .then((data) => {
            const rawProvinces: any = []

            // sort array of object var data by name
            data
               .sort(function (a: any, b: any) {
                  return a.name.localeCompare(b.name) // sort by name in ascending order
               })
               .map((item: any, i: number) => {
                  rawProvinces.push({
                     key: i,
                     name: item.name,
                     value: item.id,
                  })
               })

            setProvinces(rawProvinces)
         })
   }, [])

   const handleChangeProvinsi = (id: any, name: any) => {
      setFormSearchProduct({
         provinsi: id,
         provinsi_name: name,
         kabOrKota: '',
         kabOrKota_name: '',
         kecamatan: '',
         kecamatan_name: '',
      })

      setKabOrKota([])
      setKecamatans([])

      // get kabOrKota
      fetch(
         `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`
      )
         .then((response) => response.json())
         .then((data) => {
            const rawKabOrKota: any = []

            data
               .sort(function (a: any, b: any) {
                  return a.name.localeCompare(b.name) // sort by name in ascending order
               })
               .map((item: any, i: number) => {
                  rawKabOrKota.push({
                     key: i,
                     name: item.name,
                     value: item.id,
                  })
               })

            setKabOrKota(rawKabOrKota)
         })
   }

   const handleChangeKabOrKota = (id: any, name: any) => {
      setFormSearchProduct({
         ...formSearchProduct,
         kabOrKota: id,
         kabOrKota_name: name,
         kecamatan: '',
         kecamatan_name: '',
      })

      setKecamatans([])

      // get kabOrKota
      fetch(
         `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
      )
         .then((response) => response.json())
         .then((data) => {
            const rawKecamatan: any = []

            data
               .sort(function (a: any, b: any) {
                  return a.name.localeCompare(b.name) // sort by name in ascending order
               })
               .map((item: any, i: number) => {
                  rawKecamatan.push({
                     key: i,
                     name: item.name,
                     value: item.id,
                  })
               })

            setKecamatans(rawKecamatan)
         })
   }

   const handleChangeKecamatan = (id: any, name: any) => {
      setFormSearchProduct({
         ...formSearchProduct,
         kecamatan: id,
         kecamatan_name: name,
      })

      // get Kecamatan
      fetch(
         `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`
      )
         .then((response) => response.json())
         .then((data) => {
            const rawKelurahan: any = []

            data.map((item: any, i: number) => {
               rawKelurahan.push({
                  key: i,
                  name: item.name,
                  value: item.id,
               })
            })
         })
   }

   return (
      <Box
         paddingX={[0, 0, 0, 10]}
         paddingY={4}
         overflow={'hidden'}
         w={'full'}
         position={'relative'}
         bg={'white'}
         mt={3}
      >
         <Box shadow={'md'} p={10}>
            <Text fontSize={['lg', '2xl']} mb={3} fontWeight={'medium'}>
               Jelajahi Properti
            </Text>

            <Flex gap={3}>
               <Select
                  placeholder='Provinsi'
                  onChange={(e: any) => {
                     var index = e.nativeEvent.target.selectedIndex
                     handleChangeProvinsi(
                        e.target.value,
                        e.nativeEvent.target[index].text
                     )
                  }}
               >
                  {provinces.map((province: any) => (
                     <option value={province.value}>{province.name}</option>
                  ))}
               </Select>
               <Select
                  placeholder='Kota / Kabupaten'
                  onChange={(e: any) => {
                     var index = e.nativeEvent.target.selectedIndex
                     handleChangeKabOrKota(
                        e.target.value,
                        e.nativeEvent.target[index].text
                     )
                  }}
               >
                  {kabOrKota.map((item: any) => (
                     <option value={item.value}>{item.name}</option>
                  ))}
               </Select>
               <Select
                  placeholder='Kecamatan'
                  onChange={(e: any) => {
                     var index = e.nativeEvent.target.selectedIndex
                     handleChangeKecamatan(
                        e.target.value,
                        e.nativeEvent.target[index].text
                     )
                  }}
               >
                  {kecamatans.map((item: any) => (
                     <option value={item.value}>{item.name}</option>
                  ))}
               </Select>

               <Button colorScheme={'blue'} w={'lg'} onClick={handleClickCari}>
                  Cari
               </Button>
            </Flex>
         </Box>
      </Box>
   )
}

export default SearchBox
