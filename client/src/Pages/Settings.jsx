import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Footer from '../Components/Footer.jsx'


const Settings = () => {

  const [dark, setDark] = useState(()=>{return localStorage.getItem("theme") ==="dark"});
 

  useEffect(() => {
    document.documentElement.classList.toggle("dark",dark);
    if(dark){
      localStorage.setItem("theme","dark");
    }
    else{
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

console.log(dark);

    return (
        <>
        
          <div className='dark:bg-black '>
        <div className='bg-gray-400 dark:bg-black'>
            <h1 className='font-bold text-4xl dark:text-white my-8'>Settings</h1>
        </div>

        <hr className='dark:text-white' />
        <h1 className='font-bold text-3xl mt-4 text-center dark:text-white underline decoration-red-500'>General</h1>

<div className="text-2xl bg-gray-200 dark:bg-stone-800 mt-10 md:mt-12 h-120">
            <ul>
                <Link to="/settings/account-settings"><li className='bg-gray-400 dark:bg-gray-800 dark:text-white '>Account Settings</li></Link>
                 <li className='bg-gray-300 dark:bg-gray-600 dark:text-white' >LightMode v DarkMode <button onClick={() => setDark(prev => !prev)} className='border rounded-xl p-1 cursor-pointer hover:p-2'>{dark?"Switch to LightMode":"Switch to DarkMode"}</button> </li> 
            </ul>
            {console.log(document.documentElement.classList)}
        </div>
          <div className="h-40"></div>
        <Footer />
        </div>
        </>
    )
};

export default Settings