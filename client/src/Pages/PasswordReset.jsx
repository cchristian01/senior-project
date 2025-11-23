import { useState } from "react";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
   const res = await fetch("http://localhost:5000/forgot-password", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({mail: email})
   });

   alert(await res.text());
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
      <button type="submit">Send Reset Email</button>
      <p></p>
    </form>
  );
}
