import React, { useState } from 'react'
import './MyStyle.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'


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

    <Sidebar />
    <ChatArea props={conversations[0]} />
    
    </div>

  )
}

export default MainContainer