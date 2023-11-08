import React, { useEffect, useState } from 'react';
import { firestore } from '../../Services/Firebase';
// import { useCollection } from 'react-firebase-hooks/firestore';
const ChatRoom = ({ senderId, receiverId, message }) => {
  const [roomID, setRoomID] = useState(null);
  const messagesRef= firestore.collection("Messages");
  const query=messagesRef.where("room","==",roomID).orderBy("timestamp").limit(25);
  const [messages]=useCollectionData(query,{idField:'id'});
  useEffect(() => {
    if (!sessionStorage.getItem('roomId')) {
      const createOrGetChatRoom = async () => {
        const chatRoomQuery = await firestore
          .collection('ChatRooms')
          .where('participants', 'array-contains', senderId)
          .get();

        let existingChatRoom;

        chatRoomQuery.forEach((doc) => {
          const chatRoomData = doc.data();
          if (chatRoomData.participants.includes(receiverId)) {
            existingChatRoom = doc;
          }
        });

        if (existingChatRoom) {
          setRoomID(existingChatRoom.id);
          sessionStorage.setItem("roomId", existingChatRoom.id);
        } else {
          if (message !== '') {
            const newChatRoom = await firestore.collection('ChatRooms').add({
              participants: [senderId, receiverId],
            });
            setRoomID(newChatRoom.id);
            sessionStorage.setItem("roomId", newChatRoom.id);
          }
        }
      };

      createOrGetChatRoom();
    }
  }, [senderId, receiverId, message]);

  useEffect(() => {
    const roomIDFromSessionStorage = sessionStorage.getItem('roomId');
    
    if (roomIDFromSessionStorage) {
      sendMessage(message, roomIDFromSessionStorage);
      
    }
  }, [message]);

  

  const sendMessage = async (text, roomID) => {
    const now = new Date();
await firestore.collection('Messages').add({
  sender: senderId,
  room: roomID,
  content: text,
  timestamp: now, 
});
    
  };

  return (
    // {messages && messages.map(msg=> <ChatMessage key={msg.id} message={msg.content})}
    <></>
  );
};

export default ChatRoom;
