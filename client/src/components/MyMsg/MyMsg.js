import './MyMsg.css'

const MyMsg = ({ msg, time, extra }) => {
    return (
        <div className={`myMsg ${extra && 'extra'}`}>
            <div className="msgBox">
                <p className='msgText'>
                    {msg}
                </p>
                <p className="myMsgTime">
                    {time}
                </p>
            </div>
        </div>
    )
}

export default MyMsg