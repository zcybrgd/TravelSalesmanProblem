import { Arete } from "./arete.js";
import { Sommet } from "./sommet.js";

export class Graphe {
    constructor() {
        this.noeuds = new Map();
        this.aretes = new Set(); // pour que les aretes ne soient jamais dupliquées
    }

    ajouterNoeud(id, name) {
        if (!this.noeuds.has(id)) {
            this.noeuds.set(id, new Sommet(id, name));
        }
    }

    supprimerNoeud(id) {
        this.noeuds.delete(id);
        this.aretes.forEach(e => {
            if (e.nodeEx1 === id || e.nodeEx2 === id) {
                this.supprimerArete(e.id);
            }
        });
    }

    ajouterArete(id, nodeEx1id, nodeEx2id,poids) {
        if (this.noeuds.has(nodeEx1id) && this.noeuds.has(nodeEx2id)) {
            const nouvelleArete = new Arete(id, nodeEx1id, nodeEx2id,poids);
            this.aretes.add(nouvelleArete);
            return nouvelleArete; 
        }
        throw new Error('One or both nodes do not exist.')
    }

    supprimerArete(id) {
        for (const e of this.aretes) {
            if (e.id === id) {
                this.aretes.delete(e)
                return;
            }
        }
        throw new Error('Edge does not exist.')
    }

    modifierNoeud(id, newLabel) {
        const sommet = this.noeuds.get(id)
        if (sommet) {
            sommet.label = newLabel
        } else {
            throw new Error('Node does not exist.')
        }
    }

    // we need modifier arete

    trouverVoisins(noeudId) {
        const voisins = [];
        this.aretes.forEach((e) => {
            if (e.nodeEx1 === noeudId) {
                voisins.push(e.nodeEx2)
            } else if (e.nodeEx2 === noeudId) {
                voisins.push(e.nodeEx1)
            }
        });
        return voisins;
    }

    copier() {
        const copieGraphe = new Graphe();
        this.noeuds.forEach((n, id) => {
            copieGraphe.ajouterNoeud(id, n.label)
        });
        this.aretes.forEach((e) => {
            copieGraphe.ajouterArete(e.id, e.nodeEx1, e.nodeEx2,e.poids);
        });
        return copieGraphe
    }

    retirerSommet(idNoeud) {
        const grapheTemp = this.copier()
        grapheTemp.supprimerNoeud(idNoeud)
        return grapheTemp
    }

    resetVisites() {
        this.noeuds.forEach(noeud => {
            noeud.visité = false
        });
    }
}