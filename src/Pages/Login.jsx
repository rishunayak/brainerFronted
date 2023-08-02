

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../Redux/User/action.ts'



 const Login=()=>{

  const toast = useToast()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const dispatch=useDispatch()
  const nav=useNavigate()


  const handleLogin=()=>
  {
     if(email=="" || password=="")
     {
      toast({
        title: 'Login Failed.',
        description: "Email and Password is Requried",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
     }


    dispatch(userLogin({email,password})).then(r=>
      {
        if(r.payload.token)
        {
          toast({
            title: 'Login',
            description: "Login Successfull",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
         
          nav("/")
        }
        else
        {
          toast({
            title: 'Register',
            description: r.payload,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          
        }
      })
   
     

  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link to="/register"><Text color={'blue.400'}>New User?</Text></Link> 
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleLogin}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login