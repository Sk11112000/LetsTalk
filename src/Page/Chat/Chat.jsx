import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { firestore } from '../../Services/Firebase';
import ChatView from './ChatView';
import './Chat.css'
import searchIcon from '../../res/search.svg';
import './ChatList.css';
import { SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useCallback } from 'react';

const Chat = () => {
  const [memberData,setMemberData]=useState({});
  const List = ({ member }) => {
    
    // const latestMessageTime =
    //   `${(member.time.getHours() % 12 || 12)}:${(member.time.getMinutes() > 9 ? member.time.getMinutes() : `0${member.time.getMinutes()}`)}`;
      const handleListClick = (event) => {
        event.preventDefault(); 
        setMemberData(member);
          member.newNotificationCount=0;
          
      }

      
    return (
      <Box onClick={(event)=>handleListClick(event)} px={4} h={16} display="flex" alignItems="center" borderBottom="1px solid" borderColor="gray.200" width={"100%"} _hover={{ fontWeight: 'semibold', backgroundColor: 'gray.100' }}>
        <Avatar size="md" src={member.image} marginRight=".6em" />
        <div className='parentChatListName'>
          <div className="nameTime">
            <h1>{member.userName}</h1>
            {/* <span>{latestMessageTime}</span> */}
          </div>
          {/* <div className="timeMessage">
            <p>{member.notificationMessage}</p>
            {member.newNotificationCount > 0 ? (
              <span className="count">{member.newNotificationCount}</span>
            ) : ('')}
          </div> */}
        </div>
      </Box>
    );
  };
  
const ChatList = useCallback(()=>{
    const [list,setList]=useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await firestore.collection('users').where('id','!=',(JSON.parse(sessionStorage.getItem("userInfo"))).id).get();
          let userList = [];
          querySnapshot.forEach((doc) => {
            userList.push(doc.data());
           
          });
          
          setList(userList);
          
          
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      fetchData();
    }, []);
    const handleInputChange = (e) => {
      console.log(e);
    };
  
    return (
      <>
        <Box  height="100vh" width={"60vh"}>
        <div className="searchParent">
          <div className="search">
            <InputGroup size="sm">
              <Input
                placeholder=""
                borderRadius="5%"
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <InputRightAddon backgroundColor="#09b1b1">
                <SearchIcon />
              </InputRightAddon>
            </InputGroup>
          </div>
        </div>
        
        <div className="chat-list-container" style={{ overflow: "scroll", height: "99%", paddingBottom:"6em"}}>
        {list.map((members)=>(
          <List member={members} key={members.id} />
          ))}
          
        </div>
      </Box>
      
      </>
    );

 },{})
  return (
   <>
   <div className='ChatHomePage'>
    <div className='profileAndChatList'>
      <div className='profile'>
        <Profile image=""/>
      </div>
      <div className='chatList'>
        <ChatList/>
      </div>
    </div>
    <div className='ChatView'>
      <ChatView memberData={memberData}/>
    </div>
    </div>
    </>
  )
};

export default Chat;