import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import './Welcome.css'

const Welcome = () => {
  const dark = useSelector(state => state.dark)
  return (
    <>
      <Sidebar />
      <div className={`welcome ${dark && 'dark'}`}>
        <img src="/icon-512.png" alt="Logo" className='welcomeLogo' />
        <p>
          View and text directly to people present in the chat rooms
        </p>
      </div>
    </>
  )
}

export default Welcome