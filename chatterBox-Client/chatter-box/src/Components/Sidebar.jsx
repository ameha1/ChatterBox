import React, { useState } from 'react'

import './MyStyle.css'

import ConversationsItem from './ConversationsItem';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchIcon from '@mui/icons-material/Search';
import { toggleTheme } from "../Features/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);

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

  const navigate = useNavigate()

  return (


    <div className='side-bar'>
    
      <div className={"sb-header" + ((lightTheme)?' ':' dark') }>

        <div>
          <IconButton
          className={"icon" + ((lightTheme)?' ':' dark') }
          >
            <AccountCircleIcon />
          </IconButton>
        </div>


        <div>
          <IconButton
          className={"icon" + ((lightTheme)?' ':' dark') }
          onClick={()=>{
            navigate("users")
           }}>
            <PersonAddIcon />
          </IconButton>

          <IconButton
          className={"icon" + ((lightTheme)?' ':' dark') }
           onClick={()=>{
            navigate("groups")
           }}>
            <GroupAddIcon />
          </IconButton>

          <IconButton
          className={"icon" + ((lightTheme)?' ':' dark') }
           onClick={()=>{
            navigate("creategroup")
           }}>
            <AddCircleIcon />
          </IconButton>

          <IconButton
          className={"icon" + ((lightTheme)?' ':' dark') } 
          
          onClick={() => {
            dispatch(toggleTheme());
          }}> 
            {lightTheme && <NightlightIcon/>} 
            {!lightTheme && <LightModeIcon/>}
          </IconButton>
        </div>

    </div>

    <div className={"sb-search" + ((lightTheme)?' ':' dark') } >
      <IconButton>
        <SearchIcon />
      </IconButton>

      <input className={"search-box" + ((lightTheme)?' ':' dark') }  placeholder='Search' />
      
    </div>

    <div className={"sb-conversations" + ((lightTheme)?' ':' dark') } >

      {conversations.map((conversation) => {
        return <ConversationsItem props={conversation} 
                key={conversation.name}
                />
      } )}

    </div>
    
    </div>

  )
}

export default Sidebar