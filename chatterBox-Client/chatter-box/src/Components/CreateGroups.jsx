import React from 'react'
import {IconButton} from '@mui/material'
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded'

const CreateGroups = () => {
  return (
    <div className="createGroups-container">

        <input placeholder='Enter Groups Name' type="text" className='search-box' />

        <IconButton>

            <DoneOutlineRoundedIcon />

        </IconButton>

    </div>
  )
}

export default CreateGroups