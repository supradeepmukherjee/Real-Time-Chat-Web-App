import { IconButton } from "@mui/material"
import Info from "@mui/icons-material/Info";
import Send from "@mui/icons-material/Send";
import MyMsg from "../MyMsg/MyMsg";
import OtherMsg from "../OtherMsg/OtherMsg";
import io from 'socket.io-client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMsgs, sendMsg } from '../../Actions/Msg'
import Alert from '../Alert'
import alert from '../../alert'
import Feed from 'react-scrollable-feed'
import './ChatArea.css'
import { selectBox } from "../../Slices/Box";

let socket
const ChatArea = ({ fetchNow, setFetchNow }) => {
  const dispatch = useDispatch()
  const { chat } = useSelector(state => state.currentChat)
  const { user } = useSelector(state => state.user)
  const { loading, msgs, error } = useSelector(state => state.getMsgs)
  const { loading: sendLoading, msg, error: sendError } = useSelector(state => state.sendMsg)
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false)
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [typing, setTyping] = useState(false)
  const [Msg, setMsg] = useState('')
  const [Msgs, setMsgs] = useState([])
  const typingHandler = e => {
    setMsg(e.target.value)
    if (!typing) {
      setTyping(true)
    }
    let typingStopTime = new Date().getTime()
    let wait = 2400
    setTimeout(() => {
      let currTime = new Date().getTime()
      if ((currTime - typingStopTime) > wait && typing) {
        setTyping(false)
      }
    }, wait);
  }
  const sendMsgHandler = async e => {
    e.preventDefault()
    let trimmedMsg = Msg.trim()
    if (trimmedMsg === '') return
    await dispatch(sendMsg(chat._id, trimmedMsg))
    setMsg('')
  }
  useEffect(() => {
    // socket = io('/')
    // socket.emit('setup',)//userdata after ,
    // socket.on('connection', () => setSocketConnectionStatus(!socketConnectionStatus))
  }, [])
  useEffect(() => {
    dispatch(getMsgs(chat._id))
  }, [chat._id, dispatch])
  useEffect(() => {
    setMsgs(msgs)
  }, [msgs])
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
    if (sendError) alert('error', setAlertType, sendError, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error, fetchNow, sendError])
  return (
    <>
      <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
      <div className='chatArea'>
        <div className="chatAreaHeader">
          <div className="chatPhoto">
            <img src={chat.isGrp ?
              chat.chavi
              :
              (chat.users[0]._id === user?._id ? chat.users[1].chavi : chat.users[0].chavi)} alt="chavi" className="chatPhoto" />
          </div>
          <div className="chatAreaHeaderText">
            <div className="chatTitle">
              {chat.isGrp ?
                chat.name
                :
                (chat.users[0]._id === user?._id ? chat.users[1].name : chat.users[0].name)}
            </div>
          </div>
          <IconButton onClick={() => dispatch(selectBox(6))}>
            <Info />
          </IconButton>
        </div>
        <div className="chatAreaMsgs">
          <Feed>
            {Msgs?.map((msg, i) => {
              return (
                msg.sender._id === user._id ?
                  <MyMsg msg={msg.content} time='10:00' extra={
                    i < Msgs.length - 1 && Msgs[i + 1].sender._id !== msg.sender._id
                  } />
                  :
                  <OtherMsg
                    name={msg.sender.name}
                    chavi={msg.sender.chavi}
                    msg={msg.content}
                    time='10:00'
                    show={
                      (
                        i < Msgs.length - 1 &&
                        ((Msgs[i + 1].sender._id !== msg.sender._id ||
                          Msgs[i + 1].sender._id === undefined) ||
                          Msgs[i + 1].sender._id === user._id)
                      )
                      ||
                      (
                        i === Msgs.length - 1 &&
                        Msgs[Msgs.length - 1].sender._id !== user._id
                      )
                    }
                    extra={
                      i < Msgs.length - 1 && Msgs[i + 1].sender._id !== msg.sender._id
                    } />
              )
            })}
          </Feed>
        </div>
        <form className="chatAreaInput" onSubmit={sendMsgHandler}>
          <input type="text" placeholder="Send a Message" name="" id="search" onChange={typingHandler} value={Msg} />
          <IconButton type='submit' disabled={sendLoading}>
            <Send />
          </IconButton>
        </form>
      </div>
    </>
  )
}

export default ChatArea