import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from "../assets/12679207_1920_1080_30fps.mp4";
import profilePic from "../assets/profile.png";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const handleStartGame = () => {
    if (validateForm()) {
      navigate('/panic');
    }
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
        <h1 className="text-4xl font-bold mb-3 text-gray-100 animate-fadeIn">Welcome to Kernel Panic!</h1>
        <p className="instructions mb-5 text-xl text-gray-300">
          Enter your details and embark on your journey through life decisions impacting your Money, Health, and Happiness!
        </p>
        <div className="form-container flex flex-col items-center bg-black bg-opacity-80 p-8 rounded-lg shadow-2xl w-96">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Email"
            className="bg-gray-900 bg-opacity-50 border-b-4 border-blue-500 focus:border-blue-400 focus:outline-none transition duration-300 p-3 text-lg text-white rounded-md mb-4 w-full"
            aria-label="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter Password"
            className="bg-gray-900 bg-opacity-50 border-b-4 border-blue-500 focus:border-blue-400 focus:outline-none transition duration-300 p-3 text-lg text-white rounded-md mb-4 w-full"
            aria-label="Enter your password"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleStartGame}
            className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300"
            aria-label="Start the game"
          >
            Enter the Game
          </button>
        </div>
        <div className="rules mt-8 p-6 bg-black bg-opacity-80 rounded-lg shadow-2xl text-lg text-gray-300 transition duration-500 hover:bg-opacity-90">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Game Rules</h2>
          <ul className="list-decimal list-inside space-y-2">
            <li className="hover:text-white transition-colors duration-300">Rule 1: Every choice impacts your scores.</li>
            <li className="hover:text-white transition-colors duration-300">Rule 2: Optimize your happiness, health, and wealth scores through wise decisions.</li>
            <li className="hover:text-white transition-colors duration-300">Rule 3: Navigate through the game to determine your final outcomes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
