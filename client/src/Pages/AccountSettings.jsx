import {react, useEffect, useState} from 'react'
import Footer from '../Components/Footer.jsx'

const AccountSettings = () => {
  const maskedPassword = "•".repeat(8);
  const user = localStorage.getItem('usersname');
  let data;
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  useEffect(() => {
  const getEmail = async() => {
    const res = await fetch("http://localhost:5000/get-email", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: user})
    });

    data = await res.json();
    setEmail(data[0].ln_email);
  }
  getEmail();
}, []);

  const handleResetPassword = async(e) => {
      e.preventDefault();
   const res = await fetch("http://localhost:5000/forgot-password", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({mail: email})
   });

   if(res.ok)
      setLinkSent(true);
  };

  return (
    <>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

      {/* Username */}
      <div className="mb-5">
        <label className="block font-medium mb-1">Username:</label>
        <p className="text-gray-700">{user}</p>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block font-medium mb-1">Email:</label>
        <p className="text-gray-700">{email}</p>
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="block font-medium mb-1">Password:</label>
        <p className="text-2xl tracking-widest text-gray-700">{maskedPassword}</p>
        <button
          className="mt-3 px-4 py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-blue-700 transition"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
      
    </div>
    <div className='h-40 md:h-80'>
      {linkSent? <p className='text-green-700 text-center font-bold'>A password reset link has been sent to your email.</p>:<></>}

    </div>
    <Footer />
    </>
  );
};

export default AccountSettings;
