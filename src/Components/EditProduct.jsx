import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {GoPencil} from "react-icons/go"
import { useDispatch } from 'react-redux'
import { patchProductData } from '../Redux/Product/action.ts'

const EditProduct = (prop) => {
    
    const [data,setData]=useState(prop)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch=useDispatch()
    const toast = useToast()
    const handleEdit=()=>
    {
        if(data.image=="" || data.price==null || data.quantity==null || data.description=="")
        {
         toast({
             title: 'Failed Editing Product.',
             description: "All filled are Requried",
             status: 'error',
             duration: 9000,
             isClosable: true,
           })
           return
        }
        
       dispatch(patchProductData(data)).then((r)=>{console.log(r)
          if(r.message.status==1)
          {
            toast({
              title: 'Updated Successfully.',
              description: "Product Detail Updated",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            onClose()
          }
       })
    }

  return (
    <>
    <Button onClick={onOpen} bg={"none"} _hover={{bg:"none"}}><GoPencil fontSize={"20px"}/></Button>

     <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         <FormControl isRequired>
          <FormLabel>Image Url</FormLabel>
          <Input placeholder='Image Url' value={data.image} onChange={(e)=>setData({...data,image:e.target.value})} />
         </FormControl>

         <FormControl isRequired>
          <FormLabel>Product Name</FormLabel>
          <Input placeholder='Name' value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}  />
         </FormControl>

         <FormControl isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input placeholder='Quantity' type='Number' value={data.quantity} onChange={(e)=>setData({...data,quantity:e.target.value})}  />
         </FormControl>

         <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input placeholder='Price' type='Number' value={data.price} onChange={(e)=>setData({...data,price:e.target.value})}/>
         </FormControl>

         <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea placeholder='Description' value={data.description} onChange={(e)=>setData({...data,description:e.target.value})} />
         </FormControl>

        </ModalBody>
        <ModalFooter>
        
        <Button mr={"10px"} onClick={onClose}>Close</Button>
        <Button onClick={handleEdit} colorScheme='blue'>Edit</Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  )
}

export default EditProduct