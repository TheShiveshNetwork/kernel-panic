import React from 'react';
import { useRecoilState } from 'recoil';
import { globalVariable } from '@/recoil/global_test';

const IncrementValue = () => {
    const [value, setValue] = useRecoilState(globalVariable);

    const handleIncrement = () => {
        setValue(value + 1); 
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <button
                onClick={handleIncrement}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
                Increment Value (Current: {value})
            </button>
        </div>
    );
};

export default IncrementValue;
