import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from './redux/chatSlice';
import { sendMessage } from './socket';

const Chat = () => {
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = {
        
        content: input,
        timestamp: new Date().toLocaleTimeString(),
        isSelf: true,
        name: name || 'Anonymous'  // Default to 'Anonymous' if no name is provided
      };
      sendMessage(message);
      setInput(''); // Clear input field
    }
  };

  return (
    <div className="chat-container">
      <div className='head'>
        <h1 className='heading'>ChatApp</h1>
        <input className="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          
        />
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isSelf ? 'self' : 'other'}`}>
            <p><strong>{msg.name}:</strong> {msg.content}</p>
            <span>{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
