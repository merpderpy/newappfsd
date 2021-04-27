import React, { Component } from 'react';
import Square from '../Square';

class Grid extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        let children = [];
        for (let j = 0; j < 9; j++) {
        if (j % 3 === 0) {children.push(<br/>)}
            
        children.push(
                <Square text={this.props.squares[j]} i={j} handleClick={this.props.handleClick} victory={this.props.victory}/>
            );
        }
        return(
            <div>
                {children}
            </div>
        ) 
    }
}


export default Grid;