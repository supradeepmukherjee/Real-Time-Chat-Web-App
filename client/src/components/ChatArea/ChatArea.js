import { IconButton } from "@mui/material"
import Info from "@mui/icons-material/Info";
import Send from "@mui/icons-material/Send";
import MyMsg from "../MyMsg/MyMsg";
import OtherMsg from "../OtherMsg/OtherMsg";
import io from 'socket.io-client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from '../Alert'
import alert from '../../alert'
import Feed from 'react-scrollable-feed'
import './ChatArea.css'
import { selectBox } from "../../ActionsReducers/Box";
import { notificationsF } from "../../ActionsReducers/Notification";
import axios from "axios";

let socket
const ChatArea = ({ fetchNow, setFetchNow }) => {
  const dispatch = useDispatch()
  const { chat } = useSelector(state => state.currentChat)
  const { user } = useSelector(state => state.user)
  const { notifications } = useSelector(state => state.notifications)
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sendLoading, setSendLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [Msg, setMsg] = useState('')
  const [msgs, setMsgs] = useState([])
  const typingHandler = e => {
    setMsg(e.target.value)
    if (!socketConnectionStatus) return
    if (!typing) {
      socket.emit('typing', chat._id)
      setTyping(true)
    }
    let typingStopTime = new Date().getTime()
    let wait = 2400
    setTimeout(() => {
      let currTime = new Date().getTime()
      if ((currTime - typingStopTime) > wait && typing) {
        socket.emit('typing stopped', chat._id)
        setTyping(false)
      }
    }, wait);
  }
  const sendMsgHandler = async e => {
    e.preventDefault()
    socket.emit('typing stopped', chat._id)
    let trimmedMsg = Msg.trim()
    if (trimmedMsg === '') return
    try {
      setSendLoading(true)
      const { data } = await axios.post(`/api/msg`, { id: chat._id, content: trimmedMsg }, { headers: { 'Content-Type': 'application/json' } })
      socket.emit('new msg', data.msg)
      setMsg('')
      setMsgs([...msgs, data.msg])
      setSendLoading(false)
    } catch (error) {
      console.log(error)
      setSendLoading(false)
      alert('error', setAlertType, 'Some Error Occurred', setAlertMsg, setAlertVisibility, dispatch)
    }
  }
  const getMsgs = async () => {
    if (!chat) return
    try {
      const { data } = await axios.get(`/api/msg/${chat._id}`)
      setMsgs(data.msgs)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert('error', setAlertType, 'Some Error Occurred', setAlertMsg, setAlertVisibility, dispatch)
    }
  }
  useEffect(() => {
    socket = io('/')
    socket.emit('setup', user)
    socket.on('connected', () => setSocketConnectionStatus(true))
    socket.on('typing', () => setTyping(true))
    socket.on('typing stopped', () => setTyping(false))
    return () => {
      socket.off('connected')
    }
  }, [user])
  useEffect(() => {
    getMsgs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat])
  useEffect(() => {
    socket.emit('join chat', chat._id)
    return () => {
      socket.off('join chat')
    }
  }, [chat._id])
  useEffect(() => {
    socket.on('msg received', newMsg => {
      if (!chat || chat._id !== newMsg.chat._id) {
        if (!notifications.includes(newMsg)) {
          dispatch(notificationsF(newMsg))
        }
      }
      else setMsgs([...msgs, newMsg])
    })
  })
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
            {msgs?.map((msg, i) => {
              return (
                msg?.sender?._id === user._id ?
                  <MyMsg msg={msg?.content} time='10:00' extra={
                    i < msgs.length - 1 && msgs[i + 1].sender._id !== msg.sender._id
                  } />
                  :
                  <OtherMsg
                    name={msg.sender?.name}
                    chavi={msg.sender?.chavi}
                    msg={msg.content}
                    time='10:00'
                    show={
                      (
                        i < msgs.length - 1 &&
                        ((msgs[i + 1].sender?._id !== msg.sender?._id ||
                          msgs[i + 1].sender?._id === undefined) ||
                          msgs[i + 1].sender?._id === user._id)
                      )
                      ||
                      (
                        i === msgs.length - 1 &&
                        msgs[msgs.length - 1].sender?._id !== user._id
                      )
                    }
                    extra={
                      i < msgs.length - 1 && msgs[i + 1].sender?._id !== msg.sender?._id
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