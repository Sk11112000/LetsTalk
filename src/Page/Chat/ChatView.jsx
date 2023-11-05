import React, { useState } from 'react';
import './ChatView.css';
import chatLogo from '../../res/ChatLogo.svg';
import threeDotIcon from '../../res/threeDot.svg';
import sendIcon from '../../res/sendIcon.svg';
import InputEmoji from 'react-input-emoji';
import {
  Box,
  Avatar,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
  InputGroup,
  Button,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { Search2Icon,AddIcon } from '@chakra-ui/icons';
import ChatRoom from './ChatRoom';

const ChatView = ({ memberData }) => {
  const [message,setMessage]=useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  document.body.style.overflow = 'hidden';
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = React.createRef();

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };
  const handleSendMessage = (text) => {
    if (text.trim() !== '') {
      setMessage(text);
      const newMessages = [...messages, { text, sender: 'user' }];
      setMessages(newMessages);
      setNewMessage('');
    }
  };

  const HaveData = () => {
    
    return (
      <>
        <Box bg="darkcyan" px={4}>
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Avatar src={memberData.image} />
            <p style={{ padding: '1em' }}>{memberData.userName}</p>
            <p className="right">
              <Search2Icon color="white" mr={1} />
            </p>
            <p className="right2">
              <Menu>
                <MenuButton
                  className="menu-button"
                  _hover={{ backgroundColor: '#1ebea5' }}
                  _active={{ backgroundColor: '#1ebea5' }}
                  background={'none'}
                  _after={{ background: 'none' }}
                  as={IconButton}
                  aria-label="Options"
                  icon={<img style={{ width: '2em' }} src={threeDotIcon} />}
                />
                <MenuList className="menu-list">
                  <MenuItem className="menu-item">Log Out</MenuItem>
                  <MenuItem className="menu-item">Settings</MenuItem>
                </MenuList>
              </Menu>
            </p>
          </Flex>
        </Box>
        <div>
       <ChatRoom senderId={(JSON.parse(sessionStorage.getItem('userInfo'))).id} receiverId={memberData.id} message={message}/>

        <div className="message-input">
        <Button ml={1} colorScheme='teal' variant='solid'>
          <AddIcon/>
        </Button>
          <InputGroup size="sm">
            <InputEmoji
              value={newMessage}
              cleanOnEnter
              onEnter={handleSendMessage}
              placeholder="Type your message..."
            />
            </InputGroup>
            
         
        </div>
        </div>
      </>
    );
  };

  const NoData = () => {
    return (
      <div className="noData">
        <img src={chatLogo} />
      </div>
    );
  };

  if (memberData.userName) {

    return <HaveData />;
  } else {
    return <NoData />;
  }
};

export default ChatView;
