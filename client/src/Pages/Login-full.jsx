import Login from '../Components/Login.jsx'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import ChooseLp from './ChooseLp.jsx'
import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom';

const LoginPage = ({username, setUsername}) => {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });

            if(response.data.token) {
                setToken(response.data.token);
                setIsLoggedIn(true);
                setErrorMessage('');
                sessionStorage.setItem('usersname', username);
            }
        } catch(error) {
            setErrorMessage('Invalid credentials');
        }

        
    }

    



    return(
        isLoggedIn ? <ChooseLp userName={username}/> :
    <>
        <Header />
        <div className="text-left">
            <button className="text-white ml-10 bg-gray-600 font-bold hover:bg-gray-500 cursor-pointer rounded-lg shadow-lg mt-10 p-3"><Link to="/">View HomePage</Link></button>
        </div>
    <h1 className="mt-40 font-[helvetica] font-bold text-center text-4xl text-gray-400">Welcome!</h1>
    <br/><br/>
    <Login onSubmit={handleSubmit} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
    <br/>
    <div>
        <h1 className=" text-center font-bold text-red-700">{errorMessage}</h1>
        <h1 className="text-center">Don't have an account yet? <a className="underline hover:text-gray-400 font-bold" ><Link to="/signup">Sign Up</Link></a></h1>
    </div>
    <div className="h-80"></div>
    <Footer />
    </>
    );
}

export default LoginPage;