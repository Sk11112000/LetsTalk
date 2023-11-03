import React, { useEffect, useState } from 'react';
import { firestore } from '../../Services/Firebase';

const ChatRoom = ({ senderId, receiverId }) => {
  const message="hi"
  const [roomID, setRoomID] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageInputRef = React.createRef();

  const createOrGetChatRoom = async () => {
    // Query Firestore for an existing chat room based on sender and receiver IDs
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
    } else {
      // If no chat room exists, create a new one
      const newChatRoom = await firestore.collection('ChatRooms').add({
        participants: [senderId, receiverId],
      });
      setRoomID(newChatRoom.id);
    }
  };

  const sendMessage = async (text) => {
    if (text.trim() !== '' && roomID) {
      await firestore.collection('Messages').add({
        sender: senderId,
        room: firestore.collection('ChatRooms').doc(roomID),
        content: text,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      if (messageInputRef.current) {
        messageInputRef.current.clear();
      }
    }
  };

  const fetchMessages = async () => {
    if (roomID) {
      const messagesQuery = await firestore
        .collection('Messages')
        .where('room', '==', firestore.collection('ChatRooms').doc(roomID))
        .orderBy('timestamp')
        .get();

      const messagesData = messagesQuery.docs.map((doc) => doc.data());
      setMessages(messagesData);
    }
  };

  useEffect(() => {
    createOrGetChatRoom();
    fetchMessages();
  }, [senderId, receiverId]);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default ChatRoom;
