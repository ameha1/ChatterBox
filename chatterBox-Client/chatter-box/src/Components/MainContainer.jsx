import React, { useState } from 'react'
import './MyStyle.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Greetings from './Greetings'
import CreateGroups from './CreateGroups'
import UsersGroup from './UsersGroup'
import { Outlet } from 'react-router-dom'


const MainContainer = () => {

  const [conversations, SetConversations] = useState([
    {
      name: "Ameha",
      lastMessage: "last Message#1",
      timeStamp: "Yesterday"
    },

  ]);

  return (

    <div className='main-container'>


      <Outlet/>

    <Sidebar />
    {/* <ChatArea props={conversations[0]} /> */}
    {/* <Greetings/> */}
    {/* <CreateGroups /> */}
    {/* <UsersGroup /> */}
    
    </div>

  )
}

export default MainContainer