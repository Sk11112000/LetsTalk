import React from 'react'
import './Home.css'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../Component/MyTextInput';
import Header from '../../Component/Header'
import Footer from '../../Component/Footer'
import {Button,Stack} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import update from '../../res/update.svg'
import pic from '../../res/my.jpg'
import community from  '../../res/community.png'
import user from  '../../res/user.svg'
import rocket from '../../res/rocket.svg'
import rightArrow from '../../res/Righta.svg'
const Home = () => {
  document.body.style.overflow = "auto"

  return (
    <>
    <Header/>
    <div>
    <div className='splash-container'>
      <div className='splash'>
        <h1 className='splash-head' >
          Let's Talk
        </h1>
        <p className='splash-subhead' style={{marginTop:'1em', marginBottom:'1em'}}>
          Let's talk with our loved ones
        </p>
        <Link to="/login">
        <div class="static">
        <button className='letsStart'>
      <span className='letsStart'>
        Let's Start       
        <img style={{width:"1em"}} src={rightArrow}/>
        </span>
      </button>
    
  </div>

    </Link>

      </div>

    </div>
    </div>
    <div className='content-wrapper'>
      <div className='content'> 
        <h2 className='whoWeAre is-centre' >Features of Let's Talk Application</h2>
        <div className='Appfeatures'>
        <div className='contenthead'>

          <h3 className='content-subhead'>
            <img src={rocket} style={{height:'3em',width:'3em'}}/>
            <h3 style={{alignSelf:'center',padding:'1em'}}>
            Get Started Quickly
            </h3>
          </h3>
          <p>Just Register yourself with this app and start chating with your loved ones</p>
        </div>
        <div className='l-box'>
        <h3 className='content-subhead'>
        <svg width="3em" height="3em" viewBox="0 0 24 24" color='blue' fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_429_11126)">
<path d="M9 4.00018H19V18.0002C19 19.1048 18.1046 20.0002 17 20.0002H9" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15.0002L15 12.0002M15 12.0002L12 9.00018M15 12.0002H5" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_429_11126">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>  <h3 style={{alignSelf:'center',padding:'1em'}}>
          Firebase Authentication
          </h3>
        </h3>
        <p>Firebase Authentication has been implemented in this app</p>
        </div>
        <div className='l-box'>
        <h3 className='content-subhead'>
        <svg width="3em" height="3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 12V6C20 4.89543 19.1046 4 18 4H12M20 12V18C20 19.1046 19.1046 20 18 20H12M20 12H12M4 12V18C4 19.1046 4.89543 20 6 20H12M4 12V6C4 4.89543 4.89543 4 6 4H12M4 12H12M12 12V4M12 12V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>  <h3 style={{alignSelf:'center',padding:'1em'}}>
         Media 
         </h3>
        </h3>
        <p>
        You can share images with your friends for better experience
        </p>
        
        </div>
        <div className='l-box'>
        <h3 className='content-subhead'>
        <img src={update} style={{height:'3em',width:'3em'}}/>
        <h3 style={{alignSelf:'center',padding:'1em'}}>
         Update 
         </h3>
        </h3>
        <p>
        We will working with new feature for this app for better experience in future
        </p>
        
        </div>
      </div>
      </div>
    </div>
    <div className='AppfeaturesFounder'>
      <img width="300em" style={{borderRadius:'10%'}} src={pic}/>
      <div>
      <h1 className='content-head content-head-ribbon'>Sunny Kulshrestha</h1>
      <p className='content-head'>Software Engineer Working in MetaCube Software in Jaipur</p>
      </div>
    </div>
    <div className='parentOfWhoWeAre'>
      <div className='whoWeAre'>
        Who We Are?
      </div>
    <div className='whoWeAreText'>Welcome to Let's Talk, a vibrant online community where you can connect, chat, and share with people from all walks of life. We believe in fostering meaningful connections and creating a space where you can engage with others in a safe and friendly environment.
    </div>  
      <div className='whoWeAre'>
      Our Mission
      </div>
      <div className='whoWeAreText'>
At  Let's Talk, our mission is simple: to bring people together. We understand the importance of human connection, and we provide a platform for you to meet like-minded individuals, exchange ideas, and build lasting relationships.
</div>


<div className='content'> 
        <h2 className='whoWeAre is-centre' >What We Offer</h2>
        <div className='Appfeatures'>
        <div className='contenthead'>

          <h3 className='content-subhead'>
          <svg xmlns="http://www.w3.org/2000/svg" height='3em' width='3em' shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 450.27"><path d="M217.91 393.59c53.26 49.01 127.33 63.27 201.39 31.71l63.49 24.97-9.94-59.73c59.07-51.65 45.36-123.42-1.79-173.93-3.69 19.53-10.48 38.07-19.94 55.27-14.17 25.77-34.46 48.67-59.31 67.52-24.07 18.27-52.17 32.61-82.8 41.87-28.16 8.51-58.91 12.91-91.1 12.32zm-85.88-167.22c-7.7 0-13.95-6.25-13.95-13.95 0-7.7 6.25-13.95 13.95-13.95h124.12c7.7 0 13.94 6.25 13.94 13.95 0 7.7-6.24 13.95-13.94 13.95H132.03zm0-71.41c-7.7 0-13.95-6.25-13.95-13.95 0-7.71 6.25-13.95 13.95-13.95h177.35c7.7 0 13.94 6.24 13.94 13.95 0 7.7-6.24 13.95-13.94 13.95H132.03zM226.13.12l.21.01c60.33 1.82 114.45 23.27 153.19 56.49 39.57 33.92 63.3 80.1 61.82 130.51l-.01.23c-1.56 50.44-28.05 95.17-69.62 126.71-40.74 30.92-96.12 49.16-156.44 47.39-15.45-.46-30.47-2.04-44.79-4.82-12.45-2.42-24.5-5.75-36-10.05L28.17 379.06l31.85-75.75c-18.2-15.99-32.94-34.6-43.24-55.01C5.29 225.51-.72 200.48.07 174.33c1.52-50.49 28.02-95.26 69.61-126.82C110.44 16.59 165.81-1.65 226.13.12zm-.55 27.7-.21-.01C171.49 26.23 122.33 42.3 86.41 69.55c-35.07 26.61-57.39 63.9-58.65 105.54-.65 21.39 4.31 41.94 13.78 60.72 10.01 19.82 25.02 37.7 43.79 52.58l8.26 6.54-16.99 40.39 59.12-18.06 4.5 1.81c11.15 4.48 23.04 7.9 35.48 10.31 13.07 2.55 26.59 3.98 40.34 4.39 53.88 1.58 103.04-14.49 138.96-41.74 35.07-26.61 57.39-63.9 58.65-105.54v-.22c1.19-41.57-18.82-80.01-52.15-108.59-34.18-29.3-82.19-48.24-135.92-49.86z"/></svg>
            <h3 style={{alignSelf:'center',padding:'1em'}}>
            Chat Rooms
            </h3>
          </h3>
          <p>Explore a variety of chat rooms tailored to different interests, from hobbies and passions to serious discussions. Connect with people who share your enthusiasms.
</p>
        </div>
        <div className='l-box'>
        <h3 className='content-subhead'>
          <img src={user} style={{height:'3em',width:'3em'}}/>
        <h3 style={{alignSelf:'center',padding:'1em'}}>
User Profiles
          </h3>
        </h3>
        <p>
        Create your profile to let others know who you are. Share your interests, upload a profile picture, and connect with users who resonate with your vibe.

        </p>
        </div>
        <div className='l-box'>
        <h3 className='content-subhead'>
        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" height='3em' width='3em' text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 462.24"><path d="M211.02 0C132.6 49.71 61.75 73.23.95 67.67-9.67 282.45 69.65 409.3 210.21 462.24c15.15-5.53 29.6-11.96 43.31-19.32a36.277 36.277 0 0 1-12.56-8.15l-.06-.07-.06.07c-3-3-5.48-6.53-7.27-10.43-7.56 3.5-15.34 6.72-23.35 9.64C86.85 387.52 17.23 276.18 26.54 87.65c53.37 4.88 115.56-15.76 184.4-59.4 59.56 46.27 121.03 59.82 183.68 56.54.52 19.96.27 38.97-.7 57.09 8.27 1.21 16.35 4 24.15 8.57 2.25-26.82 3.03-55.47 2.22-86.04C348.92 68.15 278.88 52.71 211.02 0zm55.15 413.12a3.67 3.67 0 0 1-3.68-3.68c0-1.05.15-2.08.39-3.11 5.91-46.78 26.59-47.62 52.6-54.39 7.75-2.02 21.94-3.1 30.2-10.33 4.55-4 7.3-12.13 6.2-18-6.27-5.83-11.11-12.13-12.21-24.14l-.75.01c-1.75-.03-3.44-.41-5-1.31-3.47-1.99-5.37-5.74-6.29-10.07-1.16-5.45-.77-11.93-.2-16.01l.2-.81c1.21-3.37 2.71-5.2 4.62-5.99l.05-.03c-.87-16.23 1.87-41.94-14.79-47 32.91-40.68 70.87-62.82 99.37-26.62 31.75 1.67 45.91 48.47 26.19 73.65h-.83c1.89.79 3.39 2.62 4.6 5.99l.22.81c.57 4.08.95 10.56-.22 16.01-.92 4.33-2.81 8.08-6.28 10.07-1.56.9-3.25 1.28-4.99 1.31l-.76-.01c-1.09 12.01-5.93 18.31-12.2 24.14-1.12 5.87 1.65 14 6.19 18 8.27 7.23 22.45 8.3 30.22 10.33 26 6.77 46.68 7.61 52.59 54.39.24 1.03.39 2.06.39 3.11 0 2.04-1.65 3.68-3.68 3.68H266.17zM208.74 74.84c-53.04 33.61-100.95 49.51-142.06 45.76-7.18 145.23 46.45 231 141.5 266.8.6-.22 1.19-.45 1.79-.67V75.78l-1.23-.94z"/></svg>
        <h3 style={{alignSelf:'center',padding:'1em'}}>
Privacy and Safety 
         </h3>
        </h3>
        <p>
        Your safety and privacy are our top priorities. We employ robust measures to ensure a secure and enjoyable experience for all users.
        </p>
        
        </div>
        <div className='l-box'>
        <h3 className='content-subhead'>
        <img src={community} style={{height:'3em',width:'3em'}}/>
        <h3 style={{alignSelf:'center',padding:'1em'}}>
        Community Guidelines 
         </h3>
        </h3>
        <p>
        We have clear community guidelines to maintain a respectful and inclusive atmosphere. We encourage open-mindedness and friendly interactions.
       </p>
        
        </div>
      </div>
      
      <div className='whoWeAre'>
      Get Started
      </div>
      <div className='whoWeAreText'>Join us today and become a part of our growing community. Start chatting, sharing, and discovering new friendships. Your journey at 'Let's Talk' begins here</div>
      
      </div>
      <div className='signUpParent'>
     <h1 className='signUp'>SignUp</h1>
     <Formik
  initialValues={{ email: '', createPassword: '', confirmPassword: '',userName:'' }}
  validationSchema={Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    createPassword: Yup.string()
      .min(4, "Must be more than or equal to 4")
      .max(16, "Must be less than 16")
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('createPassword')],
      'Passwords must match'
    ).required("Required"),
    userName: Yup.string()
    .min(4,'Must be more than or equal to 4')
    .max(16, "Must be less than 16")
    .required("Required"),
  })}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }}
>
  {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    /* and other goodies */
  }) => (
    <Form onSubmit={handleSubmit}>
      <Stack spacing={"10px"}>
      <MyTextInput
          name="userName"
          type="Text"
          placeholder="User Name"
        />
        <MyTextInput
          name="email"
          type="email"
          placeholder="Email"
        />
        <MyTextInput
          name="createPassword"
          type="password"
          placeholder="Create Password"
        />
        <MyTextInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
      </Stack>

      <Button
        width={"100%"}
        mt={'1em'}
        type="submit"
        color={'white'}
        backgroundColor={'black'}
        disabled={!isValid || isSubmitting} // Disable if form is not valid or submitting
      >
        SignUp
      </Button>
    </Form>
  )}
</Formik>

   </div>
    </div>
    <Footer/>
    </>
  )
  
}

export default Home