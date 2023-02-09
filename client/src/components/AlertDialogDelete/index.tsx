import React, { FC } from 'react'
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
} from '@chakra-ui/react'

interface IAlertDialogDelete {
   isOpen: boolean
   onClose: any
   header: string
   body: string
   handleConfirm: any
   isLoading: boolean
   handleCloseAlert: any
}

const AlertDialogDelete: FC<IAlertDialogDelete> = ({
   isOpen,
   onClose,
   header,
   body,
   handleConfirm,
   isLoading,
   handleCloseAlert,
}) => {
   return (
      <AlertDialog
         isOpen={isOpen}
         onClose={onClose}
         onOverlayClick={handleCloseAlert}
         leastDestructiveRef={handleCloseAlert}
      >
         <AlertDialogOverlay>
            <AlertDialogContent>
               <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  {header}
               </AlertDialogHeader>

               <AlertDialogBody>{body}</AlertDialogBody>

               <AlertDialogFooter>
                  <Button onClick={onClose} _focus={{ outline: 'none' }}>
                     Cancel
                  </Button>
                  <Button
                     colorScheme='red'
                     onClick={handleConfirm}
                     ml={3}
                     isLoading={isLoading}
                  >
                     Delete
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogOverlay>
      </AlertDialog>
   )
}

export default AlertDialogDelete
