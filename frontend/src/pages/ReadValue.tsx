import React from 'react';
import { useRecoilValue } from 'recoil';
import { globalVariable } from '@/recoil/global_test';

const ReadValue = () => {
    const value = useRecoilValue(globalVariable);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800">
                Global Value:
                <span className="ml-2 text-blue-500">{value}</span>
            </h1>
        </div>
    );
};

export default ReadValue;
