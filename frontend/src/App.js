import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Chat from './components/chat/Chat';
import Home from './components/home/home';

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/chat" element = {<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;