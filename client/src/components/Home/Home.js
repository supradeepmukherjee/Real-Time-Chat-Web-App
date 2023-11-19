import { useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import ChatArea from '../ChatArea/ChatArea'
import './Home.css'

const Home = () => {
  const { user } = useSelector(state => state.user)
  const { darkTheme: dark } = useSelector(state => state.dark)
  const { welcomeScreen } = useSelector(state => state.welcome)
  const [fetchNow, setFetchNow] = useState(false)
  return (
    <>
      {user &&
        <>
          <Sidebar fetchNow={fetchNow} />
          {!welcomeScreen ?
            <ChatArea fetchNow={fetchNow} setFetchNow={setFetchNow} />
            :
            <div className={`welcome ${dark && 'dark'}`}>
              <img src="/icon-512.png" alt="Logo" className='welcomeLogo' />
              <p>
                View and text directly to people present in the chat rooms
              </p>
            </div>
          }
        </>}
    </>
  )
}

export default Home