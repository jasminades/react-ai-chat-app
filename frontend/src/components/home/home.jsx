import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/chat');
  };

  return (
    <div className="home-container">
      <h1>welcome! let's chat :)</h1>
      <button
        onClick={handleGetStarted}
        className="get-started-btn"
      >
        get started
      </button>
    </div>
  );
}

export default Home;
