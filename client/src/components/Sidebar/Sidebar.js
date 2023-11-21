import User from '@mui/icons-material/AccountCircle'
import PersonAdd from '@mui/icons-material/PersonAdd'
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
import { darkTheme, lightTheme } from '../../Slices/Theme'
import Alert from '../Alert'
import alert from '../../alert'
import './Sidebar.css'
import { selectBox } from '../../Slices/Box'

const Sidebar = ({ fetchNow }) => {
  const dispatch = useDispatch()
  const { darkTheme: dark } = useSelector(state => state.dark)
  const { chats, error } = useSelector(state => state.chat)
  const { user } = useSelector(state => state.user)
  const [search, setSearch] = useState('')
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  useEffect(() => {
    const wait = setTimeout(() => {
      dispatch(getChats(search))
    }, 1200);
    return () => clearTimeout(wait)
  }, [dispatch, search, fetchNow])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error, fetchNow])
  return (
    <>
      <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
      <div className='sidebar'>
        <div className={`sidebarHeader ${dark && 'dark'}`}>
          <div className="">
            <Tooltip title="My Profile" arrow>
              <IconButton onClick={() => dispatch(selectBox(1))}>
                <User className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Log Out" arrow>
              <IconButton onClick={() => dispatch(selectBox(2))}>
                <Logout className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="">
            <Tooltip title="New Chat" arrow>
              <IconButton onClick={() => dispatch(selectBox(3))}>
                <PersonAdd className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create New Group" arrow>
              <IconButton onClick={() => dispatch(selectBox(4))}>
                <NewGroup className={dark && 'dark'} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" arrow>
              <IconButton onClick={() => dispatch(selectBox(5))}>
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
          {chats?.map(chat => <Chat
            chat={chat}
            msg={chat.latestMsg}
            time='today'
            isGrp={chat.isGrp}
            name={chat.isGrp ?
              chat.name
              :
              (chat.users[0]._id === user?._id ? chat.users[1].name : chat.users[0].name)
            }
            chavi={chat.isGrp ?
              chat.chavi
              :
              (chat.users[0]._id === user?._id ? chat.users[1].chavi : chat.users[0].chavi)
            }
            key={chat._id} />)}
        </div>
      </div>
    </>
  )
}

export default Sidebar