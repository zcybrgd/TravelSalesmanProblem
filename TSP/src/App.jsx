import React, { useState } from 'react';
import './index.css';
import VisNetwork from './component/VisNetwork';
import axios from 'axios';

function App() {
    const [heldKarpResult, setHeldKarpResult] = useState(null);

    const handleBruteForceClick = async () => {
        try {
            const response = await axios.get('http://localhost:5000/held-karp');
            setHeldKarpResult(response.data);
        } catch (error) {
            console.error('Error fetching Held-Karp result:', error);
            setHeldKarpResult({ error: 'Failed to compute Held-Karp solution.' });
        }
    };

    return (
        <div className="h-screen w-screen bg-slate-800 flex items-center justify-center">
            <div className="p-2 flex flex-row w-[100%]">
                <VisNetwork />
                <div className="p-2 flex flex-col space-y-4 w-[75%]">
                    <button
                        onClick={handleBruteForceClick}
                        className="text-white bg-slate-700 p-2 text-center w-full rounded-lg shadow-md hover:bg-opacity-20 transition-colors"
                    >
                        Brute Force Solution
                    </button>
                    {heldKarpResult && (
                        <div className="text-white bg-slate-500 p-4 rounded-lg shadow-md mt-4">
                            {heldKarpResult.error ? (
                                <p>{heldKarpResult.error}</p>
                            ) : (
                                <>
                                    <p><strong>Minimum Cost:</strong> {heldKarpResult.minCost}</p>
                                    <p><strong>Cycle:</strong> {heldKarpResult.path.join(' → ')}</p>
                                    <p><strong>Execution Time:</strong> {heldKarpResult.executionTime.toFixed(2)} ms</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;


//  <button className=" text-white bg-slate-500 p-2 text-center w-full rounded-lg shadow-md hover:bg-opacity-90 transition-colors">
//Heuristic Solution
//</button> 