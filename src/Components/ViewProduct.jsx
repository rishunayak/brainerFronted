import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {AiOutlineEye} from "react-icons/ai"
const ViewProduct = ({name,image,quantity,description,price}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
       <Button onClick={onOpen} bg={"none"} _hover={{bg:"none"}}><AiOutlineEye fontSize={"20px"}/></Button>

<Modal onClose={onClose} isOpen={isOpen} isCentered>
 <ModalOverlay />
 <ModalContent>
   <ModalHeader>Product Deatils</ModalHeader>
   <ModalCloseButton />
   <ModalBody>
    <Image src={image}/>
    <Text fontSize="22px" fontWeight={500} >{name}</Text>
    
    <Flex w="100%" justifyContent={"space-between"} fontSize={"18px"} fontWeight={500} m="10px 0px">
        <Text>₹{price}</Text> <Text>Quantity :- {quantity}</Text>
    </Flex>

    <Text>{description}</Text>


   </ModalBody>
   <ModalFooter>
   <Button mr={"10px"} onClick={onClose}>Close</Button>
   </ModalFooter>
 </ModalContent>
 </Modal>
    </>
  )
}

export default ViewProduct