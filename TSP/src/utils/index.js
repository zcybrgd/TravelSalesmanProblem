import { Graphe } from './graphe.js';
import { HeldKarp } from './Held-Karp.js';

const graphe = new Graphe();

// Ajouter les villes et les arêtes
graphe.ajouterNoeud(0, "City A");
graphe.ajouterNoeud(1, "City B");
graphe.ajouterNoeud(2, "City C");
graphe.ajouterNoeud(3, "City D");
graphe.ajouterArete(1, 0, 1, 5); // Distance entre City A et City B
graphe.ajouterArete(2, 1, 2, 10);
graphe.ajouterArete(3, 0, 2, 15);
graphe.ajouterArete(3, 0, 3, 2);
graphe.ajouterArete(3, 1, 3, 3);
graphe.ajouterArete(3, 3, 2, 7);

// Résoudre le problème
const heldKarp = new HeldKarp(graphe);
const { minCost, path } = heldKarp.solve();

console.log(`Le coût minimum pour le TSP est : ${minCost}`);
console.log(`Le cycle hamiltonien est : ${path.map(id => graphe.noeuds.get(id).label).join(' -> ')}`);