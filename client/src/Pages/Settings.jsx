import { Link } from 'react-router-dom'
import Footer from '../Components/Footer.jsx'

const Settings = () => {


    return (
        <>
        <div className='bg-yellow-400'>
            <h1 className='font-bold text-4xl my-8'>Settings</h1>
        </div>

        <hr />
        <h1 className='font-bold text-3xl mt-4 text-center underline decoration-red-500'>General</h1>

        <div className='text-2xl bg-gray-200 mt-10 md:mt-12 h-120'>
            <ul>
                <Link to="/settings/account-settings"><li className='bg-gray-400'>Account Settings</li></Link>
                <li >LightMode v DarkMode <button className='border rounded-xl p-1 cursor-pointer'>Switch</button> </li>
            </ul>
        </div>

        <Footer />
        </>
    )
};

export default Settings