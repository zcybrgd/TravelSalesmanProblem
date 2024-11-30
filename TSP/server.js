// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { Graphe } from './src/utils/graphe.js';
import { HeldKarp } from './src/utils/Held-Karp.js';

const app = express();
app.use(bodyParser.json());

// Endpoint to compute Held-Karp
app.post('/solve-tsp', (req, res) => {
    try {
        const { nodes, edges } = req.body;

        // Build the graph from the request data
        const graphe = new Graphe();
        nodes.forEach((node) => graphe.ajouterNoeud(node.id, node.label));
        edges.forEach((edge) => graphe.ajouterArete(edge.id, edge.nodeEx1, edge.nodeEx2, edge.poids));

        // Solve using Held-Karp
        const heldKarp = new HeldKarp(graphe);
        const result = heldKarp.solve();

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));