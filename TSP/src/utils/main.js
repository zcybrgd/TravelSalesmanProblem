import { Graphe } from "./ds/graphe.js";
import { heuristiqueTSP } from "./algorithms/heuristique.js";

const graphe = new Graphe();


graphe.ajouterNoeud(0, "City 1");
graphe.ajouterNoeud(1, "City 2");
graphe.ajouterNoeud(2, "City 3");
graphe.ajouterNoeud(3, "City 4");
graphe.ajouterNoeud(4, "City 5");
graphe.ajouterNoeud(5, "City 6");

graphe.ajouterArete(1, 0, 1, 10); // City 1 to City 2
graphe.ajouterArete(2, 0, 2, 11); // City 1 to City 3
graphe.ajouterArete(3, 0, 3, 12); // City 1 to City 4
graphe.ajouterArete(4, 0, 4, 13); // City 1 to City 5
graphe.ajouterArete(5, 0, 5, 14); // City 1 to City 6
graphe.ajouterArete(6, 1, 2, 15); // City 2 to City 3
graphe.ajouterArete(7, 1, 3, 16); // City 2 to City 4
graphe.ajouterArete(8, 1, 4, 17); // City 2 to City 5
graphe.ajouterArete(9, 1, 5, 18); // City 2 to City 6
graphe.ajouterArete(10, 2, 3, 19); // City 3 to City 4
graphe.ajouterArete(11, 2, 4, 20); // City 3 to City 5
graphe.ajouterArete(12, 2, 5, 21); // City 3 to City 6
graphe.ajouterArete(13, 3, 4, 22); // City 4 to City 5
graphe.ajouterArete(14, 3, 5, 23); // City 4 to City 6
graphe.ajouterArete(15, 4, 5, 24); // City 5 to City 6





const result = heuristiqueTSP(graphe)
console.log("Cycle Hamiltonien :", result.cycle);
console.log("Coût du cycle :", result.coût);
console.log("Execution time: ", result.execTime)
