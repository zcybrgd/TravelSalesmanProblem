import React from 'react';
import './index.css';
import VisNetwork from './component/VisNetwork';

function App() {
  return (
    <div className="h-screen w-screen bg-slate-800 flex items-center justify-center ">
      <div className="p-2 flex flex-col w-[75%] ">
        <VisNetwork />
        <div className="p-2 flex flex-row space-x-4 w-full">
           <button className=" text-white bg-slate-700 p-2 text-center w-full rounded-lg shadow-md hover:bg-opacity-20 transition-colors">
                Brute Force Solution
           </button>
           <button className=" text-white bg-slate-500 p-2 text-center w-full rounded-lg shadow-md hover:bg-opacity-90 transition-colors">
                Heuristic Solution
           </button>
      </div>
      </div>
    </div>
  );
}

export default App;
