import React, { useEffect, useState } from 'react';
import { firestore } from '../../Services/Firebase';
import { useLayoutEffect } from 'react';
import { async } from 'regenerator-runtime';

const ChatRoom = ({ senderId, receiverId, message }) => {
  const [roomID, setRoomID] = useState(null);
  const [messages, setMessages] = useState([]);
  useLayoutEffect( async()=>{
    const chatRoomQuery = await firestore
    .collection('ChatRooms')
    .where('participants', 'array-contains', senderId)
    .get();
    
  },[])
  return(
    <h1>{message}</h1>
  )
};
export default ChatRoom;