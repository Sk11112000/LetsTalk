  import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
  import { Input, InputAdornment, InputLabel } from '@mui/material';
  import { AccountCircle } from '@mui/icons-material';
  import { Button, Flex, Image, layout } from '@chakra-ui/react';
  import { Formik, Field, Form } from 'formik';
  import logo from '../../res/logo2.png';
  import { Spinner,useToast } from '@chakra-ui/react';
  import './Profile.css';
  import { Auth, firestore  } from '../../Services/Firebase';
  import { useNavigate } from 'react-router-dom';
  import userIcon from '../../res/userIcon.svg';
  import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

  import CustomWebcam from "./CustomWebcam";

  const Profile = () => {
    let userID="";
    let force = false;
    const auth = Auth;
    const navigate = useNavigate();
    const toast = useToast();
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [userSignedUp, setUserSignedUp] = useState(false);
    const [takeImage, setTakeImage] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [image, setImage] = useState(null);
    const [loading,setLoading]=useState(false);
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    const handleAvatarChange = () => {
      const min = 1;
      const max = 100000;
      const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
      userInfo.image = `https://robohash.org/${randomNum}`;
      setImage(userInfo.image);
    };

    useLayoutEffect(() => {
      if (!userInfo.image) {
        userInfo.image = userIcon;
        setImage(userInfo.image);
      }
    }, []);

    const handleTakePhoto = () => {
      setTakeImage(true);
    };

    const handleRemoveImage = () => {
      userInfo.image = userIcon;
      setImage(userInfo.image);
    };

    const mouseLeave = () => {
      if (!force) setShowImageOptions(false);
    };

    const setForce = () => {
      force = true;
      setShowImageOptions(true);
    };

    const setBlur = () => {
      force = false;
      setShowImageOptions(false);
    };

    const handleDataFromImage = (data) => {
      userInfo.image=data;
      console.log(data);
      setImage(data);
      setTakeImage(false)
    }

    const handleChoosePhoto = () => {
      event.preventDefault(); 

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            handleDataFromImage(imageDataUrl);
          };
          reader.readAsDataURL(selectedFile);
        }
      };
      fileInput.click();
    };
    const handleBack=()=>{
      navigate('/signup')
    }
    useEffect(() => {
      if (userSignedUp) {
        const checkEmailVerification = async () => {
          const user = await auth.currentUser;
          if (user) {
            try{
            await user.reload();
            setEmailVerified(user.emailVerified);
    
            if (user.emailVerified) {
              setLoading(false);
             
             console.log(user.uid);
              const userRef = firestore.collection('users').doc(user.uid);
              await userRef.set(JSON.parse(sessionStorage.getItem("userInfo")));
              
              toast({
                position: 'top',
                title: 'Profile created.',
                description: "We've created your profile.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              sessionStorage.setItem("user", JSON.stringify(user));
              navigate('/chat');
              clearInterval(interval); // Stop the interval if email is verified
            }
          }
          catch(error)
          {
            console.log(error);
          }
          }
        };
    
        const interval = setInterval(() => {
          checkEmailVerification();
        }, 5000);
    
        // Set a timeout to stop loading and delete the user if not verified within 1 minute
        const verificationTimeout = setTimeout(() => {
          clearInterval(interval); // Stop the interval
          setLoading(false);
          toast({
            position: 'top',
            title: 'Email not verified in time.',
            description: 'Please verify your email within 1 minute.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          auth.currentUser.delete()
            .then(() => {

            })
            .catch((error) => {
              console.error('Error deleting user:', error);
            });
        }, 60000); // 1 minute
    
        return () => {
          clearInterval(interval);
          clearTimeout(verificationTimeout); // Clear the verification timeout if the email is verified before 1 minute
        };
      }
    }, [userSignedUp, verificationEmailSent]);
    const handleSubmit = async () => {
      try{ 
        
           userInfo.image=image
          
          
           setUserSignedUp(true);
           setLoading(true); 
       
             const userCredential = await auth.createUserWithEmailAndPassword(
               userInfo.email,
               userInfo.createPassword
             );
             delete userInfo.createPassword;
            
             const user = userCredential.user;
            userID=user.uid;
       
              userInfo.id=user.uid;
              userID=user;
             sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
             await user.sendEmailVerification();

             setVerificationEmailSent(true);
      }
      catch(error)
      { 
       toast({
       position: 'top',
       title: 'Profile Cannot be Created.',
       description: error.message,
       status: 'warning',
       duration: 9000,
       isClosable: true,
     });
       setLoading(false)
       console.log(error);
      }
   };
    return (
      <Formik
        initialValues={{ about: '' }}
        
      >
        <Form>
          <Flex minH={'100vh'} direction={{ base: 'column', md: 'row' }} className="top">
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
              <Flex direction="column" maxW={'md'} backgroundColor={'white'} p={10}>
                <Image src={logo} alt="Logo" />
                  { loading ? (
                    <div style={{display:"flex", justifyContent:"space-around"}}> <Spinner size="md" color="black"alignItems={"center"} />
                      <p>Please Verify Your Email</p>
                      </div>
                    ) : (takeImage ? (
                    <CustomWebcam sendDataToParent={handleDataFromImage} />
                    ) : (
                  <div className="SignUpProfile" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div
                      className="image-div"
                      
                      style={{ position: 'relative', height: '10em', width: '10em' }}
                      onMouseEnter={() => setShowImageOptions(true)}
                      onFocus={() => setForce()}
                      onBlur={() => setBlur()}
                      onMouseLeave={() => mouseLeave()}
                    >
                      <img
                        style={{ borderRadius: '50%', height: '10em', width: '10em' }}
                        src={image}
                        alt="Profile"
                      />
                      {showImageOptions && (
                        <Menu>
                          <MenuButton className="menuButtonSpan"><span>Change Profile Photo</span></MenuButton>
                          <MenuList className="menu-list" onClick={() => setShowImageOptions(false)}>
                            <MenuItem className="menu-item" onClick={handleAvatarChange}>Use Avatar</MenuItem>
                            <MenuItem className="menu-item" onClick={handleTakePhoto}>Take Photo</MenuItem>
                            <MenuItem className="menu-item" onClick={handleChoosePhoto}>Choose Photo</MenuItem>
                            <MenuItem className="menu-item" onClick={handleRemoveImage}>Remove Photo</MenuItem>
                          </MenuList>
                        </Menu>
                      )}
                    </div>
                    <div>
                      <InputLabel htmlFor="about" style={{ color: 'black' }}>
                        About You
                      </InputLabel>
                      <Field
                        as={Input}
                        name="about"
                        id="about"
                        onBlur={(value)=>{userInfo.about=value.target.value}}
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        }
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3em', width: '100%' }}>
                      <Button mt={'1em'}  color={'white'} backgroundColor={'black'} onClick={handleBack}>
                        Back
                      </Button>
                      <Button mt={'1em'} type="submit" color={'white'} backgroundColor={'black'} onClick={handleSubmit}>
                        Next
                      </Button>
                    </div>
                  </div>
                )
              
              )}
              
              </Flex>
            </Flex>
          </Flex>
        </Form>
      </Formik>
    );
  };

  export default Profile;
