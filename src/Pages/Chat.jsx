import React, { useEffect, useState, useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import { MyContext } from '../Context/MyContext';

const Chat = () => {

    const userName  = localStorage.getItem("userName")
    const users = [
        { id: 1, name: 'Karan' },
        { id: 2, name: 'Rahul' },
    ];

    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const handleWebSocketMessage = useCallback((event) => {
        const data = JSON.parse(event.data);
        setMessages(prevMessages => {
            if (prevMessages.length === 0 || prevMessages[prevMessages.length - 1].message !== data.message) {
                return [...prevMessages, { message: data.message, sender: data.sender }];
            }
            return prevMessages;
        });
    }, []);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8001/ws/chat/1/");

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = handleWebSocketMessage;

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        setSocket(ws);

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [handleWebSocketMessage]);

    console.log(messages)

    useEffect(() => {
        async function getChats() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/chat/chatrooms/1/messages/", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                const formattedMessages = res.data.map(d => ({
                    message: d.content,
                    sender: d.sender.username,
                    name: d.sender.first_name
                }));
                console.log(res.data[0].sender.first_name)
                setMessages(formattedMessages);
            } catch (error) {
                console.log(error);
            }
        }
        getChats();
    }, []);

    const handleInput = (e) => {
        setText(e.target.value);
    };

    const sendMessage = () => {
        if (text.trim() !== '' && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message: text, sender: userName }));
            setMessages(prevMessages => [...prevMessages, { message: text, sender: userName }]);
            setText('');
        }
    };

    return (
        <div className='grid grid-cols-5 mx-20 my-5 gap-x-5'>
            <div className='col-span-1 gap-y-3 bg-gray-100 p-4 flex flex-col items-center h-[36rem] rounded-xl'>
                <input type="text" className='w-full p-3 rounded-xl focus:outline-none' placeholder='Search...' />
                <div className='flex flex-col overflow-y-auto items-center w-full gap-3'>
                    {users.map(user => (
                        <NavLink key={user.id} to={`/chat/${user.id}`} className="p-3 bg-[#FFCBBE] w-full rounded-xl">
                            {user.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='col-span-4 p-5 bg-gray-100 rounded-xl flex flex-col h-[36rem]'>
                <div className='bg-[#FFCBBE] px-5 flex items-center rounded-xl w-full h-16 mb-5'>
                    <h1>Hello</h1>
                </div>
                <div className='flex-1 overflow-y-auto'>
                    {messages.map((msg, index) => (
                        <div key={index} className='p-2 mb-2'>
                            {msg.sender === userName ? (
                                <div className='flex justify-end'>
                                    <div className='rounded-xl p-3 max-w-96 bg-[#FFCBBE]'>
                                        <span className='text-lg'>{msg.message}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex justify-start'>
                                    <div className='rounded-xl p-3 max-w-96 bg-gray-300'>
                                        <h1 className='text-sm font-semibold mb-2 underline text-[#ff967b]'>{msg.name}</h1>
                                        <span className='text-lg '>{msg.message}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='mt-5 flex items-center gap-4'>
                    <input
                        type="text"
                        value={text}
                        onChange={handleInput}
                        className='w-full p-3 rounded-xl focus:outline-none'
                        placeholder='Type a message...'
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <IoMdSend className='cursor-pointer size-9' onClick={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
