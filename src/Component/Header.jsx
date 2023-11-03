import React from 'react';
import Logo from '../res/logo2.png';
import './Header.css';
import { Link } from 'react-router-dom';

import {
  Drawer,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
    <div className='navBar' style={{alignItems:'center'}} >
      <img src={Logo} style={{height:"5em"}}/>
       <nav className='navList'>
        <Link to="/" className='link' >Home</Link>
        <Link to="/" className='link' >Contact Us</Link>
        <Link to="/" className='link' >About App</Link>
       
        <Link to="/login"><Button colorScheme='gray' size='sm' style={{marginRight:'1em'}}>Login</Button></Link>
        <Link to="/signup"><Button colorScheme='gray' size='sm' >SignUp</Button></Link>
      </nav>
      <div className='MobileView'>
      <HamburgerIcon onClick={onOpen}/>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay style={{backgroundColor:'black'}}/>
        <DrawerContent>
          
          
          <div className="MobileViewList">
          <DrawerCloseButton style={{color:'white',backgroundColor:'black'}} />
          <nav className='navListMobile'>
        <Link to="/" className='mobileLink'>Home</Link>
        <Link to="/" className='mobileLink'>Contact Us</Link>
        <Link to="/" className='mobileLink'>About App</Link>
        <Link to="/login"> <Button  style={{padding: '1em'}}>Login</Button></Link>
        <Button  style={{padding: '1em',marginTop:'1em'}}><Link to="/signup">SignUp</Link></Button>
      </nav>
      </div>

          
        </DrawerContent>
      </Drawer>
      </div> 
      </div>
    
   
    </>
  )
}

export default Header

