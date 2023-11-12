import { useNavigate } from 'react-router-dom'
import './Chat.css'

const Chat = ({ msg, time, name }) => {
  const navigate = useNavigate()
  return (
    <div className='chat' onClick={() => navigate('/chat')} >
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