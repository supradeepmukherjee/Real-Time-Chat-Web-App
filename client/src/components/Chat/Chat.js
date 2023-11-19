import './Chat.css'
import { chatStarted } from '../../Slices/Welcome'
import { useDispatch } from 'react-redux'

const Chat = ({ msg, time, name, chavi }) => {
  const dispatch = useDispatch()
  return (
    <div className='chat' onClick={() => dispatch(chatStarted())}>
      <p className="chatPhoto">
        {name[0]}
      </p>
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