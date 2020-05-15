import React from 'react';
import Node from './node/node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import './pathfinder.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 35;

const getInitialGrid = () => {
    const grid = [];

    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    };

    return grid;
};

const createNode = (col, row) => {
    return {
        col, 
        row, 
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

// const getNewGridWithWallToggled = (grid, row, col) => {
//     const newGrid = grid.slice();
//     const node = newGrid[row][col];
//     const newNode = {
//         ...node, 
//         isVisited: true,
//         // isWall:!node.isWall,
//     };
//     newGrid[row][col] = newNode;
//     return newGrid;
// };

class Pathfinder extends React.Component {
    constructor() {
        // super(props);
        super();
        this.state = {
            grid: []
        };
    };

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        // for (let i = 0; i < visitedNodesInOrder; i++) {
        //     setTimeout(() => {
        //         const node = visitedNodesInOrder[i];
        //         const newGrid = this.state.grid.slice();
        //         const newNode = {
        //             ...node,
        //             isVisited: true,
        //         };
        //         newGrid[node.row][node.col] = newNode;
        //         this.setState({grid: newGrid})
        //     }, 100 * i);
        // }
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    render() {
        const { grid } = this.state;
        
        return (
            <div>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isStart, isFinish } = node;
                                    return (
                                        <Node 
                                            key={nodeIdx}
                                            col={col}
                                            row={row}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            // isVisited={isVisited}
                                        >
                                        </Node>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                {/* <Node></Node> */}
            </div>
        );
    }
};

export default Pathfinder;