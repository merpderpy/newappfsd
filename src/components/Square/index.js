import React, { Component } from 'react';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    

    render() {
        let disabled;
        if (this.props.text || this.props.victory) {
            disabled = true;
        } else {
            disabled = false;
        }
        return(
            <button onClick={() => this.props.handleClick(this.props.i)} 
                style={{border:"1px solid", width:"50px", height: "50px"}} 
                disabled={disabled}> 
            {this.props.text}
            </button>
        )
    }

}

export default Square;