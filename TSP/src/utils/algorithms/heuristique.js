export const heuristiqueTSP = (graphe) => {
    const startTime = performance.now(); 

    const sortedEdges = Array.from(graphe.aretes).sort((a, b) => a.poids - b.poids);

    const degrees = new Map(); // to tracks the degree of each node (shouldnt be more than 2)
    graphe.noeuds.forEach((_, id) => degrees.set(id, 0)); 
    const selectedEdges = []; //  the edges chosen for the TSP cycle

    for (const edge of sortedEdges) {
        const { nodeEx1, nodeEx2 } = edge;
        if (degrees.get(nodeEx1) < 2 && degrees.get(nodeEx2) < 2) {
            selectedEdges.push(edge); 
            console.log("selected edges soo far: ", selectedEdges)
            degrees.set(nodeEx1, degrees.get(nodeEx1) + 1)
            degrees.set(nodeEx2, degrees.get(nodeEx2) + 1)
        }
        if (selectedEdges.length === graphe.noeuds.size) break;
    }

    if (selectedEdges.length !== graphe.noeuds.size ) {
        throw new Error("Could not form a valid Hamiltonian cycle");
    }
    const endTime = performance.now(); 
    const executionTime = endTime - startTime
    const totalCost = selectedEdges.reduce((sum, edge) => sum + edge.poids, 0);
    
    return {
        cost: totalCost,
        edges: selectedEdges,
        executionTime: executionTime
    };
}
