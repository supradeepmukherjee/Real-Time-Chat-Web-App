import { IconButton } from "@mui/material"
import Delete from "@mui/icons-material/Delete";
import Send from "@mui/icons-material/Send";
import './ChatArea.css'
import MyMsg from "../MyMsg/MyMsg";
import OtherMsg from "../OtherMsg/OtherMsg";
import io from 'socket.io-client'
import { useEffect, useState } from "react";

let socket
const ChatArea = ({ name, time }) => {
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false)
  useEffect(() => {
    socket = io('/')
    socket.emit('setup',)//userdata after ,
    socket.on('connection', () => setSocketConnectionStatus(!socketConnectionStatus))
  }, [socketConnectionStatus])
  return (
    <div className='chatArea'>
      <div className="chatAreaHeader">
        <div className="chatPhoto">
          {name[0]}
        </div>
        <div className="chatAreaHeaderText">
          <div className="chatTitle">
            {name}
          </div>
          <div className="chatTime">
            {time}
          </div>
        </div>
        <IconButton>
          <Delete />
        </IconButton>
      </div>
      <div className="chatAreaMsgs">
        <MyMsg msg={'I am sendingsendingsendingsendingsendingsendingsendingsendingsendingsendingsendingv a new msg to test this component'} time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' />
        <OtherMsg name={'dusra koi'} msg='sending a new msg to test this component' time='10:00' ddd />
      </div>
      <div className="chatAreaInput">
        <input type="text" placeholder="Send a Message" name="" id="search" />
        <IconButton>
          <Send />
        </IconButton>
      </div>
    </div>
  )
}

export default ChatArea