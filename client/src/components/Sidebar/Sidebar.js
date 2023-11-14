import User from '@mui/icons-material/AccountCircle'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Group from '@mui/icons-material/Group'
import NewGroup from '@mui/icons-material/GroupAdd'
import Nightlight from '@mui/icons-material/Nightlight'
import LightMode from '@mui/icons-material/LightMode'
import Search from '@mui/icons-material/Search'
import { IconButton, Tooltip } from "@mui/material";
import Chat from '../Chat/Chat'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../Theme'
import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dark = useSelector(state => state.dark)
  const [chats, setChats] = useState([

  ])
  return (
    <div className='sidebar'>
      <div className={`sidebarHeader ${dark && 'dark'}`}>
        <div className="">
          <Tooltip title="My Profile" arrow>
            <IconButton onClick={() => navigate('/')}>
              <User className={dark && 'dark'} />
            </IconButton>
          </Tooltip>
        </div>
        <div className="">
          <Tooltip title="My Profile" arrow>
            <IconButton onClick={() => navigate('/users')}>
              <PersonAdd className={dark && 'dark'} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Groups Joined" arrow>
            <IconButton onClick={() => navigate('/grps')}>
              <Group className={dark && 'dark'} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create New Group" arrow>
            <IconButton onClick={() => navigate('/creategrp')}>
              <NewGroup className={dark && 'dark'} />
            </IconButton>
          </Tooltip>
          <Tooltip title={dark ? 'Light Mode' : "Dark Mode"} arrow>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
            >
              {dark ? <LightMode className={dark && 'dark'} /> : <Nightlight />}
            </IconButton>
          </Tooltip>
        </div>
      </div >
      <div className={`sidebarSearch ${dark && 'dark'}`}>
        <IconButton onClick={() => navigate('/')}>
          <Search className={dark && 'dark'} />
        </IconButton>
        <input placeholder='Search' type="text" name="search" id="search" className={dark && 'dark'} />
      </div>
      <div className={`sidebarConversations ${dark && 'dark'}`}>
        <Chat msg='This is the latest msg' time='today' name='human being' />
        <Chat msg='This is the latest msg' time='today' name='human being' />
        <Chat msg='This is the latest msg' time='today' name='human being' />
      </div>
    </div >
  )
}

export default Sidebar