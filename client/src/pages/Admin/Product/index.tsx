import {
   Box,
   Button,
   Flex,
   Table,
   Tbody,
   Td,
   Text,
   Th,
   Thead,
   Tr,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   VStack,
   Image as ImageChakra,
   useToast,
   HStack,
   Spinner,
   FormControl,
   FormLabel,
   Select,
   Input,
   Textarea,
   Checkbox,
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
} from '@chakra-ui/react'
// import { Form, Formik } from 'formik'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import Heading from '../../../components/AdminHeading'
import Pagination from '../../../components/Pagination'
import Search from '../../../components/Search'
import IPage from '../../../interfaces/IPage'
import * as Yup from 'yup'
import { FormikInput, FormikPhoto, FormikSelect } from '../../../helpers/Formik'
import logging from '../../../config/logging'
import ProductService from '../../../services/product'
import useSWR, { mutate } from 'swr'
import { MdDelete, MdEdit } from 'react-icons/md'
import AlertDialogDelete from '../../../components/AlertDialogDelete'
import PreviewPhoto from '../../../components/PreviewPhoto'
import FormikTextEditorQuill from '../../../helpers/Formik/FormikTextEditorQuill'
import FormikTextArea from '../../../helpers/Formik/FormikTextArea'
import ImageUploading from 'react-images-uploading'
import axios from 'axios'

import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import ProductGrid from '../../../components/Admin/Product/ProductGrid'
import imageToBase64 from 'image-to-base64'

// @ts-ignore
window.katex = katex

interface IProduct {
   _id?: string
   name: string
   price: number
   bedroom: number
   bathroom: number
   area: number
   description: string
   location: {
      provinsi: string
      provinsi_name: string
      kabOrKota: string
      kabOrKota_name: string
      kecamatan: string
      kecamatan_name: string
      kelurahan: string
      kelurahan_name: string
      detail_location: string
   }
   images?: {
      url_image: string
      _id: string
   }[]
   isRecommended: boolean
}

interface IProductFormValues {
   name: string
   price: number
   description: string
   provinsi: string
}

