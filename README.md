# TravelSalesmanProblem
 This is an implementation of the famous traveler salesman problem (implementing the brut force and the heuristic method and comparing between them in terms of the resulting path and execution time)


Implemented Algorithms:

1. The Held–Karp algorithm, is a dynamic programming algorithm proposed in 1962 to solve the traveling salesman problem (TSP), in which the input is a distance matrix between a set of cities, and the goal is to find a minimum-length tour that visits each city exactly once before returning to the starting point. It finds the exact solution to this problem, and to several related problems including the Hamiltonian cycle problem, in exponential time.

Purpose: Solve the TSP using Dynamic Programming and memoization.
Bitmasking is used to track visited cities efficiently.
Memoization optimizes the recursion by caching results.
Held-Karp Algorithm is a well-known DP approach for solving TSP in O(n^2⋅2^n) time.

2. The heuristic in our course is a greedy algorithm for solving the Traveling Salesman Problem (TSP) approximately. It aims to find a Hamiltonian cycle (visiting each city exactly once and returning to the starting city) with a minimal cost by using edges in a specific order. 

The graph is complete, meaning every pair of cities is connected by an edge so there are C(n,2)= n(n−1)/2 edges in total (where n is the number of cities).
Sort all the edges by their weights (distances between cities) in ascending order.
Iterate through the sorted edges and:
-->Ensure no vertex exceeds degree 2.
-->Ensure no cycles except the ultimate last one are formed (we used the union-find algorithm for that)
Stop when exactly 𝑛 edges are added to form the final Hamiltonian cycle.
Time Complexity: O(ElogE) where E is the number of edges.


Resources that helped us implement the 2 algorithms: 
[Disjoint-set Data Structure (Union-Find)](https://brilliant.org/wiki/disjoint-set-data-structure/#:~:text=Union%2Dfind%2C%20as%20it%20is,belong%20to%20the%20same%20set.)
[What is Memoization? A Complete Tutorial](https://www.geeksforgeeks.org/what-is-memoization-a-complete-tutorial/)
[Bitmasks in JavaScript: A Computer Science Crash Course](https://www.lullabot.com/articles/bitmasks-javascript-computer-science-crash-course)
[Bitmasks are not so esoteric and impractical after all...](https://dev.to/somedood/bitmasks-are-not-so-esoteric-and-impractical-after-all-55o6)

