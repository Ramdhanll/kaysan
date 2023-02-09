import {
   Box,
   Modal,
   ModalBody,
   ModalContent,
   ModalOverlay,
   Image,
} from '@chakra-ui/react'
import React, { FC } from 'react'

interface IPreviewPhoto {
   isOpenPreviewPhoto: boolean
   onClosePreviewPhoto: () => void
   image: any
}

const PreviewPhoto: FC<IPreviewPhoto> = ({
   isOpenPreviewPhoto,
   onClosePreviewPhoto,
   image,
}) => {
   return (
      <Modal isOpen={isOpenPreviewPhoto} onClose={onClosePreviewPhoto}>
         <ModalOverlay />
         <ModalContent>
            <ModalBody>
               <Box d='flex' justifyContent='center'>
                  <Image
                     src={image}
                     fallbackSrc='https://via.placeholder.com/150'
                  />
               </Box>
            </ModalBody>
         </ModalContent>
      </Modal>
   )
}

export default PreviewPhoto
