import React, { createContext, useState } from 'react'
import './MyStyle.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import Greetings from './Greetings'
import CreateGroups from './CreateGroups'
import UsersGroup from './Users'
import { Outlet } from 'react-router-dom'

export const myContext = createContext();

const MainContainer = () => {

  const [conversations, SetConversations] = useState([
    {
      name: "Ameha",
      lastMessage: "last Message#1",
      timeStamp: "Yesterday"
    },

  ]);

  const [refresh, setRefresh] = useState(true);

  return (

    <div className='main-container'>

<     myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Outlet />
        <Sidebar />
      </myContext.Provider>  


    {/* <ChatArea props={conversations[0]} /> */}
    {/* <Greetings/> */}
    {/* <CreateGroups /> */}
    {/* <UsersGroup /> */}
    
    </div>

  )
}

export default MainContainer