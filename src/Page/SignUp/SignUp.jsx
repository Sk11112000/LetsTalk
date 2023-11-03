import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  Stack,
  Image,
  FormControl,
  FormLabel,
  Text,
  Spinner, // Import Spinner
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import PhoneInput,{isValidPhoneNumber} from 'react-phone-number-input';
import './SignUp.css'
import { Auth, firestore } from '../../Services/Firebase';
import logo from '../../res/logo2.png';
import Header from '../../Component/Header';
import MyTextInput from '../../Component/MyTextInput';
import { useLayoutEffect } from 'react';

const SignUp = () => {
  
const [phoneNumber ,setPhoneNumber]=useState("");
  const auth = Auth;
  const navigate = useNavigate();
  const toast = useToast();
useLayoutEffect(()=>{
  if((JSON.parse(sessionStorage.getItem("userInfo"))))
  setPhoneNumber((JSON.parse(sessionStorage.getItem("userInfo"))).phoneNumber);
},[])
 
  const handleSubmit = async (values, setSubmitting) => {
    try {
      if (!values.userName || !values.email || !values.createPassword || !values.confirmPassword) {
        throw new Error('All fields are required');
      }

      if (values.createPassword !== values.confirmPassword) {
        throw new Error('Passwords must match');
      }
      values.phoneNumber=phoneNumber;
      delete values.confirmPassword;
      sessionStorage.setItem("userInfo",JSON.stringify(values));
      navigate("/profile");
    
    } catch (error) {
      
    console.error(error.message);
      toast({
        position: 'top',
        title: 'Registration failed',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      
    } 
  };
 
  return (
    <>
      <Header />
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} className='top'>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'} backgroundColor={'white'} p={10}>
            <Image src={logo} />
            <Heading fontSize={'2xl'} className='LoginHeader'>
              Welcome!
            </Heading>
            <Formik
 initialValues={{
  userName:(JSON.parse(sessionStorage.getItem("userInfo"))) ? (JSON.parse(sessionStorage.getItem("userInfo"))).userName:"",
  email: (JSON.parse(sessionStorage.getItem("userInfo"))) ? (JSON.parse(sessionStorage.getItem("userInfo"))).email : "",
  createPassword: '',
  confirmPassword: '',
}}
validationSchema={Yup.object({
                userName: Yup.string()
                  .min(4, 'Must be 4 characters or more')
                  .max(30, 'Must be 30 characters or less')
                  .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                createPassword: Yup.string()
                  .min(6, 'Must be 6 characters or more')
                  .max(16, 'Must be 16 characters or less')
                  .required('Required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('createPassword')], 'Passwords must match')
                  .required('Required'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                await handleSubmit(values, setSubmitting);
              }}
            >
            {({ isValid, isSubmitting }) => (
                <Form>
                  
                    
                  <Stack spacing={'10px'}>
                    <MyTextInput name="userName" type="text" placeholder="User Name" className='test'  />
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      countryCallingCodeEditable={false}
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber(value)}
                      />  
                    <MyTextInput name="email" type="email" placeholder="Email" className='test' />
                    <MyTextInput name="createPassword" type="password" placeholder="Create Your Password" />
                    <MyTextInput name="confirmPassword" type="password" placeholder="Confirm Password"
                  />
                </Stack>
                <Stack mt={'1em'} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  
                    <Button
                      width={'100%'}
                      mt={'1em'}
                      type="submit"
                      color={'white'}
                      backgroundColor={'black'}
                      disabled={!isValid || isSubmitting}
                    >
                      Next
                    </Button>
                  
                </Stack>
                
                
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Stack>
  </>
);
};

export default SignUp;

