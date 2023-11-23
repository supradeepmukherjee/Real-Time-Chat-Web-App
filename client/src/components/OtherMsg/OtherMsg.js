import { useSelector } from 'react-redux'
import './OtherMsg.css'

const OtherMsg = ({ name, msg, time, chavi, show, extra }) => {
    const { chat } = useSelector(state => state.currentChat)
    return (
        <div className={`otherMsg ${extra && 'extra'}`}>
            {chat.isGrp && show && <img src={chavi} alt='chavi' className="chatPhoto" />}
            <div className={`otherMsgContent ${chat.isGrp && !show && 'moveRight'}`}>
                {chat.isGrp &&
                    <p className="chatTitle">
                        {name}
                    </p>}
                <p className="chatMsg">
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