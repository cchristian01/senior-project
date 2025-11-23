import React from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
const ResetPassword = () => {
    const location = useLocation();
    const [password, setPassword] = useState("");
    const [tokenData, setTokenData] = useState(null);

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      if(token){
        setTokenData(token);
      }

    }, [location.search]);

    if(!tokenData) return<p>No token found</p>;

    const submit = async e => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/reset-password/:token`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({password}),
        });


        alert(await res.text());
    };
  return (
   <form onSubmit={submit}>
      <h2>Reset Password</h2>
      <input 
        type="password" 
        placeholder="New password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Reset</button>
    </form>
  )
}

export default ResetPassword