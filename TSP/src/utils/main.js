import { Graphe } from "./graphe.js";
import { heuristiqueTSP } from "./heuristique.js";
const graphe = new Graphe();
graphe.ajouterNoeud(1, 'A');
graphe.ajouterNoeud(2, 'B');
graphe.ajouterNoeud(3, 'C');
graphe.ajouterArete(1, 1, 2, 5); // A-B distance 5
graphe.ajouterArete(2, 1, 3, 7); // A-C distance 7
graphe.ajouterArete(3, 2, 3, 6); // B-C distance 6

const result = heuristiqueTSP(graphe)
console.log(result); // Array of selected edges forming the cycle
