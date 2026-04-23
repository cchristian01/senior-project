import {React, useState, useEffect, useRef} from 'react'
import Footer from '../Components/Footer.jsx'
import DisplayBox from '../Components/DisplayBox.jsx'
import io from 'socket.io-client'

const socket = io("http://localhost:5000");
const ChatPage = () => {
    const username = sessionStorage.getItem('usersname');
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (e) => {setSearch(e.target.value);};
    const [results, setResults] = useState([]);
    const [chatWithUser, setChatWithUser] = useState('');
    const inputRef = useRef();


    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {

        socket.emit("user_connected", username);

        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, msg])
        });

        return () => {
            socket.off("receive_message");
        };

    }, []);

    const sendMessage = () => {
        if(!chatWithUser || !message.trim()) return;

        const msg = {
            senderUsername: username,
            receiverUsername: chatWithUser,
            content: message,
        };

        socket.emit("send_message", msg);

        setMessages((prev) => [...prev, {...msg, self:true}]);
        setMessage('');
        clear();
    }

    console.log(messages);


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

   const clear = () =>{
        inputRef.current.value="";
   }




  return (
    <div className='dark:bg-black'>
    <div className='text-center font-bold text-2xl md:text-3xl m-10 md:m-15'>
        <h1 className='dark:text-white'>Welcome to</h1> <span><h1 className='text-red-500 text-3xl md:text-4xl mb-8'>LearnNow Chat•••²</h1></span>
        <hr className='dark:text-white' />
    </div>
    <div className='h-20 text-center w-full'>
        <div className='mt-12 mr-10 md:mr-50 md:mt-20 h-[0.6] w-full'>
            <form onSubmit={handleSubmit}>
            <input className='rounded-lg dark:bg-white text-lg'type="text" value={search} onChange={handleInputChange} placeholder='Search for a user...'/><span><button className='cursor-pointer hover:h-3'>🔍</button></span>
            </form>

            <ul className='bg-black-400 h-8'>
                {results.map((result, index) => (
                <li key={index}><button className='cursor-pointer dark:text-white hover:font-bold' onClick={() => setChatPartner(result)}>{result}</button></li>  // Use a unique key if possible instead of index
                ))}
            </ul>
            
        </div>
    </div>
            
    <h1 className='text-left text-black-600 ml-3 md:ml-8 text-md md:text-xl font-bold dark:text-white mb-3 md:mb-4'>| Chat History |</h1>
    <div className='grid grid-cols-[30%_50%] gap-0 h-10 m-0 p-0 md:h-160 mb-30 '>
        <div className='text-left  ml-2 bg-gray-200 rounded-lg h-[full] w-[full] md:w-[full]'>
            <ul>
                <li></li>
            </ul>
        </div>



  <div className='bg-gray-100 dark:bg-stone-800 relative rounded-xl dark:text-white text-left h-full md:h-[full] w-full align-left md:w-[full] m-0 pb-10   shadow-xl z-3'>
      <h1 className='bg-black-600 text-center font-bold text-lg'>Current Chat</h1>
      <h2 className='bg-black-600 text-left font-bold text-lg'>Recipient: </h2> <span> <h2 className='font-bold dark:text-white text-gray-500'>{chatWithUser} </h2></span> 
      <div className='bg-gray-50 dark:bg-black relative rounded-xl overflow-scroll w-[0.8] h-[80%] mb-6 m-2 md:m-4'>
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((msg, idx) => (
            <div 
                key={idx}
                className={`${
    (msg.senderUsername === username) && msg.self
      ? "text-purple-500"
      : "text-black dark:text-white"
  }`}
  style={{
    textAlign:
      msg.senderUsername === username || msg.self ? "right" : "left",
    margin:
      !(msg.senderUsername === username) && !msg.self
        ? "0px 20px"
        : "0px",
  }} >
                    <p><strong>{msg.senderUsername===username? `You → ${msg.receiverUsername}` : `${msg.senderUsername} → You`} </strong> {msg.content}</p>
            </div>
        ))}
          <div className='absolute pt-[80%] pl-[10%] w-full h-[20%] '>


          </div>

      </div>
      <div className="absolute w-full ">
                  <textarea className='ml-[8%] border-b-2 border-l focus:border-gray outline-0' type="text" ref={inputRef}onChange={(e)=>setMessage(e.target.value)} onKeyDown={(e)=> {if(e.key==="Enter") sendMessage()}}placeholder='Enter message...'/> <span><button className='text-red-600 pl-[10%] font-bold text-lg cursor-pointer hover:text-xl'onClick={sendMessage}>Send</button></span>
        </div>
    </div>



    </div>
    <div className='h-50'>

    </div>
    <Footer />
    </div>
  )
}

export default ChatPage