import React from 'react'

const Signup = ({onSubmit, username, email, password, password2, setPassword2, setUsername, setPassword, setEmail}) => {
  return (
    <form onSubmit={onSubmit}>
    <div className=" m-auto text-center rounded-xl p-6 z-3 shadow-xl h-140 w-110 md:h-170 md:w-130 bg-gray-100">
        <label className="font-bold">Email<br/></label>
        <input placeholder="Name@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl w-60 md:w-70 shadow-lg bg-gray-300 mt-5 mb-6 md:mt-7 md:mb-10 m-auto p-2 md:p-3" type="email" /><br/>

        <label className="font-bold">Username<br/></label>
        <input placeholder="Name123" required value={username} minLength={4} onChange={(e) => setUsername(e.target.value)} className="rounded-xl w-60 md:w-70 shadow-lg bg-gray-300 mt-5 mb-6 md:mt-7 md:mb-10 m-auto p-2 md:p-3" type="text" /><br/>

        <label className="font-bold">Password<br/></label>
        <input placeholder="Password" required value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} className="rounded-xl w-60 md:w-70 shadow-lg bg-gray-300 mt-5 mb-6 md:mt-7 md:mb-10 m-auto p-2 md:p-3" type="password" /><br/>

        <label className="font-bold">Confirm Password<br/></label>
        <input placeholder="Retype Password" required  minLength={8} value={password2} onChange={(e) => setPassword2(e.target.value)} className="rounded-xl w-60 md:w-70 shadow-lg bg-gray-300 mt-5 mb-6 md:mt-7 md:mb-10 m-auto p-2 md:p-3" type="password" /><br/>
        <input className="justify-center font-bold mt-5 md:py-4 cursor-pointer hover:bg-gray-500 py-2 px-12 w-55 rounded-xl text-white bg-black" type="submit" value="Create Account" />

      </div>
      </form>
  )
}

export default Signup