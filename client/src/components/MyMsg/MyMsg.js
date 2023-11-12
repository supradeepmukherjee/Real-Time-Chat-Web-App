import './MyMsg.css'

const MyMsg = ({ msg,time }) => {
    return (
        <div className='myMsg'>
            <div className="msgBox">
                <p>
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