const AdminProduct: FC<IPage> = () => {
   const [productSelected, setProductSelected] = useState<IProduct | null>()

   const [productForm, setProductForm] = useState<IProduct>({
      name: '',
      price: 0,
      bedroom: 0,
      bathroom: 0,
      area: 0,
      description: '',
      location: {
         provinsi: '',
         provinsi_name: '',
         kabOrKota: '',
         kabOrKota_name: '',
         kecamatan: '',
         kecamatan_name: '',
         kelurahan: '',
         kelurahan_name: '',
         detail_location: '',
      },
      isRecommended: false,
   })

   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()

   const [images, setImages] = useState([])
   const maxNumber = 69
   const onChangeImage = (imageList: any, addUpdateIndex: any) => {
      // data for submit
      setImages(imageList)
   }

   const [isAdd, setIsAdd] = useState<boolean>(true)

   const [page, setPage] = useState<number>(1)
   const [searchValue, setSearchValue] = useState<string>('')

   const [provinces, setProvinces] = useState([])
   const [kabOrKota, setKabOrKota] = useState([])
   const [kecamatans, setKecamatans] = useState([])
   const [kelurahans, setKelurahans] = useState([])

   const formikRef = useRef<any>(null)

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
      setProductForm({
         ...productForm,
         location: {
            ...productForm.location,
            provinsi: id,
            provinsi_name: name,
            kabOrKota: '',
            kabOrKota_name: '',
            kecamatan: '',
            kecamatan_name: '',
            kelurahan: '',
            kelurahan_name: '',
         },
      })

      setKabOrKota([])
      setKecamatans([])
      setKelurahans([])

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
      setProductForm({
         ...productForm,
         location: {
            ...productForm.location,
            kabOrKota: id,
            kabOrKota_name: name,
            kecamatan: '',
            kecamatan_name: '',
            kelurahan: '',
            kelurahan_name: '',
         },
      })

      setKecamatans([])
      setKelurahans([])

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
      setProductForm({
         ...productForm,
         location: {
            ...productForm.location,
            kecamatan: id,
            kecamatan_name: name,
            kelurahan: '',
            kelurahan_name: '',
         },
      })

      setKelurahans([])

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

            setKelurahans(rawKelurahan)
         })
   }

   const { data: dataProducts, error: errorProducts } = useSWR(`/api/products`)

   const handlePagination = (i: number) => {
      setPage(i)
   }

   // SECTION ADD AND EDIT PRODUCT
   const [imagesUpdate, setImagesUpdate] = useState<any>([])

   const handleOpenModalAddEdit = ({
      isAdd,
      product,
   }: {
      isAdd: boolean
      product?: IProduct
   }) => {
      setImagesUpdate([])
      setImages([])

      setIsAdd(isAdd)

      if (product) {
         setProductSelected(product)

         handleChangeProvinsi(
            product.location.provinsi,
            product.location.provinsi_name
         )
         handleChangeKabOrKota(
            product.location.kabOrKota,
            product.location.kabOrKota_name
         )
         handleChangeKecamatan(
            product.location.kecamatan,
            product.location.kecamatan_name
         )
         console.log('product', product)
         setProductForm({
            ...productForm,
            name: product.name,
            price: product.price,
            bedroom: product.bedroom,
            bathroom: product.bathroom,
            area: product.area,
            description: product.description,
            location: {
               provinsi: product.location.provinsi,
               provinsi_name: product.location.provinsi_name,
               kabOrKota: product.location.kabOrKota,
               kabOrKota_name: product.location.kabOrKota_name,
               kecamatan: product.location.kecamatan,
               kecamatan_name: product.location.kecamatan_name,
               kelurahan: product.location.kelurahan,
               kelurahan_name: product.location.kelurahan_name,
               detail_location: product.location.detail_location,
            },
            isRecommended: product.isRecommended,
         })

         if (product.images?.length) {
            const imagesUrl: any = []
            product.images.map((image) => {
               imagesUrl.push(image.url_image)
            })

            setImagesUpdate(imagesUrl)
         }
      }
      onOpen()
   }

   const [photoFile, setPhotoFile] = useState('')
   const [photoPrev, setPhotoPrev] = useState<any>('')

   const [isErrorValidationPhotos, setIsErrorValidationPhotos] = useState(false)
   const [isSubmitLoading, setIsSubmitLoading] = useState(false)

   const handleSubmit = async (ev: any) => {
      ev.preventDefault()

      setIsSubmitLoading(true)

      // // validation images must be more then 4
      // if (images.length < 4) {
      //    setIsErrorValidationPhotos(true)
      //    setIsSubmitLoading(false)
      //    return false
      // } else {
      //    setIsErrorValidationPhotos(false)
      // }

      // const rawImage = images.map((image: any) => image.data_url)

      logging.info('creating product ....')

      try {
         if (isAdd) {
            // validation images must be more then 4
            if (images.length < 4) {
               setIsErrorValidationPhotos(true)
               setIsSubmitLoading(false)
               return false
            } else {
               setIsErrorValidationPhotos(false)
            }

            const rawImage = images.map((image: any) => image.data_url)

            const data = {
               ...productForm,
               ...productForm.location,
               images: rawImage,
            }

            await ProductService.Create(data)

            // mutate swr
            mutate(`/api/products`)
            setIsSubmitLoading(false)
            onClose()
         } else {
            Promise.all(
               imagesUpdate.map((urlImage: string) => {
                  return toDataURL(urlImage)
               })
            )
               .then(async (results) => {
                  const totalImageUpdate = results.length + images.length

                  // validation images must be more then 4
                  if (totalImageUpdate < 4) {
                     setIsErrorValidationPhotos(true)
                     setIsSubmitLoading(false)
                     return false
                  } else {
                     setIsErrorValidationPhotos(false)
                  }

                  const rawImage = images.map((image: any) => image.data_url)

                  const data = {
                     ...productForm,
                     ...productForm.location,
                     images: [...rawImage, ...results],
                  }

                  await ProductService.Update(productSelected?._id, data)

                  // mutate swr
                  mutate(`/api/products`)
                  setIsSubmitLoading(false)
                  onClose()
               })
               .catch((error) => {
                  console.error(error)
               })

            // const imagesBase64Update = imagesUpdate.map(
            //    async (urlImage: string) => {
            //       const res = await toDataURL(urlImage)
            //       return res
            //    }
            // )

            // Promise.all(imagesBase64Update).then((res) => {

            // })
         }
      } catch (error) {
         logging.error(error)
         setIsSubmitLoading(false)
      }
   }

   const toDataURL = (url: any) =>
      fetch(url)
         .then((response) => response.blob())
         .then(
            (blob) =>
               new Promise((resolve, reject) => {
                  const reader = new FileReader()
                  reader.onloadend = () => resolve(reader.result)
                  reader.onerror = reject
                  reader.readAsDataURL(blob)
               })
         )

   // Preview photo on table
   const [prevPhotoOnTable, setPrevPhotoOnTable] = useState<string>('')
   const {
      isOpen: isOpenPreviewPhoto,
      onOpen: onOpenPreviewPhoto,
      onClose: onClosePreviewPhoto,
   } = useDisclosure()

   const handlePreviewPhotoOnTable = (photo: string) => {
      setPrevPhotoOnTable(photo)
      onOpenPreviewPhoto()
   }

   // Section Delete

   const {
      isOpen: isOpenAlertDelete,
      onOpen: onOpenAlertDelete,
      onClose: onCloseAlertDelete,
   } = useDisclosure()

   const [isLoadingAlertDelete, setIsLoadingAlertDelete] =
      useState<boolean>(false)

   const handleOpenAlertDelete = (product: IProduct) => {
      setProductSelected(product)
      onOpenAlertDelete()
   }

   const handleConfirmDelete = async () => {
      setIsLoadingAlertDelete(true)
      try {
         await ProductService.Delete(productSelected?._id)
         mutate(`/api/products`)
         setIsLoadingAlertDelete(false)
         onCloseAlertDelete()

         cleanForm()
      } catch (error) {
         cleanForm()

         setIsLoadingAlertDelete(false)
         toast({
            title: 'Failed',
            description: 'Failed delete product',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   const handleCloseAlertDelete = () => {
      onCloseAlertDelete()
   }

   const cleanForm = () => {
      setProductSelected(null)
      setPhotoFile('')
      setPhotoPrev('')
   }

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

   const onImageUpdateRemove = (index: number) => {
      const newItems = [...imagesUpdate]
      newItems.splice(index, 1)

      setImagesUpdate(newItems)
   }

   return (
      <Box textAlign='left' p={5} bg='white' alignItems='center'>
         <Flex justifyContent='space-between' mb={5}>
            <Heading>PRODUCT</Heading>
            <Button
               variant='solid'
               bg='yellow.400'
               color='gray.50'
               size='sm'
               onClick={() => handleOpenModalAddEdit({ isAdd: true })}
               _focus={{ outline: 'none' }}
            >
               <Text>New Product</Text>
            </Button>
         </Flex>

         <Box>
            <ProductGrid
               products={dataProducts?.products || []}
               handleOpenModalAddEdit={handleOpenModalAddEdit}
               handleOpenAlertDelete={handleOpenAlertDelete}
            />
         </Box>
         {/* TABLE */}

         <Box display={dataProducts?.products?.length ? 'inline' : 'none'}>
            <Pagination
               page={dataProducts?.page}
               pages={dataProducts?.pages}
               handlePagination={(e) => handlePagination(e)}
            />
         </Box>

         {/* Modal Add and Edit Product */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='6xl'
            onOverlayClick={() => cleanForm()}
            onCloseComplete={() =>
               setProductForm({
                  ...productForm,
                  name: '',
                  area: 0,
                  bathroom: 0,
                  bedroom: 0,
                  description: '',
                  location: {
                     detail_location: '',
                     kabOrKota: '',
                     kabOrKota_name: '',
                     kecamatan: '',
                     kecamatan_name: '',
                     kelurahan: '',
                     kelurahan_name: '',
                     provinsi: '',
                     provinsi_name: '',
                  },
                  price: 0,
                  isRecommended: false,
               })
            }
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Add Product</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  {/* <Box
                     d='flex'
                     justifyContent='center'
                     alignItems='center'
                     flexDirection='column'
                     mb='30px'
                  >
                     <Image
                        borderRadius='md'
                        src={photoPrev || productSelected?.photo}
                        fallbackSrc='https://via.placeholder.com/150'
                     />
                  </Box> */}

                  <form onSubmit={(e) => handleSubmit(e)}>
                     <HStack spacing={7} alignItems={'start'}>
                        <VStack spacing={5} flex='0.5'>
                           <FormControl isRequired>
                              <FormLabel>Name</FormLabel>
                              <Input
                                 type='text'
                                 placeholder='the name of product'
                                 value={productForm.name}
                                 onChange={(e) =>
                                    setProductForm({
                                       ...productForm,
                                       name: e.target.value,
                                    })
                                 }
                              />
                           </FormControl>

                           <FormControl isRequired>
                              <FormLabel>Price</FormLabel>
                              <Input
                                 type='number'
                                 placeholder='the Price of product'
                                 value={productForm.price}
                                 onChange={(e) =>
                                    setProductForm({
                                       ...productForm,
                                       price: parseInt(e.target.value),
                                    })
                                 }
                              />
                           </FormControl>

                           <HStack>
                              <FormControl isRequired>
                                 <FormLabel>Bedroom</FormLabel>
                                 <Input
                                    type='number'
                                    placeholder='total bedroom'
                                    value={productForm.bedroom}
                                    onChange={(e) =>
                                       setProductForm({
                                          ...productForm,
                                          bedroom: parseInt(e.target.value),
                                       })
                                    }
                                 />
                              </FormControl>

                              <FormControl isRequired>
                                 <FormLabel>Bathroom</FormLabel>
                                 <Input
                                    type='number'
                                    placeholder='total bathroom'
                                    value={productForm.bathroom}
                                    onChange={(e) =>
                                       setProductForm({
                                          ...productForm,
                                          bathroom: parseInt(e.target.value),
                                       })
                                    }
                                 />
                              </FormControl>
                           </HStack>

                           <FormControl isRequired>
                              <FormLabel>area</FormLabel>
                              <Input
                                 type='number'
                                 placeholder='the area of product'
                                 value={productForm.area}
                                 onChange={(e) =>
                                    setProductForm({
                                       ...productForm,
                                       area: parseInt(e.target.value),
                                    })
                                 }
                              />
                           </FormControl>

                           <FormControl id='' isRequired>
                              <FormLabel color='text'>Deskripsi</FormLabel>
                              <Input type='hidden' />
                              <ReactQuill
                                 theme='snow'
                                 modules={modules}
                                 value={productForm.description}
                                 onChange={(e) => {
                                    // form.setFieldValue(name, e)
                                    setProductForm({
                                       ...productForm,
                                       description: e,
                                    })
                                 }}
                                 // value={field.value}
                              />
                           </FormControl>
                        </VStack>
                        <VStack spacing={5} flex='0.5'>
                           <FormControl
                              isRequired
                              onChange={(e: any) => {
                                 var index = e.nativeEvent.target.selectedIndex
                                 handleChangeProvinsi(
                                    e.target.value,
                                    e.nativeEvent.target[index].text
                                 )
                              }}
                           >
                              <FormLabel>Provinsi</FormLabel>
                              <Select
                                 placeholder='Select provinsi'
                                 defaultValue={
                                    productSelected?.location.provinsi
                                 }
                              >
                                 {provinces.map((province: any) => (
                                    <option value={province.value}>
                                       {province.name}
                                    </option>
                                 ))}
                              </Select>
                           </FormControl>

                           <FormControl
                              isRequired
                              onChange={(e: any) => {
                                 var index = e.nativeEvent.target.selectedIndex
                                 handleChangeKabOrKota(
                                    e.target.value,
                                    e.nativeEvent.target[index].text
                                 )
                              }}
                           >
                              <FormLabel>Kabupaten / Kota</FormLabel>
                              <Select placeholder='Select kabupaten / kota'>
                                 {kabOrKota.map(
                                    (item: any) =>
                                       item.value ==
                                       productSelected?.location.kabOrKota ? (
                                          <option value={item.value} selected>
                                             {item.name}
                                          </option>
                                       ) : (
                                          <option value={item.value}>
                                             {item.name}
                                          </option>
                                       )

                                    // <option value={item.value}>
                                    //    {item.name}
                                    // </option>
                                 )}
                              </Select>
                           </FormControl>

                           <FormControl
                              isRequired
                              onChange={(e: any) => {
                                 var index = e.nativeEvent.target.selectedIndex
                                 handleChangeKecamatan(
                                    e.target.value,
                                    e.nativeEvent.target[index].text
                                 )
                              }}
                           >
                              <FormLabel>Kecamatan</FormLabel>
                              <Select placeholder='Select kecamatan'>
                                 {kecamatans.map(
                                    (item: any) =>
                                       item.value ==
                                       productSelected?.location.kecamatan ? (
                                          <option value={item.value} selected>
                                             {item.name}
                                          </option>
                                       ) : (
                                          <option value={item.value}>
                                             {item.name}
                                          </option>
                                       )

                                    // <option value={item.value}>
                                    //    {item.name}
                                    // </option>
                                 )}
                              </Select>
                           </FormControl>

                           <FormControl
                              isRequired
                              onChange={(e: any) => {
                                 var index = e.nativeEvent.target.selectedIndex
                                 let kelurahan_name =
                                    e.nativeEvent.target[index].text

                                 setProductForm({
                                    ...productForm,
                                    location: {
                                       ...productForm.location,
                                       kelurahan: e.target.value,
                                       kelurahan_name: kelurahan_name,
                                    },
                                 })
                              }}
                           >
                              <FormLabel>Kelurahan</FormLabel>
                              <Select placeholder='Select kelurahan'>
                                 {kelurahans.map(
                                    (item: any) =>
                                       item.value ==
                                       productSelected?.location.kelurahan ? (
                                          <option value={item.value} selected>
                                             {item.name}
                                          </option>
                                       ) : (
                                          <option value={item.value}>
                                             {item.name}
                                          </option>
                                       )

                                    // <option value={item.value}>
                                    //    {item.name}
                                    // </option>
                                 )}
                              </Select>
                           </FormControl>

                           <FormControl isRequired>
                              <FormLabel>Detail Location</FormLabel>
                              <Textarea
                                 placeholder='detail location of product'
                                 onChange={(e) =>
                                    setProductForm({
                                       ...productForm,
                                       location: {
                                          ...productForm.location,
                                          detail_location: e.target.value,
                                       },
                                    })
                                 }
                                 value={productForm.location.detail_location}
                              />
                           </FormControl>
                        </VStack>
                        <VStack spacing={5} flex='0.5' align={'start'}>
                           <Text textAlign={'left'} fontWeight='medium'>
                              Photos
                           </Text>
                           <Text
                              textAlign={'left'}
                              fontWeight='light'
                              color={'red'}
                              fontSize='xs'
                              style={{ marginTop: '1px' }}
                           >
                              * minimal 4 photos
                           </Text>
                           {isErrorValidationPhotos && (
                              <Alert status='error'>
                                 <AlertIcon />
                                 Photos must be more than 4, Upload more image!
                              </Alert>
                           )}
                           <ImageUploading
                              multiple
                              value={images}
                              onChange={onChangeImage}
                              maxNumber={maxNumber}
                              dataURLKey='data_url'
                              acceptType={['jpg', 'png']}
                           >
                              {({
                                 imageList,
                                 onImageUpload,
                                 onImageRemoveAll,
                                 onImageUpdate,
                                 onImageRemove,
                                 isDragging,
                                 dragProps,
                              }) => (
                                 // write your building UI
                                 <Flex flexDir={'column'}>
                                    <HStack mb={3}>
                                       <Button
                                          colorScheme={'cyan'}
                                          style={
                                             isDragging
                                                ? { color: 'red' }
                                                : { color: '' }
                                          }
                                          onClick={onImageUpload}
                                       >
                                          Upload image
                                       </Button>
                                       {/* <Button
                                          colorScheme={'red'}
                                          onClick={onImageRemoveAll}
                                       >
                                          Remove all images
                                       </Button> */}
                                    </HStack>

                                    <Flex flexWrap={'wrap'} gap={3}>
                                       {imagesUpdate.map(
                                          (url: string, index: number) => (
                                             <HStack
                                                key={index}
                                                className='image-item'
                                                justifyContent={'center'}
                                                alignItems='center'
                                                marginBottom={'1'}
                                             >
                                                <img
                                                   src={url}
                                                   alt=''
                                                   width='80'
                                                />
                                                <VStack className='image-item__btn-wrapper'>
                                                   {/* <Button
                                                      onClick={() =>
                                                         onImageUpdate(index)
                                                      }
                                                      colorScheme='yellow'
                                                      size={'xs'}
                                                   >
                                                      Update
                                                   </Button> */}
                                                   <Button
                                                      onClick={() =>
                                                         onImageUpdateRemove(
                                                            index
                                                         )
                                                      }
                                                      colorScheme='gray'
                                                      size={'xs'}
                                                   >
                                                      Remove
                                                   </Button>
                                                </VStack>
                                             </HStack>
                                          )
                                       )}
                                       {imageList.map((image, index) => (
                                          <HStack
                                             key={index}
                                             className='image-item'
                                             justifyContent={'center'}
                                             alignItems='center'
                                             marginBottom={'1'}
                                          >
                                             <img
                                                src={image.data_url}
                                                alt=''
                                                width='80'
                                             />
                                             <VStack className='image-item__btn-wrapper'>
                                                {/* <Button
                                                   onClick={() =>
                                                      onImageUpdate(index)
                                                   }
                                                   colorScheme='yellow'
                                                   size={'xs'}
                                                >
                                                   Update
                                                </Button> */}
                                                <Button
                                                   onClick={() =>
                                                      onImageRemove(index)
                                                   }
                                                   colorScheme='gray'
                                                   size={'xs'}
                                                >
                                                   Remove
                                                </Button>
                                             </VStack>
                                          </HStack>
                                       ))}
                                    </Flex>
                                 </Flex>
                              )}
                           </ImageUploading>

                           <FormControl>
                              <Checkbox
                                 colorScheme='green'
                                 isChecked={productForm.isRecommended}
                                 onChange={(e) =>
                                    setProductForm({
                                       ...productForm,
                                       isRecommended: e.target.checked,
                                    })
                                 }
                                 fontSize='lg'
                                 fontWeight={'medium'}
                              >
                                 is recommended
                              </Checkbox>
                           </FormControl>

                           <Button
                              type='submit'
                              variant='solid'
                              colorScheme='blue'
                              w='100%'
                              marginTop={'32'}
                              isLoading={isSubmitLoading}
                           >
                              {isAdd ? 'Create' : 'Edit'}
                           </Button>
                        </VStack>
                     </HStack>
                  </form>
               </ModalBody>

               <ModalFooter></ModalFooter>
            </ModalContent>
         </Modal>

         {/* Modal preview photo */}
         <PreviewPhoto
            isOpenPreviewPhoto={isOpenPreviewPhoto}
            onClosePreviewPhoto={onClosePreviewPhoto}
            image={prevPhotoOnTable}
         />

         {/* Alert delete product */}
         <AlertDialogDelete
            header='Delete Product'
            body='Deleting the machine will delete all dependent data with this ID, Are you sure you want to delete?'
            isOpen={isOpenAlertDelete}
            onClose={onCloseAlertDelete}
            isLoading={isLoadingAlertDelete}
            handleConfirm={handleConfirmDelete}
            handleCloseAlert={handleCloseAlertDelete}
         />
      </Box>
   )
}

export default AdminProduct
