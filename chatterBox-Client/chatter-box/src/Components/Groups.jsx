import React from 'react'

import Logo from'../assets/Logo.png'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence,  motion } from "framer-motion"

const Groups = () => {
  
  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <AnimatePresence>
        <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
        ease: "anticipate",
        duration: "0.3",
        }} 
        className="list-container">
            <div className={"ug-header" + ((lightTheme)?' ':' dark') }>
                <img src={Logo} alt=""
                    style={{height: "3rem", width:"4rem"}} />
                <p className='ug-title'>Available Groups</p>
            </div>

            <div className={"sb-search" + ((lightTheme)?' ':' dark') }>
                <IconButton>
                    <SearchIcon/>
                </IconButton>

                <input className='search-box' placeholder='Search for a group' type="text" />
            </div>

            <motion.div className={"ug-list" + ((lightTheme)?' ':' dark') }
            
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1 }}
            >

                <div className="list-tem">
                    <p className='con-icon'>G</p>
                    <p className='con-Title'>Group#1</p>
                </div>

                <div className="list-tem">
                    <p className='con-icon'>G</p>
                    <p className='con-Title'>Group#2</p>
                </div>

                <div className="list-tem">
                    <p className='con-icon'>G</p>
                    <p className='con-Title'>Group#3</p>
                </div>

                <div className="list-tem">
                    <p className='con-icon'>G</p>
                    <p className='con-Title'>Group#4</p>
                </div>

                <div className="list-tem">
                    <p className='con-icon'>G</p>
                    <p className='con-Title'>Group#5</p>
                </div>

            </motion.div>

        </motion.div>
    </AnimatePresence>
  )
}

export default Groups