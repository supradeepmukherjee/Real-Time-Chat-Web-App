import './Chat.css'
import { chatStarted } from '../../Slices/Welcome'
import { useDispatch } from 'react-redux'
import { selectChat } from '../../Slices/CurrentChat'

const Chat = ({ msg, time, name, chavi, chat }) => {
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
        {msg}
      </p>
      <p className="chatTime">
        {time}
      </p>
    </div>
  )
}

export default Chat