import { useSelector } from 'react-redux'
import './OtherMsg.css'

const OtherMsg = ({ name, msg, time, chavi }) => {
    const { chat } = useSelector(state => state.currentChat)
    return (
        <div className='otherMsg'>
            {chat.isGrp && <img src={chavi} alt='chavi' className="chatPhoto" />}
            <div className="otherMsgContent">
                {chat.isGrp &&
                    <p className="chatTitle">
                        {name}
                    </p>}
                <p className="chatMsg" style={{ marginLeft: 0 }}>
                    {msg}
                </p>
                <p className="myMsgTime">
                    {time}
                </p>
            </div>
        </div>
    )
}

export default OtherMsg