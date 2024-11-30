import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Graphe } from './src/utils/ds/graphe.js';
import { HeldKarp } from './src/utils/algorithms/Held-Karp.js';
import fs from 'fs';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse incoming JSON requests

// Initialize a graph instance
const graphe = new Graphe();

// Endpoint to receive graph data and process it
app.post('/save-graph', (req, res) => {
    const { nodes, edges } = req.body;

    if (!nodes || !edges) {
        return res.status(400).send({ error: 'Invalid graph data' });
    }

    console.log('Graph data received:', req.body);

    // Clear the existing graph data and add the new data
    graphe.noeuds.clear();
    graphe.aretes.clear();

    nodes.forEach((node) => graphe.ajouterNoeud(node.id, node.label));
    edges.forEach((edge) =>
        graphe.ajouterArete(edge.id, edge.nodeEx1, edge.nodeEx2, edge.poids)
    );

    // Save the graph data to a file
    fs.writeFileSync('graph.json', JSON.stringify({ nodes, edges }, null, 2));

    res.send({ message: 'Graph data saved successfully!' });
});

// Optional: Endpoint to fetch the saved graph data
app.get('/get-graph', (req, res) => {
    try {
        const graphData = fs.readFileSync('graph.json', 'utf-8');
        res.send(JSON.parse(graphData));
    } catch (err) {
        res.status(500).send({ error: 'Error reading graph data' });
    }
});
app.get('/held-karp', (req, res) => {
    try {
        if (graphe.noeuds.size === 0) {
            // If the graph is empty, return an error
            return res.status(400).send({ error: 'Graph is empty. Please add nodes and edges.' });
        }

        // Create an instance of the HeldKarp class with the current graph
        const heldKarpSolver = new HeldKarp(graphe);

        // Solve the TSP and get the result
        const result = heldKarpSolver.solve();

        // Send the result as a JSON response
        res.send(result);
    } catch (err) {
        console.error('Error solving Held-Karp:', err);
        res.status(500).send({ error: 'Failed to solve Held-Karp. Please try again.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});