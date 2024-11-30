import { Graphe } from "./ds/graphe.js";
import { heuristiqueTSP } from "./algorithms/heuristique.js";

const graphe = new Graphe();

// Ajouter les villes et les arêtes
graphe.ajouterNoeud(0, "City A");
graphe.ajouterNoeud(1, "City B");
graphe.ajouterNoeud(2, "City C");
graphe.ajouterNoeud(3, "City D");
graphe.ajouterArete(1, 0, 1, 20); // Distance entre City A et City B
graphe.ajouterArete(2, 1, 2, 15);
graphe.ajouterArete(3, 0, 2, 10);
graphe.ajouterArete(3, 0, 3, 12);
graphe.ajouterArete(3, 1, 3, 11);
graphe.ajouterArete(3, 3, 2, 17);



const result = heuristiqueTSP(graphe)
console.log("Cycle Hamiltonien :", result.cycle);
console.log("Coût du cycle :", result.coût);
console.log("Execution time: ", result.execTime)
