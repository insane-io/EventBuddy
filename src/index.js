import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "./Context/MyContext"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import DashBoard from './Pages/DashBoard';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import Notification from "./Pages/Notification"
import PermissionDenied from './Pages/PermissionDenied';
import Role from './Pages/Role';
import Choices from './Pages/Choices';
import Orgform from './Pages/Orgform';
import Myevent from './Pages/Myevent';
import Orglanding from './Pages/Orglanding';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<BaseLayout />} >
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Register />} />
        <Route path='chat' element={<Chat />} />
        <Route path='profile' element={<Profile />} />
        <Route path='notification' element={<Notification />} />
        <Route path='permissiondenied' element={<PermissionDenied />} />
        <Route path='role' element={<Role />} >
          <Route path='dashboard/:id' element={<DashBoard />} />
          <Route path='myevents' element={<Myevent />} />
        </Route>
        <Route path='signup' element={<Register />} />
        <Route path='chat' element={<Chat />} />
        <Route path='profile' element={<Profile />} />
        <Route path='choices' element={<Choices />} />
        <Route path='orgform' element={<Orgform />} />
        <Route path='orglanding' element={<Orglanding />} />

      </Route>
    </Route>
  )
)

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
