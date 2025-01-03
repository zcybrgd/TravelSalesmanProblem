export class HeldKarp {
    constructor(graphe) {
        this.graphe = graphe;
        this.n = graphe.noeuds.size; // Number of cities
        this.memo = new Map(); // a Map that stores previously computed results using the key last-mask
        this.distances = this.createDistanceMatrix();
        this.pathMemo = new Map(); // Store paths
    }

    // the distance matrix
    createDistanceMatrix() {
        const distances = [];
        for (let i = 0; i < this.n; i++) {
            distances[i] = [];
            for (let j = 0; j < this.n; j++) {
                if (i !== j) {
                    distances[i][j] = this.graphe.getDistance(i, j); // Get distance from graph
                } else {
                    distances[i][j] = 0;
                }
            }
        }
        return distances;
    }

    // Held-Karp algorithm for TSP
    solve() {
        const startTime = performance.now();
        const minCost = this._heldKarp(0, 1); // Solve the TSP problem
        const path = this._reconstructPath(); // Reconstruct the optimal path
        const endTime = performance.now();
        const executionTime = endTime - startTime; // Calculate the execution time in milliseconds
        return { minCost, path, executionTime };
    }

    // Recursively solve TSP with memoization (using bitmask mask for the visited cities starting from Last)
    _heldKarp(last, mask) {
        // If all cities have been visited (mask equals (1 << this.n) - 1)
        if (mask === (1 << this.n) - 1) {
            // return the distance from the last city (our current city) to the starting point (has index 0)
            return this.distances[last][0];
        }

        // Memoization check: if the result for this last city and mask combination has already been computed.
        if (this.memo.has(`${last}-${mask}`)) {
            // If already cached we return the stored value to avoid recomputation
            return this.memo.get(`${last}-${mask}`);
        }

        let minCost = Infinity; // tracks the minimum cost found so far.
        let bestNextCity = -1; // tracks the city with the minimum cost, init to -1 (no city selected yet)

        for (let city = 0; city < this.n; city++) {
            if ((mask & (1 << city)) === 0) { // checks if the city is unvisited
                const newMask = mask | (1 << city); // sets the bit corresponding to city to 1 (to mark it as visited)
                const cost = this.distances[last][city] + this._heldKarp(city, newMask); // calculate the cost for visiting the remaining cities after city
                if (cost < minCost) {
                    minCost = cost;
                    bestNextCity = city;
                }
            }
        }

        // Memorize the result and the next optimal node
        this.memo.set(`${last}-${mask}`, minCost);
        this.pathMemo.set(`${last}-${mask}`, bestNextCity);
        return minCost;
    }

    // Reconstructs the optimal path by labels instead of ids
    _reconstructPath() {
        const path = [];
        let mask = 1;
        let last = 0;

        // Reconstruct the path using node labels
        for (let i = 0; i < this.n; i++) {
            path.push(this.graphe.getNodeLabel(last)); // Use getNodeLabel to get the label by ID
            last = this.pathMemo.get(`${last}-${mask}`);
            mask |= (1 << last);
        }
        path.push(this.graphe.getNodeLabel(0)); // Return to the starting point and get its label
        return path;
    }
}