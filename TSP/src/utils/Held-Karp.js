export class HeldKarp {
    constructor(graphe) {
            this.graphe = graphe;
            this.n = graphe.noeuds.size; // Number of cities
            this.memo = new Map(); // where to store the intermediate results
            this.distances = this.createDistanceMatrix();
            this.pathMemo = new Map(); // Stockage des chemins
        }
        // the distance matrix
    createDistanceMatrix() {
            const distances = [];
            for (let i = 0; i < this.n; i++) {
                distances[i] = [];
                for (let j = 0; j < this.n; j++) {
                    if (i !== j) {
                        distances[i][j] = this.graphe.getDistance(i, j);
                    } else {
                        distances[i][j] = 0;
                    }
                }
            }
            return distances;
        }
        // Held-Karp algorithm for TSP
    solve() {
        const minCost = this._heldKarp(0, 1);
        const path = this._reconstructPath();
        return { minCost, path };
    }

    // Recursively solve TSP with memoization (using bitmask mask for the visited cities starting from Last)
    _heldKarp(last, mask) {
        if (mask === (1 << this.n) - 1) {
            return this.distances[last][0]; // Retourne à la ville de départ
        }

        if (this.memo.has(`${last}-${mask}`)) {
            return this.memo.get(`${last}-${mask}`);
        }

        let minCost = Infinity;
        let bestNextCity = -1;

        for (let city = 0; city < this.n; city++) {
            if ((mask & (1 << city)) === 0) {
                const newMask = mask | (1 << city);
                const cost = this.distances[last][city] + this._heldKarp(city, newMask);
                if (cost < minCost) {
                    minCost = cost;
                    bestNextCity = city;
                }
            }
        }

        // Mémorise le résultat et le prochain nœud optimal
        this.memo.set(`${last}-${mask}`, minCost);
        this.pathMemo.set(`${last}-${mask}`, bestNextCity);
        return minCost;
    }

    // Reconstruit le chemin optimal
    _reconstructPath() {
        const path = [];
        let mask = 1;
        let last = 0;

        for (let i = 0; i < this.n; i++) {
            path.push(last);
            last = this.pathMemo.get(`${last}-${mask}`);
            mask |= (1 << last);
        }
        path.push(0); // Retourne au point de départ
        return path;
    }
}