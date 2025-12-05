import { Link } from 'react-router-dom'
import {useState, useLayoutEffect} from 'react'
import Footer from '../Components/Footer.jsx'


const Settings = () => {
const [theme, setTheme] = useState("light");
  const [loaded, setLoaded] = useState(false);

  // Fix initial load BEFORE rendering
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem("theme");
    const initial = saved === "dark" ? "dark" : "light";

    setTheme(initial);

    if (initial === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    setLoaded(true);
  }, []);

  // Update dark class on toggle
  useLayoutEffect(() => {
    if (!loaded) return;

    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    sessionStorage.setItem("theme", theme);
  }, [theme, loaded]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  if (!loaded) return null; 

console.log("FINAL HTML:", document.documentElement.classList.value);

    return (
        <>
        <div className='dark:bg-yellow-400 bg-black'>
            <h1 className='font-bold text-4xl text-white my-8'>Settings</h1>
        </div>

        <hr />
        <h1 className='font-bold text-3xl mt-4 text-center underline decoration-red-500'>General</h1>

<div className="text-2xl bg-gray-200 mt-10 md:mt-12 h-120">
            <ul>
                <Link to="/settings/account-settings"><li className='bg-gray-400'>Account Settings</li></Link>
                {/* <li >LightMode v DarkMode <button onClick={toggleTheme} className='border rounded-xl p-1 cursor-pointer hover:p-2'>Switch </button> </li> */}
            </ul>
            {console.log(document.documentElement.classList)}
        </div>

        <Footer />
        </>
    )
};

export default Settings