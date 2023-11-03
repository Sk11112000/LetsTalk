import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import threeDotIcon from '../../res/threeDot.svg'

import { useNavigate } from 'react-router-dom';

import './Profile.css';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';

const Profile = ({image}) => {
  const navigate = useNavigate();
 
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <Box bg="darkcyan" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Avatar
          backgroundColor={"black"}
          src={image} />
        <Menu>
        <MenuButton className='menu-button' _hover={{backgroundColor:"#1ebea5"}} _active={{backgroundColor:"#1ebea5"}} background={"none"} _after={{background:"none"}} as={IconButton} aria-label="Options" icon={<img  style={{width:"2em"}} src={threeDotIcon}/>}   />
          <MenuList className='menu-list'>
            <MenuItem onClick={handleLogOut} className='menu-item'>Log Out</MenuItem>
            <MenuItem  className='menu-item'>Settings</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Profile;
