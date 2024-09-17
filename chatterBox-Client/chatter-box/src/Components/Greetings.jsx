import React from 'react'

import logo from '../assets/logo.png'

const Greetings = () => {
  return (
    <div className={"greeting-container"}>
      <img src={logo} alt="Logo" className="greeting-logo"/>
      
      <b>Hi 👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  )
}

export default Greetings