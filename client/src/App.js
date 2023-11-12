import { useState } from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Entry from './components/Entry/Entry';
import Welcome from './components/Welcome/Welcome';
import ChatArea from './components/ChatArea/ChatArea';
import Users from './components/Users_Groups/Users';
import CreateGrp from './components/CreateGrp/CreateGrp';
import Error404 from './components/Error404/Error404';
import Sidebar from './components/Sidebar/Sidebar';
import GroupsJoined from './components/Users_Groups/GroupsJoined';
import { useSelector } from 'react-redux';
import './App.css'

// TODO: Improve Dark Mode, Make it responsive
function App() {
  const dark = useSelector(state => state.dark)
  return (
    <Router>
      <div className={`app ${dark && 'dark lightShadow'}`}>
        <div className={`main ${dark && 'dark lightShadow'}`}>
          <Sidebar />
          <Routes>
            <Route exact path='/' element={<Entry />} />
            <Route exact path='/welcome' element={<Welcome />} />
            <Route exact path='/chat' element={<ChatArea name={'nskfjnkjsnkjkjjjkglnjbijh i '} />} />
            <Route exact path='/users' element={<Users />} />
            <Route exact path='/grps' element={<GroupsJoined />} />
            <Route exact path='/creategrp' element={<CreateGrp />} />
            <Route exact path='*' element={<Error404 />} />
          </Routes >
        </div>
      </div>
    </Router >
  );
}

export default App;
// cd /d "D:/webd/React Projects/Chat/client"