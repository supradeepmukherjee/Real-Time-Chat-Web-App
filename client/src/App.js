import { useState } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterLogin from './components/RegisterLogin/RegisterLogin';
import Welcome from './components/Welcome/Welcome';
import Error404 from './components/Error404/Error404';
import { useSelector } from 'react-redux';
import './App.css'

// TODO: Improve Dark Mode, Make it responsive, complete chat controllers, make dialog box to  1. see my and other's photo,name,email  2. search user  3. seen(if possible) 4. make typing visible 5. MUI batch when searching users 6. auto scroll on new msg  ...improve with time
function App() {
  const dark = useSelector(state => state.dark)
  return (
    <Router>
      <div className={`app ${dark && 'dark lightShadow'}`}>
        <div className={`main ${dark && 'dark lightShadow'}`}>
          <Routes>
            <Route exact path='/' element={<RegisterLogin />} />
            <Route exact path='/chat' element={<Welcome />} />
            <Route exact path='*' element={<Error404 />} />
          </Routes >
        </div>
      </div>
    </Router >
  );
}

export default App;
// cd /d "D:/webd/React Projects/Chat/client"