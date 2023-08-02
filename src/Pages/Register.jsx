import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userRegister } from '../Redux/User/action.ts'
  

const Register = () => {
  const toast = useToast()
  const dispatch=useDispatch()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const nav=useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister=()=>
  {
    console.log(email,password,name)
     if(email=="" || password=="" || name=="")
     {
      toast({
        title: 'Register Failed.',
        description: "Name, Email and Password is Requried",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
     }
  
     dispatch(userRegister({name,email,password})).then(r=>
      {
        if(r.payload.status==1)
        {
          toast({
            title: 'Register Success.',
            description: "Sigup successful",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          nav("/login")
        }
        else
        {
          toast({
            title: 'Register failed.',
            description: r.payload.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      
  }
  
  return (
    <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel >First Name</FormLabel>
                  <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleRegister}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Flex justifyContent={"center"} gap={"4px"}>
                Already a user?  <Link to="/login"> <Text  color={'blue.400'}>Login</Text></Link>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
      
    
    </>
  )
}

export default Register




