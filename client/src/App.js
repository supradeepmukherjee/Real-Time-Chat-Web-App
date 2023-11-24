import { useEffect } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin/RegisterLogin';
import Home from './components/Home/Home';
import Error404 from './components/Error404/Error404';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { loadUser } from './Actions/User';

// TODO: Improve Dark Mode, Make it responsive, make dialog box to 1. seen(if possible) 2. make typing visible 3. auto scroll on new msg 4. show time in chat 5. show loading wherever reqd. 6. show notifications only when active 6. show unread chats ...improve with time
function App() {
  const dark = useSelector(state => state.dark)
  const { isAuthenticated } = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return (
    <Router>
      <div className={`app ${dark && 'dark lightShadow'}`}>
        <div className={`main ${dark && 'dark lightShadow'}`}>
          <Routes>
            <Route exact path='/' element={isAuthenticated ? <Home /> : <RegisterLogin />} />
            <Route exact path='*' element={<Error404 />} />
          </Routes >
        </div>
      </div>
    </Router >
  );
}

export default App;
// cd /d "D:/webd/React Projects/Chat/client"