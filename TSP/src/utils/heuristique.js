// pour l'heuristique implémentée en cours
export function heuristiqueTSP(graphe) {
    const edges = Array.from(graphe.aretes); // Convert Set to Array for sorting
    edges.sort((a, b) => a.poids - b.poids); // Sort edges by weight

    const selectedEdges = [];
    const degrees = new Map(); // Track degree of each node

    // Initialize degrees map
    graphe.noeuds.forEach((_, id) => degrees.set(id, 0));

    for (const edge of edges) {
        const { nodeEx1, nodeEx2 } = edge;

        // Check degree constraint (each node can appear at most twice)
        if (degrees.get(nodeEx1) < 2 && degrees.get(nodeEx2) < 2) {
            selectedEdges.push(edge);
            degrees.set(nodeEx1, degrees.get(nodeEx1) + 1);
            degrees.set(nodeEx2, degrees.get(nodeEx2) + 1);

            // Check if the solution forms a valid cycle
            if (selectedEdges.length === graphe.noeuds.size) {
                if (isHamiltonianCycle(selectedEdges, graphe.noeuds.size)) {
                    break;
                }
            }
        }
    }

    return selectedEdges;
}

// Helper function to check if selected edges form a Hamiltonian cycle
function isHamiltonianCycle(edges, totalNodes) {
    const visited = new Set();
    const stack = [edges[0].nodeEx1];
    const edgeMap = new Map();

    edges.forEach(edge => {
        if (!edgeMap.has(edge.nodeEx1)) edgeMap.set(edge.nodeEx1, []);
        if (!edgeMap.has(edge.nodeEx2)) edgeMap.set(edge.nodeEx2, []);
        edgeMap.get(edge.nodeEx1).push(edge.nodeEx2);
        edgeMap.get(edge.nodeEx2).push(edge.nodeEx1);
    });

    while (stack.length > 0) {
        const node = stack.pop();
        if (visited.has(node)) continue;
        visited.add(node);
        const neighbors = edgeMap.get(node);
        neighbors.forEach(neighbor => {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        });
    }

    return visited.size === totalNodes;
}
