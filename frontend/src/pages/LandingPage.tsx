import React from 'react';
import { Link } from 'react-router-dom';
import { clearLocalStorage } from '@/recoil/global_test';

const LandingPage = () => {
    const handleClearStorage = () => {
        clearLocalStorage('globalVariable');
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-8">Welcome to the App</h1>
            <nav className="flex gap-6 mb-6">
                <Link
                    to="/incrementValue"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Go to Increment
                </Link>
                <Link
                    to="/readValue"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Go to Read Value
                </Link>
                <Link
                    to="/panic"
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                    Go to Panic
                </Link>
            </nav>
            <button
                onClick={handleClearStorage}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
                Clear Local Storage
            </button>
        </div>
    );
};

export default LandingPage;
