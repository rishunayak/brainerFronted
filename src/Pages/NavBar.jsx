import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const nav=useNavigate()
    const dispatch=useDispatch()
    const handleLogout=()=>
    {
       localStorage.removeItem("token")
       nav("/login")
    }
  return (
    <>
      <Flex w="100%" justifyContent={"space-between"} color={"white"} bg={"green"} p={"20px"}>
        <Text fontSize={"25px"} fontWeight={600}>Shop</Text>
        <Flex gap={"20px"} align={"center"}>
         <Link to="/" ><Text fontSize={"20px"} fontWeight={600}>Home</Text></Link>
         <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
        </Flex>
        
      </Flex>
    </>
  )
}

export default NavBar