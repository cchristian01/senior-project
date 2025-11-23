import React from 'react'
import Signup from '../Components/Signup.jsx'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    try{
        const response = await axios.post('http://localhost:5000/api/signup', {
          username,
          email,
          password,
          password2,
        });
        setSuccessMessage(response.data.message);

    } catch(error) {
      setErrorMessage(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <>
    <Header />
    <br/>
    <br/>
    <Signup onSubmit={handleSubmit} username={username} email={email} password={password} password2={password2} setPassword2={setPassword2} setUsername={setUsername} setPassword={setPassword} setEmail={setEmail} />
    <br/>

    <div>
    <h1 className=" text-center font-bold text-red-700"> {errorMessage}</h1>
    <h1 className=" text-center font-bold text-green-500"> {successMessage}</h1>
    <h1 className="text-center">Already have an account yet? <a className="underline hover:text-gray-400 font-bold" ><Link to="/login">Login</Link></a></h1>
    </div>

    <div className="h-80"></div>


    <Footer />

    </>
  )
}

export default SignupPage