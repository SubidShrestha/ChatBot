import { useState } from 'react';
import axios from 'axios';

function App() {

  const [message,setMessage] = useState({sender:'User',msg:''});
  const [messages,setMessages] = useState([]);

  const send_message = ()=>{
    messages.push(message);
    const data = axios.post('http://127.0.0.1:8000/api/chat/',{
      message: message.msg,
      sender : message.sender
    }).then(
      (response) => {
        const data = response.data
        setMessages([...messages, data]);
        setMessage({sender:'User',msg:''});
      }
    ).catch(
      (err) =>{
        console.log(err)
      }
    )
    return data;
  };

  return (
    <>
      <h1 className='text-2xl mt-2 text-center italic'>ChatBot</h1>
      <div className='container absolute mt-5 mx-auto shadow-lg rounded-lg'>
        <div className="w-4/5 h-[640px] mb-5 mx-auto px-5 flex flex-col justify-between border-x-2">
          <div className="flex h-[500px] max-h-[500px] overflow-y-scroll flex-col mt-5 mb-5">
            {messages.map((value, index) => {
              if (value.sender !== 'Chatbot') {
                return (
                  <div key={index} className="flex justify-end mt-2 mb-4">
                  <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    <p>{value.msg}</p>
                  </div>
                  <img src="user.jpg" className="object-cover h-12 w-12 rounded-full" alt="" />
                </div>
                );
              } else {
                return (
                  <div key={index} className="flex justify-start mb-4">
                    <img src="bot.png" className="object-cover h-12 w-12 rounded-full" alt="" />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                      <p>{value.msg}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="w-4/5 mx-auto py-5 border-t-2">
            <input
                className="w-4/5 mx-auto bg-gray-300 py-5 px-3 rounded-full mr-3"
                type="text"
                placeholder="Chat message..."
                onChange={(e) => setMessage({sender:'User',msg:e.target.value})}
                value={message.msg}
              ></input>
              <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={send_message}>
                Send
              </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
