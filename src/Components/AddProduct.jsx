import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postProductData } from '../Redux/Product/action.ts'

const AddProduct = () => {
    const [data,setData]=useState({image:"",price:null,name:"",quantity:null,description:""})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const dispatch=useDispatch()
    const handleAdd=()=>
    {
      
       if(data.image=="" || data.price==null || data.quantity==null || data.description=="")
       {
        toast({
            title: 'Failed Adding Product.',
            description: "All filled are Requried",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          return
       }

       
      
      dispatch(postProductData(data)).then(r=>
        {
          if(r.message.status==1)
          {
            toast({
              title: 'Add Successfully.',
              description: "New Product Added Successfully",
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

<Button onClick={onOpen} borderRadius={"16px"} colorScheme='blue'>Add Product</Button>

<Modal onClose={onClose} isOpen={isOpen} isCentered>
 <ModalOverlay />
 <ModalContent>
   <ModalHeader>Add New Product</ModalHeader>
   <ModalCloseButton />
   <ModalBody>
    
    <FormControl isRequired>
     <FormLabel>Image Url</FormLabel>
     <Input type="text" placeholder='Image Url' value={data.image}  onChange={(e) => setData({...data,image:e.target.value})} />
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
   <Button colorScheme='blue' onClick={handleAdd}>Add</Button>
   </ModalFooter>
 </ModalContent>
 </Modal>
      
    </>
  )
}

export default AddProduct