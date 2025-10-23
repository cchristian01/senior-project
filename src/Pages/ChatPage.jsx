import {React, useState, useEffect} from 'react'
import Footer from '../Components/Footer.jsx'
import DisplayBox from '../Components/DisplayBox.jsx'
const ChatPage = () => {
    
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (e) => {setSearch(e.target.value);};
    const [results, setResults] = useState([]);
    const [chatWithUser, setChatWithUser] = useState('');
    useEffect(() => {

        if(!searchTerm) return;
    const getUsers = async() => {
        const resp = await fetch('http://localhost:5000/api/chat-search',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({search_val: search})
        });

        if(resp.ok) {
            console.log('no error happened')
        }
        console.log(search)
        const data = await resp.json();
        const users = data.map(elem => elem.ln_username);
        setResults([]);
        setResults (prevResults => [...prevResults, ...users])
        console.log(results)
     
    };

    getUsers();

 },[searchTerm])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchTerm(search)
    }

    const setChatPartner = (user) => {
        setChatWithUser(user);
        console.log(chatWithUser)
    }


  return (
    <>
    <div className='text-center font-bold text-2xl md:text-3xl m-10 md:m-15'>
        <h1 >Welcome to</h1> <span><h1 className='text-red-500 text-3xl md:text-4xl mb-8'>LearnNow Chat•••²</h1></span>
        <hr />
    </div>
    <div className='h-20 text-center w-full'>
        <div className='mt-12 mr-10 md:mr-50 md:mt-20 h-[0.6] w-full'>
            <form onSubmit={handleSubmit}>
            <input className='rounded-lg text-lg'type="text" value={search} onChange={handleInputChange} placeholder='Search for a user...'/><span><button className='cursor-pointer hover:h-3'>🔍</button></span>
            </form>

            <ul className='bg-black-400 h-8'>
                {results.map((result, index) => (
                <li key={index}><button className='cursor-pointer hover:font-bold' onClick={() => setChatPartner(result)}>{result}</button></li>  // Use a unique key if possible instead of index
                ))}
            </ul>
            
        </div>
    </div>
            
    <h1 className='text-left text-black-600 ml-3 md:ml-8 text-md md:text-xl font-bold mb-3 md:mb-4'>| Chat History |</h1>
    <div className='grid grid-cols-2 h-10 p-0 md:h-160 mb-30'>
        <div className='text-left  ml-2 bg-gray-200 rounded-lg h-full w-30 md:w-50'>
            <ul>
                <li></li>
            </ul>
        </div>
            <DisplayBox />

    </div>
    <div className='h-50'>

    </div>
    <Footer />
    </>
  )
}

export default ChatPage