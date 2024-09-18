import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainContainer from './Components/MainContainer'
import LogIn from './Components/LogIn'
import { Route, Router, Routes } from 'react-router-dom'
import Greetings from './Components/Greetings'
import ChatArea from './Components/ChatArea'
import CreateGroups from './Components/CreateGroups'
import UsersGroup from './Components/UsersGroup'


function App() {

  return (
      <div className="App">

        <Routes>

           <Route path='/' element={<LogIn/>} />

            <Route path='app' element={<MainContainer/>} >

              <Route path='greeting' element={<Greetings/>}> </Route>
              <Route path='chat' element={<ChatArea/>}> </Route>
              <Route path='creategroup' element={<CreateGroups/>}></Route>
              <Route path='groups' element={<UsersGroup/>}> </Route>

            </Route>
          
         
        </Routes>
        
      </div>
  )
}

export default App
