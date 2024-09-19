import React from 'react'
import {IconButton} from '@mui/material'
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded'
import { useDispatch, useSelector } from "react-redux";

const CreateGroups = () => {
  
  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <div className={"createGroups-container" + ((lightTheme)?' ':' dark') }>

        <input placeholder='Enter Groups Name' type="text" className='search-box' />

        <IconButton>

            <DoneOutlineRoundedIcon />

        </IconButton>

    </div>
  )
}

export default CreateGroups