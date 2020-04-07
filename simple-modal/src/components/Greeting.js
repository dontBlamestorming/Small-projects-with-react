import React, { Component } from 'react';
class Greeting extends Component {
    render() {
        return (
            <div id="greeting">
                <form className="greeting">
                    <input type="text" placeholder="이름을 써주세요."/>
                </form>
                <h2></h2>
            </div>
        )
    }
}

export default Greeting;