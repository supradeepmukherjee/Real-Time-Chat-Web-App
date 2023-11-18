import User from '@mui/icons-material/AccountCircle'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Group from '@mui/icons-material/Group'
import NewGroup from '@mui/icons-material/GroupAdd'
import Nightlight from '@mui/icons-material/Nightlight'
import LightMode from '@mui/icons-material/LightMode'
import Search from '@mui/icons-material/Search'
import Notification from '@mui/icons-material/Notifications'
import Logout from '@mui/icons-material/Logout';
import { IconButton, Tooltip } from "@mui/material";
import Chat from '../Chat/Chat'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../Actions/Chat'
import { darkTheme, lightTheme } from '../../Theme'
import Alert from '../Alert'
import Loader from '../Loader/Loader'
import alert from '../../alert'
import './Sidebar.css'
import Box from '../Box'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { darkTheme: dark } = useSelector(state => state.dark)
  const { loading, chats, error } = useSelector(state => state.chat)
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState(1)
  const [search, setSearch] = useState('')
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  useEffect(() => {
    const wait = setTimeout(() => {
      dispatch(getChats(search))
    }, 1200);
    return () => clearTimeout(wait)
  }, [dispatch, search])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error])
  return (
    <>
      <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
      <div className='sidebar'>
        <div className={`sidebarHeader ${dark && 'dark'}`}>
          <div className="">
            <Tooltip title="My Profile" arrow>
              <IconButton onClick={() => setOpen(true)}>
                <User className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Log Out" arrow>
              <IconButton onClick={() => setOpen(true)}>
                <Logout className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="">
            <Tooltip title="New Chat" arrow>
              <IconButton onClick={() => setOpen(true)}>
                <PersonAdd className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Groups Joined" arrow>
              <IconButton onClick={() => setOpen(true)}>
                <Group className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create New Group" arrow>
              <IconButton onClick={() => setOpen(true)}>
                <NewGroup className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" arrow>
              <IconButton onClick={() => setOpen(true)}>
                <Notification className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title={dark ? 'Light Mode' : "Dark Mode"} arrow>
              <IconButton
                onClick={() => dispatch(dark ? lightTheme() : darkTheme())}
              >
                {dark ? <LightMode className={dark && 'dark'} /> : <Nightlight />}
              </IconButton>
            </Tooltip>
          </div>
        </div >
        <div className={`sidebarSearch ${dark && 'dark'}`}>
          <IconButton>
            <Search className={dark && 'dark'} />
          </IconButton>
          <input placeholder='Search' type="text" name="search" id="search" className={dark && 'dark'} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className={`sidebarConversations ${dark && 'dark'}`}>
          {chats?.map(chat => <Chat msg={chat.latestMsg} time='today' name={chat.name} />)}
        </div>
      </div>
      <Box open={open} setOpen={setOpen} text={'Start Chat with a new User'} confirm={''} box={box} />
    </>
  )
}

export default Sidebar