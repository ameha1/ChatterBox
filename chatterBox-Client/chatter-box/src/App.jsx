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
import Users from './Components/Users'
import Groups from './Components/Groups'


function App() {

  return (
      <div className="App">

        <Routes>

           <Route path='/' element={<LogIn/>} />

            <Route path='app' element={<MainContainer/>} >

              <Route path='greeting' element={<Greetings/>}> </Route>
              <Route path="chat/:_id" element={<ChatArea />}></Route>
              <Route path='creategroup' element={<CreateGroups/>}></Route>
              <Route path='users' element={<Users/>}> </Route>
              <Route path='groups' element={<Groups/>}> </Route>

            </Route>
          
         
        </Routes>
        
      </div>
  )
}

export default App
