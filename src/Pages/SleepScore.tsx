import React from 'react';
import logo from './logo.svg';

function SleepScore() {
  return (
    <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-4">
        <div className="bg-blue-400 col-span-3 md:col-span-1 md:row-span-3">
            <div className="h-full w-full flex justify-center items-end md:justify-end md:items-center">dropdowns</div>
        </div>
        <div className="bg-blue-800 col-span-3 row-span-2 md:col-span-2 md:row-span-3">
            <div className="h-full w-full flex justify-center items-center">score</div>
        </div>
    </div>
  );
}

export default SleepScore;