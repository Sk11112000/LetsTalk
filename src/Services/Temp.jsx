import React, { useState } from 'react';
import { firestore } from './firebase'; // Import the Firestore reference

function App() {
  const [data, setData] = useState({
    userName: '',
    age: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add data to Firestore
    firestore
      .collection('User') // Specify the collection name
      .add(data) // Add your data object here
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        // Reset the form or show a success message
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        // Handle errors here
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={data.userName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={data.age}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;