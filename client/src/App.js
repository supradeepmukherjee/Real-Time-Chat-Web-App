import { useEffect, useState } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin/RegisterLogin';
import Welcome from './components/Welcome/Welcome';
import Error404 from './components/Error404/Error404';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { loadUser } from './Actions/User';

// TODO: Improve Dark Mode, Make it responsive, complete chat controllers, make dialog box to  1. see my and other's photo,name,email  2. search user  3. seen(if possible) 4. make typing visible 5. MUI batch when searching users 6. auto scroll on new msg 7. add typing animation  ...improve with time
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
            <Route exact path='/' element={isAuthenticated ? <Welcome /> : <RegisterLogin />} />
            <Route exact path='*' element={<Error404 />} />
          </Routes >
        </div>
      </div>
    </Router >
  );
}

export default App;
// cd /d "D:/webd/React Projects/Chat/client"