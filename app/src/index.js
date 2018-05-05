import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryLine, VictoryChart } from 'victory';

import './index.css';

// Sample data point
const data = [
    [
        {x: 1, y: 130},
        {x: 2, y: 165},
        {x: 3, y: 142},
        {x: 4, y: 190}
    ],
    [
        {x: 1, y: 165},
        {x: 2, y: 130},
        {x: 3, y: 190},
        {x: 4, y: 142}
    ],
    [
        {x: 1, y: 142},
        {x: 2, y: 190},
        {x: 3, y: 130},
        {x: 4, y: 165}
    ],
    [
        {x: 1, y: 190},
        {x: 2, y: 142},
        {x: 3, y: 165},
        {x: 4, y: 130}
    ],
];

// Sample line colors
const colors = [
    "#000000",
    "#c43a31",
    "#31c43a",
    "#313ac4",
];

// Our main app
class GraphApp extends React.Component {
    
    // Save each line's visibility state
    constructor(props) {
        super(props);
        this.state = {
            visible: Array(data.length).fill(true),
        };
    }
    
    // Toggles a line's visibility state
    toggleLine(i) {
        // Why Immutability Is Important
        // https://reactjs.org/tutorial/tutorial.html#why-immutability-is-important
        const visible = this.state.visible.slice();
        visible[i] = !(visible[i]);
        this.setState({visible: visible});
    }
  
    render() {
        
        // Create line toggle buttons array, one for each line
        const buttons = data.map((step, line) => {
            return (
                <li key={line}>
                    <button onClick={() => this.toggleLine(line)}>Toggle line {line + 1}</button>
                </li>
            );  
        });
        
        // Create lines array, one for each dataset
        // Don't add those that are not visible
        const lines = data.map((step, line) => {
            if(this.state.visible[line]) {
                return (
                    <VictoryLine
                        // Define key to alias the element
                        // https://reactjs.org/tutorial/tutorial.html#keys
                        key={line}
                        // Assign different styles for each line
                        style={{
                            data: {
                                stroke: colors[line], 
                                strokeWidth: line+1,
                            },
                        }}
                        // Data from constant dataset
                        data={data[line]}
                        // data accessor for x values
                        x="x"
                        // data accessor for y values
                        y="y"
                    /> //
                );  
            }
            return null;
        });
        
        // Render the app: Buttons & Graph
        return (
            <div className="graphapp">
                <div className="graphapp-buttons">
                    <ol>
                        {buttons}
                    </ol>
                </div> 
                <div className="graphapp-graph">
                    <VictoryChart domainPadding={20}>
                        {lines}
                    </VictoryChart>
                </div>
            </div> //
        );
    }
}

// ========================================

ReactDOM.render(
    <GraphApp />,
    document.getElementById('root')
);
