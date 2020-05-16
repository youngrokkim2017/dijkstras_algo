// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

////////// dijkstra ////////
function dijkstras(graph, source) {
    // distance, represents the smallest distance between the source and every node calculated
    let distance = {};

    // initialize all nodes to be Infinity distance form source
    for (let node in graph) {
        distance[node] = Infinity;
    }

    // the source is 0 distance from itself
    distance[source] = 0;

    // initialize all nodes to be unvisited
    let unvisited = new Set(Object.keys(graph));

    // prepare an object to trak optimal paths
    let previous = {};

    // while some nodes are unvisited
    while (unvisited.size > 0) {
        // find the closest unvisited node
        let currNode = minDistanceNode(unvisited, distance); // helper function to find unvisted node with shortest distance
        // mark as visited
        unvisited.delete(currNode);

        // consider all neighbors of current node
        for (let neighbor in graph[currNode]) {
            // calculate total distance of the neighbor
            // if we travel through currentnode to get to neighbor
            let distanceFromCurrToNeighbor = graph[currNode][neighbor];
            let totalNeighborDistance = distance[currNode] + distanceFromCurrToNeighbor;

            // if total distance is better than the old distance we calculated for neighbor
            if (distance[neighbor] > totalNeighborDistance) {
                // then replace it
                distance[neighbor] = totalNeighborDistance;
                // and now say that optimal path has 'currNode' followed by 'neighbor'
                previous[neighbor] = currNode;
            }
        }
    }
    return { distance, previous };
};

// helper method for finding the unvisited node with shorted distance
function minDistanceNode(nodes, distance) {
    return Array.from(nodes).reduce((minNode, node) => (
        distance[node] < distance[minNode] ? node : minNode
    ));
};