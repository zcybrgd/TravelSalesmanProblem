import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/peer';
import axios from 'axios';

const VisNetwork = () => {
  const containerRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [edgeFrom, setEdgeFrom] = useState('');
  const [edgeTo, setEdgeTo] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('');

  useEffect(() => {
    if (containerRef.current) {
      const networkData = {
        nodes: nodes.map((node) => ({
          id: node.id,
          label: node.label,
          shape: 'circle',
          font: {
            size: 14,
            align: 'center',
            color: 'black',
            face: 'arial',
          },
        })),
        edges: edges.map((edge) => ({
          from: edge.nodeEx1,
          to: edge.nodeEx2,
          label: edge.poids.toString(),
          arrows: { to: false, from: false },
          font: { align: 'top' },
        })),
      };

      const options = {
        nodes: {
          shape: 'circle',
          size: 50,
        },
        edges: {
          arrows: { to: true },
          smooth: true,
        },
        physics: {
          enabled: false,
        },
      };

      new Network(containerRef.current, networkData, options);
    }
  }, [nodes, edges]);

  const handleAddNode = () => {
    if (newNodeLabel.trim()) {
      const newNode = { id: nodes.length, label: newNodeLabel };
      setNodes([...nodes, newNode]);
      setNewNodeLabel('');
    }
  };

  const handleAddEdge = () => {
    const fromNode = nodes.find((node) => node.label === edgeFrom);
    const toNode = nodes.find((node) => node.label === edgeTo);

    if (fromNode && toNode && !isNaN(edgeWeight) && edgeWeight.trim()) {
      const newEdge = {
        id: edges.length,
        nodeEx1: fromNode.id,
        nodeEx2: toNode.id,
        poids: parseFloat(edgeWeight),
      };
      setEdges([...edges, newEdge]);
      setEdgeFrom('');
      setEdgeTo('');
      setEdgeWeight('');
    } else {
      alert('Please check node labels and edge weight.');
    }
  };

  const handleSendGraph = async () => {
    const graphData = {
        nodes,
        edges,
    };

    try {
        const response = await axios.post('http://localhost:5000/save-graph', graphData);
        console.log('Graph data sent to server:', graphData); // Affiche le graphe envoyé
        console.log('Server response:', response.data.message); // Affiche le message du serveur

        // Récupération du graphe sauvegardé pour le vérifier dans la console
        const savedGraph = await axios.get('http://localhost:5000/get-graph');
        console.log('Graph retrieved from server:', savedGraph.data); // Affiche le graphe récupéré
    } catch (error) {
        console.error('Error sending graph data:', error); // Log l'erreur dans la console
    }
};

  return (
    <div className="p-2 w-full">
      <div className="pb-2 flex flex-col">
        <div className="mb-2 flex flex-row space-x-[3%] h-11">
          <input
            type="text"
            value={newNodeLabel}
            onChange={(e) => setNewNodeLabel(e.target.value)}
            className="border p-2 rounded-md bg-slate-50 text-slate-500 w-[22.7%]"
            placeholder="Enter city label"
          />
          <button onClick={handleAddNode} className="bg-slate-500 text-white text-center rounded-md w-[22.7%]">
            Add City
          </button>
        </div>

        <div className="mb-2 flex flex-row space-x-[3%] h-11">
          <input
            type="text"
            value={edgeFrom}
            onChange={(e) => setEdgeFrom(e.target.value)}
            className="border p-2 rounded-md bg-slate-50 text-slate-500 w-[25%]"
            placeholder="First City"
          />
          <input
            type="text"
            value={edgeTo}
            onChange={(e) => setEdgeTo(e.target.value)}
            className="border p-2 rounded-md bg-slate-50 text-slate-500 w-[25%]"
            placeholder="Second City"
          />
          <input
            type="number"
            value={edgeWeight}
            onChange={(e) => setEdgeWeight(e.target.value)}
            className="border p-2 rounded-md bg-slate-50 text-slate-500 w-[25%]"
            placeholder="Edge weight"
          />
          <button onClick={handleAddEdge} className="bg-slate-500 text-white rounded-md justify-center text-center w-[25%]">
            Add Edge
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full h-96 border bg-slate-50 border-gray-300 mb-4 rounded-md"
      ></div>
       <button onClick={handleSendGraph} className="bg-slate-500 text-white p-2 rounded-md w-full h-11">
          Send Graph to Server
        </button>
    </div>
  );
};

export default VisNetwork;
