import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Graphe } from './src/utils/ds/graphe.js';
import { HeldKarp } from './src/utils/algorithms/Held-Karp.js';
import fs from 'fs';
import { heuristiqueTSP } from './src/utils/algorithms/heuristique.js';

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(bodyParser.json()); 


const graphe = new Graphe();
app.post('/save-graph', (req, res) => {
    const { nodes, edges } = req.body;

    if (!nodes || !edges) {
        return res.status(400).send({ error: 'Invalid graph data' });
    }

    graphe.noeuds.clear();
    graphe.aretes.clear();
    nodes.forEach((node) => graphe.ajouterNoeud(node.id, node.label));
    edges.forEach((edge) =>
        graphe.ajouterArete(edge.id, edge.nodeEx1, edge.nodeEx2, edge.poids)
    );
    fs.writeFileSync('graph.json', JSON.stringify({ nodes, edges }, null, 2));
    res.send({ message: 'Graph data saved successfully!' });
});

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
            return res.status(400).send({ error: 'Graph is empty. Please add nodes and edges.' });
        }

        const heldKarpSolver = new HeldKarp(graphe);
        const result = heldKarpSolver.solve();
        res.send(result);
    } catch (err) {
        console.error('Error solving Held-Karp:', err);
        res.status(500).send({ error: 'Failed to solve Held-Karp. Please try again.' });
    }
});

app.get('/heuristic',(req,res) => {
   try {
    if(graphe.noeuds.size === 0){
        return res.status(400).send({error:'Graph empty'})
    }
    const result = heuristiqueTSP(graphe)
    res.send(result)
   } catch (err){
  console.error("Error solving the heuristic",err)
  res.status(500).send({error:'Failed to solve the heuristic'})
   }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});