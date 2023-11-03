import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react';
import logo from '../../res/logo2.png';
import { firestore, Auth } from '../../Services/Firebase'; // Import auth from Firebase
import { useToast } from '@chakra-ui/react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import MyTextInput from '../../Component/MyTextInput';
import Header from '../../Component/Header';

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const toast = useToast();
  

  const handleSubmit = async (values) => {
    
    try {
     
      const userCredential = await Auth.signInWithEmailAndPassword(
        values.email,
        values.Password
      );
      const user = userCredential.user;

      if (user) {
        // You can access user.uid directly without querying Firestore
        const userId = user.uid;

        // Example: Query Firestore to get user data
        firestore
          .collection('users')
          .doc(userId)
          .get()
          .then( (doc) => {
            if (doc.exists) {

              const currentUserData=doc.data();
             sessionStorage.setItem("userInfo",JSON.stringify(currentUserData));
            
            } else {
              console.log('No such document!');
            }
          });

        // Redirect to another page (replace '/dashboard' with your desired route)
        navigate('/chat');
      }
    } catch (error) {
      if (error.code === 'auth/internal-error') {
        const errorMessageObject = JSON.parse(error.message);
        if (errorMessageObject?.error?.message) {
          const customErrorMessage = errorMessageObject.error.message;
          toast({
            position: 'top',
            title: 'Authentication error',
            description: customErrorMessage,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else {
          // Handle other errors with a generic message
          toast({
            position: 'top',
            title: 'Authentication error',
            description: 'An error occurred during authentication.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        // Handle other errors with a generic message
        toast({
          position: 'top',
          title: error.message,
          description: '',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Header />
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} className='top'>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'} backgroundColor={'white'} p={10}>
            <img src={logo} alt='Logo' />
            <Heading fontSize={'2xl'} className='LoginHeader'>
              Welcome Back!
            </Heading>
            <Formik
              initialValues={{ email: '', Password: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                Password: Yup.string()
                  .min(4, 'Must be more than or equal to 4')
                  .max(16, 'Must be less than 16')
                  .required('Required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ isValid, isSubmitting }) => (
                <Form>
                  <Stack spacing={'10px'}>
                    <MyTextInput name='email' type='email' placeholder='Email' className='test' />
                    <MyTextInput
                      name='Password'
                      type='password'
                      placeholder='Enter Your Password'
                    />
                  </Stack>
                  <Stack
                    mt={'1em'}
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={'blue.500'}>Forgot password?</Text>
                  </Stack>
                  <Stack spacing={6}>
                    <Button
                      width={'100%'}
                      mt={'1em'}
                      type='submit'
                      color={'white'}
                      backgroundColor={'black'}
                      disabled={!isValid || isSubmitting}
                    >
                      Sign In
                    </Button>
                  </Stack>
                  <Stack className='dontHaveAccount'>
                    <p> Don't have an account ?</p>
                    <Link to='/signup'>Sign Up</Link>
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

export default Login;
