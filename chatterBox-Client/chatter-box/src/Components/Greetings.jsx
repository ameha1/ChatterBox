import React from 'react'

import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";


const Greetings = () => {

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  const nav = useNavigate();
  if (!userData) {
    console.log("User not Authenticated");
    nav("/");
  }

  return (
    <div className={"greeting-container"}>
      <img src={logo} alt="Logo" className="greeting-logo"/>
      
      <b>Hello, {userData.data.name}👋</b>
      <p>Explore and text directly to people present in the chat Rooms.</p>
    </div>
  )
}

export default Greetings