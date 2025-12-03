import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './vite.svg'
import LoginPage from './Pages/Login-full.jsx'
import SignupPage from './Pages/Signup-full.jsx'
import HomePage from './Pages/HomePage.jsx'
import ChooseLp from'./Pages/ChooseLp.jsx'
import ChooseSubject from './Pages/ChooseSubject.jsx'
import ChooseMode from './Pages/ChooseMode.jsx'
import CoursePage from './Pages/CoursePage.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import ChatPage from './Pages/ChatPage.jsx'
import Leaderboard from './Pages/Leaderboard.jsx'
import ViewScore from './Pages/ViewScore.jsx'
import Settings from './Pages/Settings.jsx'
import PasswordReset from './Pages/PasswordReset.jsx'
import ResetPassword from './Pages/ResetPassword.jsx'
import AccountSettings from './Pages/AccountSettings.jsx'
import GamePage from './Pages/GamePage.jsx'
import GameWrapper from './Pages/GameWrapper.jsx'




function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('');
  const [learningPath, setLearningPath] = useState('');
  const [subject, setSubject] = useState('a');

  return (
    
  
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<HomePage />}/>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage username={username} setUsername={setUsername} />} />
      <Route path="/choose" element= {<ChooseLp userName={username}/>}/>
      <Route path="/chooseSubj" element={<ChooseSubject userName={username} />} />

      <Route path="/chooseMode/:subjName" element={<ChooseMode userName={username} />} /> 
      <Route path="/gameMode/:subjName" element={<GamePage />} />
      <Route path="/math-game/:subjName" element={<GameWrapper /> } />
      <Route path="/course/:subjName" element={<CoursePage />} subject={subject}/>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/view-score" element={<ViewScore />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/account-settings" element={<AccountSettings />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/verify" element={<ResetPassword />} /> 

    </Routes>

  </BrowserRouter> 
  
);
}

export default App
