import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Center, Flex, Grid, GridItem, Heading, Image, Input, InputGroup, InputLeftElement, Select, Stack, Text, useToast,  } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductData, getProductData } from '../Redux/Product/action.ts';
import EditProduct from '../Components/EditProduct.jsx';
import {RiDeleteBin6Line} from "react-icons/ri"
import NavBar from './NavBar';
import ViewProduct from '../Components/ViewProduct.jsx';

const Product = () => {

    const [page,setPage]=useState(1)
    const [search,setSearch]=useState("")
    const [sort,setSort]=useState("")

    const dispatch=useDispatch()
    const toast = useToast()

    const {isLoading,isError,product}=useSelector((store)=>store.ProductReducer)

    const handleSearch=(e)=>
    {
         if(e.key==="Enter")
         {
           dispatch(getProductData({page:1,search,sort}))
           setSearch("")
           setPage(1)
         }
    }

    useEffect(()=>
    {
     dispatch(getProductData({page,search,sort}))
    },[page,sort])

  const handleDelete=(ele)=>
  {
     dispatch(deleteProductData(ele._id)).then(r=>
      {
        if(r.message.status==1)
          {
            toast({
              title: 'Deleted Successfully.',
              description: "Product Deleted",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
           
          }
      })
  }

  return (
    <>
    <NavBar/>
 <Flex gap={"10px"} w={["90%","80%","70%","50%"]} m="auto" mt="10px">
  <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <SearchIcon color='gray.300' fontSize={"20px"} />
    </InputLeftElement>
    <Input type='text'
      placeholder='Search Product'
       value={search} 
       onChange={(e)=>setSearch(e.target.value)} 
       onKeyPress={handleSearch}
       />
  </InputGroup>

   <Select placeholder="Sort By Price" value={sort} onChange={(e)=>setSort(e.target.value)}>
     <option value={"desc"}>High To Low</option>
     <option value={"asc"}>Low To High</option>
   </Select>
   </Flex> 
    <Box>

      <Grid gridTemplateColumns={["repeat(1,1fr)","repeat(1,1fr)","repeat(2,1fr)","repeat(3,1fr)","repeat(4,1fr)"]}>
         
         {
           product?.products?.map((ele)=>
           <GridItem > 
                
                <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'350px'}
        w={'full'}
      
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${ele.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={ele.image}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} >
            {ele.name}
          </Heading>
          <Flex w="100%" justifyContent={"space-between"}>
          <Text fontWeight={800} fontSize={'xl'}>
            ₹{ele.price}
            </Text>
            <Text fontWeight={800} fontSize={'xl'}>
            Quantity:- {ele.quantity}
            </Text>
          </Flex>
          <Flex direction={'row'} align={'center'} justifyContent={"space-between"} w={"100%"} alignItems={"center"} mt={"10px"}>
            <ViewProduct name={ele.name} quantity={ele.quantity} price={ele.price} description={ele.description} image={ele.image} />
            <EditProduct name={ele.name} quantity={ele.quantity} price={ele.price} description={ele.description} image={ele.image} id={ele._id}/>
            
            <Button bg={"none"} _hover={{bg:"none"}} onClick={()=>handleDelete(ele)}> <RiDeleteBin6Line size={20} color='red'/> </Button>
            
          </Flex>
        </Stack>
      </Box>
    </Center>
          
           </GridItem>)
         }

      </Grid >

      <Center mb="40px"> 
            <ButtonGroup isAttached variant='outline'>
                 <Button isDisabled={page==1} onClick={()=>{setPage(page-1);window.scrollTo({ top: 0, behavior: 'smooth' })}}>Prv</Button>
                 <Button >{page}</Button>
                 <Button onClick={()=>{setPage(page+1);window.scrollTo({ top: 0, behavior: 'smooth' });}} isDisabled={page==product?.totalPage}>Nex</Button> 
                </ButtonGroup>
       </Center>
              
    </Box>
    </>
  )
}

export default Product







