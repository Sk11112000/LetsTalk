
import React from 'react';
import ReactDOM from 'react-dom/client';


import { createBrowserRouter, RouterProvider,BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/react';
import Header from '../src/Component/Header'
import Home from './Page/Home/Home';
import Login from './Page/Login/Login';
import SignUp from './Page/SignUp/SignUp';
import Chat from './Page/Chat/Chat';
import Profile from './Page/Profile/Profile';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>, 
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/chat',
    element:<Chat/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
 
]);
export default function App() {
  
  return (
   <>
<React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
</React.StrictMode>
   </>
  )
}