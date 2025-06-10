import React, { useState, useEffect, useRef } from 'react';
import './chat.css';

function Chat() {
  const initialMessages = [
    { role: 'bot', content: 'how can I help you today?' }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    setInput('');

    try {
      const response = await fetch('http://localhost:5050/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', content: 'error ' + data.error }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'greska u backendu' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Funkcija za resetovanje chata
  const handleNewChat = () => {
    setMessages(initialMessages);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2>chat project</h2>

        {/* Dugme za novi chat */}
        <button className="new-chat-button" onClick={handleNewChat}>New Chat</button>

        <div className="messages-window">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
            >
              <span>{msg.content}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type your message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
