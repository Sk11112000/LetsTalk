import React, { useEffect,useRef, useState } from 'react';
import { firestore } from '../../Services/Firebase';
import './ChatRoom.css'
import { useCollectionData } from 'react-firebase-hooks/firestore';
const ChatRoom = ({ senderId, receiverId }) => {
  
  const dummy=useRef();
  const [roomID, setRoomID] = useState(null);
  useEffect(()=>{
    
  },[])
  const query = firestore.collection("Messages")
  .where("sender", "==", senderId)
  .where("receiver","==",receiverId)
  .orderBy("createdAt")
  .limit(25);
  const [messages]=useCollectionData(query,{idField:'id'});
  const [formValue, setFormValue] = useState('');
  console.log(messages);
  function ChatMessage(props) {
    const { text, sender,receiver, photoURL } = props.message;
   
    const messageClass = sender === (JSON.parse(sessionStorage.getItem("userInfo")).id) ? 'sent' : 'received';
  console.log(text);
    return (<>
      <div className={`message ${messageClass}`}>
        <img className='chatRoomImg' src={photoURL} />
        <p className='chatRoomP'>{text}</p>
      </div>
    </>)
  }
  const sendMessage = async (e) => {
    e.preventDefault();

    const messageRef = firestore.collection("Messages"); 
    await messageRef.add({
      text: formValue,
      createdAt: new Date(),
      sender: senderId,
      receiver: receiverId,
      photoURL: JSON.parse(sessionStorage.getItem("userInfo")).image,
    });
    

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return ( <div className="chat-room">
  <main className="main">
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    <span ref={dummy}></span>
  </main>
  <form className="ChatRoomform" onSubmit={sendMessage}>
    <input
    className='chatRoomInput'
      value={formValue}
      onChange={(e) => setFormValue(e.target.value)}
      placeholder="Say something nice"
    />
    <button type="submit" disabled={!formValue}>
      🕊️
    </button>
  </form>
</div>
  )
}
 export default ChatRoom;