import React from 'react'
import './MyStyle.css'
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Deleteicon from '@mui/icons-material/Delete'

import MessageSelf from './MessageSelf'
import MessageOthers from './MessageOthers'

const ChatArea = ( {props} ) => {
  
  return (
    
    // <div className="chatArea">

      <div className="chatArea-container">

        <div className="chatArea-header">
          
          <p className='con-icon'>{props.name[0]}</p>

          <div className="header-text">

            <p className='con-title'>{props.name}</p>
            <p className='con-timeStamp'>{props.timeStamp}</p>

          </div>

          <IconButton>
            <Deleteicon />
          </IconButton>

        </div>

        <div className="messages-container">

          <MessageSelf />
          <MessageOthers />
          <MessageSelf />
          <MessageOthers />
          <MessageSelf />
          <MessageOthers />
          <MessageSelf />
          <MessageOthers />
          <MessageSelf />
          <MessageOthers />

        </div>

        <div className="text-input-area">

          <input className='search-box' placeholder='Type a Message' />
          <IconButton>
            <SendIcon/>
          </IconButton>

        </div>


      </div>

    // </div>
 
  )
}

export default ChatArea
