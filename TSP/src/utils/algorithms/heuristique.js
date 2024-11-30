 /**
     * Résout le problème du voyageur de commerce en utilisant une heuristique basée sur le tri des arêtes.
     * @returns {Object} Un objet contenant le cycle Hamiltonien et son coût.
     */
export const heuristiqueTSP =(graphe)=>{
 const startTime = performance.now()
 // trier les artes par ordre croissant (ya C(n,2) combinaiasons)
 const sortedEdges = Array.from(graphe.aretes).sort((a,b)=>a.poids-b.poids)

 const cycle = []
 const degree = new Map() // pour stocker le degré current de chqaue sommet 
 graphe.noeuds.forEach((_,id)=>degree.set(id,0)) // les init chacun à 0
 
 let totalCost = 0

 // on commence à sélectionner les aretes ordonnées
 for (const edge of sortedEdges){
    const {nodeEx1, nodeEx2, poids } = edge
    if(degree.get(nodeEx1) < 2 && degree.get(nodeEx2) < 2 && !formeUnCycle(cycle,nodeEx1,nodeEx2) || degree.get(nodeEx1) < 2 && degree.get(nodeEx2) < 2 && cycle.length + 1==graphe.noeuds.size ){
        cycle.push(edge)
        totalCost += poids
        degree.set(nodeEx1,degree.get(nodeEx1)+1)
        degree.set(nodeEx2,degree.get(nodeEx2)+1)
    }
 }
 if (cycle.length !== graphe.noeuds.size) {
    throw new Error("Impossible de former un cycle Hamiltonien avec cette heuristique.");
}
 const orderedCycle = organiserChemin(cycle, graphe)
 const endTime = performance.now()
 const executionTime = endTime - startTime

 return {
    cycle: `Le cycle hamiltonien est : ${orderedCycle.join(" -> ")}`,
    coût: totalCost,
    execTime : executionTime
};
}

 /**
     * Vérifie si l'ajout d'une arête crée un cycle invalide.
     * @param {Array} cycle - Liste des arêtes déjà ajoutées.
     * @param {string} node1 - ID du premier sommet de l'arête.
     * @param {string} node2 - ID du second sommet de l'arête.
     * @returns {boolean} True si un cycle invalide est formé, sinon False.
     */
 const formeUnCycle = (cycle, node1, node2) => {
    const visited = new Set();
    const stack = [node1];  // on fait un DFS
    while (stack.length > 0) {
        const current = stack.pop();
        // If we reach node2, it means node1 and node2 are already connected
        if (current === node2) {
            return true;  // Adding the edge will form a cycle
        }
        if (visited.has(current)) {
            continue;  // Skip already visited nodes
        }
        visited.add(current);
        for (const edge of cycle) {
            if (edge.nodeEx1 === current && !visited.has(edge.nodeEx2)) {
                stack.push(edge.nodeEx2);
            } else if (edge.nodeEx2 === current && !visited.has(edge.nodeEx1)) {
                stack.push(edge.nodeEx1);
            }
        }
    }
    return false;  // If we exit the loop, it means node2 isn't reachable from node1
};



const organiserChemin = (cycle, graphe) => {
    const visitedNodes = new Set();
    const orderedNodes = [];
    const startNode = cycle[0].nodeEx1; 
    let currentNode = startNode;

    while (orderedNodes.length < graphe.noeuds.size) {
        orderedNodes.push(currentNode);
        visitedNodes.add(currentNode);
        for (const edge of cycle) {
            if (
                (edge.nodeEx1 === currentNode && !visitedNodes.has(edge.nodeEx2)) ||
                (edge.nodeEx2 === currentNode && !visitedNodes.has(edge.nodeEx1))
            ) {
                currentNode = edge.nodeEx1 === currentNode ? edge.nodeEx2 : edge.nodeEx1;
                break;
            }
        }
    }

    // ajouter le point de départ pour compléter le cycle
    orderedNodes.push(startNode);
    return orderedNodes.map(id => graphe.noeuds.get(id).label);
};

