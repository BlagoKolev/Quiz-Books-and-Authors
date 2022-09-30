import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Logout from './components/Logout';
import Question from './components/Question';
import Header from './components/Header';
import { UserContext } from './UserContext';

function App() {
  let [user, setUser] = useState();
  let [score, setScore] = useState();

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, score, setScore }} >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='question' element={<Question />} />
          <Route path='logout' element={<Logout/>} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
