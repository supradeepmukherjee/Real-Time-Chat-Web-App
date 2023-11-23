import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import ChatArea from '../ChatArea/ChatArea'
import './Home.css'
import Box from '../Box/Box'

const Home = () => {
  const { user } = useSelector(state => state.user)
  const { darkTheme: dark } = useSelector(state => state.dark)
  const { welcomeScreen } = useSelector(state => state.welcome)
  return (
    <>
      {user &&
        <>
          <Sidebar />
          {!welcomeScreen ?
            <ChatArea />
            :
            <div className={`welcome ${dark && 'dark'}`}>
              <img src="/icon-512.png" alt="Logo" className='welcomeLogo' />
              <p>
                View and text directly to people present in the chat rooms
              </p>
            </div>
          }
          <Box />
        </>}
    </>
  )
}

export default Home