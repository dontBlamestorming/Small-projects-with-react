import React, { Component } from 'react';
console.log('this is Clock component')
class Clock extends Component {
    render() {
        return(
            <div id="clock">
                <div className="container">
                    <div className="clock" 
                    // onLoad={function(e) {
                    //     e.preventDefault();
                    //     this.props.onChangePage();
                    //     console.log('This is onLoad props');
                    // }.bind(this)}
                    >
                        <p>Hello React!!!</p>  
                                             
                    </div>
                </div>
            </div>
        )
    }
}

export default Clock;