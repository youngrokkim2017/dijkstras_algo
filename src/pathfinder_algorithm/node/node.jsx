import React from 'react';
import './node.css'

class Node extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // };

    render() {
        const {
            col,
            isFinish,
            isStart,
            // isVisited, 
            isWall, 
            onMouseDown, 
            onMouseEnter,
            onMouseUp,
            row,
        } = this.props;

        const extraClassName = isFinish
            ? 'node-finish'
            : isStart
            ? 'node-start'
            // : isVisited
            // ? 'node-visited'
            : isWall
            ? 'node-wall'
            : '';

        return (
            <div 
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            >

            </div>
        );
    }
}

export default Node;