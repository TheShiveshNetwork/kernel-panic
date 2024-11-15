import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from "../assets/1092677147-preview.mp4";
import profilePic from "../assets/profile.png";

const LandingPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleStartGame = () => {
    navigate('/panic');
  };

  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-fixed bg-center text-white text-center overflow-hidden">
      <video autoPlay muted loop className="absolute w-auto min-w-full min-h-full max-w-none">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl transform hover:scale-110 transition duration-300">
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> 
        </div>
        <h1 className="text-4xl font-bold mb-3 text-gray-100">Welcome to Kernel Panic!</h1>
        <div className="instructions mb-5 text-xl text-gray-300 animate-fadeIn">
          <p>Enter your username and start your journey through critical life decisions affecting your Money, Health, and Happiness scores. Make your choices wisely!</p>
        </div>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter Username"
          className="username-input bg-gray-900 bg-opacity-50 border-b-4 border-blue-500 focus:border-blue-400 focus:outline-none transition duration-300 p-3 text-xl text-white"
          aria-label="Enter your username"
        />
        <button onClick={handleStartGame} className="start-game-button bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300 mt-5"
                aria-label="Start the game">
          Enter the Game
        </button>
        <div className="rules mt-8 p-6 bg-black bg-opacity-80 rounded-lg shadow-2xl text-lg text-gray-300 transition duration-500 hover:bg-opacity-90">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Game Rules</h2>
          <ul className="list-decimal list-inside space-y-2">
            <li className="hover:text-white transition-colors duration-300">Rule 1: Every choice impacts your scores.</li>
            <li className="hover:text-white transition-colors duration-300">Rule 2: Choose your path wisely to optimize happiness, health, and wealth.</li>
            <li className="hover:text-white transition-colors duration-300">Rule 3: The game progresses as you make decisions, with each affecting your final outcome.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
