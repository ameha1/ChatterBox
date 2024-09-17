import React, { useState } from 'react'

import './MyStyle.css'

import ConversationsItem from './ConversationsItem';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';

import { IconButton } from '@mui/material';

const Sidebar = () => {
  const [conversations, SetConversations] = useState([
    {
      name: "Ameha",
      lastMessage: "last Message#1",
      timeStamp: "Yesterday"
    },
    {
      name: "Test2",
      lastMessage: "last Message#1",
      timeStamp: "Today"
    },
    {
      name: "Test3",
      lastMessage: "last Message#1",
      timeStamp: "LastWeek"
    }

  ]);
  return (


    <div className='side-bar'>
    
      <div className="sb-header">

        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>


        <div>
          <IconButton>
            <PersonAddIcon />
          </IconButton>

          <IconButton>
            <GroupAddIcon />
          </IconButton>

          <IconButton>
            <AddCircleIcon />
          </IconButton>

          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>

    </div>

    <div className="sb-search">
      <IconButton>
        <SearchIcon />
      </IconButton>

      <input className='search-box' placeholder='Search' />
      
    </div>

    <div className="sb-conversations">

      {conversations.map((conversation) => {
        return <ConversationsItem props={conversation} />
      } )}

    </div>
    
    </div>

  )
}

export default Sidebar