import { useState } from "react";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);


  const handleReset = async (e) => {
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
    <form onSubmit={handleReset}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className='cursor-pointer' type="submit">Send Reset Email</button>
      {linkSent?<p className='text-green-700 font-bold'>A password reset link has been sent to your email.</p>:<></>}
    </form>
  );
}
