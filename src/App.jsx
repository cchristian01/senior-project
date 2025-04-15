import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './Pages/Login-full.jsx'
import SignupPage from './Pages/Signup-full.jsx'
import HomePage from './Pages/HomePage.jsx'
import ChooseLp from'./Pages/ChooseLp.jsx'
import ChooseSubject from './Pages/ChooseSubject.jsx'
import ChooseMode from './Pages/ChooseMode.jsx'
import CoursePage from './Pages/CoursePage.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'




function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('');
  const [learningPath, setLearningPath] = useState('');
  const [subject, setSubject] = useState('');

  return (
    
  
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<HomePage />}/>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage username={username} setUsername={setUsername} />} />
      <Route path="/choose" element= {<ChooseLp userName={username}/>}/>
      <Route path="/chooseSubj" element={<ChooseSubject userName={username}/>} />
      <Route path="/chooseMode" element={<ChooseMode userName={username}/>} /> 
      <Route path="/course" element={<CoursePage />} />
    </Routes>

  </BrowserRouter> 
  
);
}

export default App
