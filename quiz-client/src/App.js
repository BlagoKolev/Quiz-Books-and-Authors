import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Test from './components/Test';
import Question from './components/Question';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='test' element={<Test />} />
        <Route path='question' element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
