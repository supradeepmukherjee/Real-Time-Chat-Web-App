import './OtherMsg.css'

const OtherMsg = ({ name, msg, time }) => {
    return (
        <div className='otherMsg'>
            <div className='chat'>
                <p className="chatPhoto">
                    {name[0]}
                </p>
                <div className="otherMsgContent">
                    <p className="chatTitle">
                        {name}
                    </p>
                    <p className="chatMsg">
                        {msg}
                    </p>
                    <p className="myMsgTime">
                        {time}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OtherMsg