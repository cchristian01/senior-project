
const Login = ({onSubmit, username, setUsername, password, setPassword}) => {
    return(
      
      <form onSubmit={onSubmit}>
        <div className=" m-auto rounded-xl p-6 z-3 shadow-xl h-85 w-70 md:h-110 md:w-100 bg-gray-100">
        <label className="font-bold">Username:<br/></label>
        <input required placeholder="Name123" value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-xl w-50 md:w-75 shadow-lg bg-gray-300 mt-5 mb-6 md:mt-7 md:mb-10 m-auto p-2 md:p-3" type="text" /><br/>

        <label className="font-bold">Password:<br/></label>
        <input required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl w-50 md:w-75 shadow-lg bg-gray-300 mt-5 mb-6 md:mt-7 md:mb-10 m-auto p-2 md:p-3" type="password" /><br/>
      <div className="text-center">
      
        <input className="justify-center font-bold mt-2 md:py-4 cursor-pointer hover:bg-gray-500 py-2 px-12 w-45 rounded-xl text-white bg-black" type="submit" value="Login" /><br/>
      
        <h1 className="md:mb-8 text-sm mt-3">Forgot Password? <a className="underline font-bold hover:text-gray-400" href="./">Reset Using Email</a></h1><br/>
      </div>
      </div>
      </form>
      
    )
};


export default Login;