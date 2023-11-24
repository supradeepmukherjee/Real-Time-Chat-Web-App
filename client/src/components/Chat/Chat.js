import './Chat.css'
import { chatStarted } from '../../ActionsReducers/Welcome'
import { useDispatch } from 'react-redux'
import { selectChat } from '../../ActionsReducers/CurrentChat'

const Chat = ({ msg, time, name, chavi, chat, isGrp }) => {
  const dispatch = useDispatch()
  return (
    <div
      className='chat'
      onClick={() => {
        dispatch(selectChat(chat))
        dispatch(chatStarted())
      }}>
      <img src={chavi} alt="chavi" className="chatPhoto" />
      <p className="chatTitle">
        {name}
      </p>
      <p className="chatMsg">
        {isGrp && msg && `${msg?.sender.name}: `}{msg?.content.length > 50 ? `${msg?.content.substring(0, 33)}...` : msg?.content}
      </p>
      <p className="chatTime">
        {time}
      </p>
    </div>
  )
}

export default Chat