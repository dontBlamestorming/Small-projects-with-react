import React, { Component } from 'react';

function ClockInit() {
    function runClock () {
        const clock = document.querySelector('#root .App #clock');
        const clockTitle = clock.querySelector('.container .clock');
        
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    function init() {
        runClock();
        setInterval(runClock, 1000);
    }

    init();
}

class Clock extends Component {
    componentDidMount() {
        ClockInit();
    }

    render() {
        return (
            <div id="clock">
                <div className="container">
                    <div className="clock">
                        <p>Hello React!!!</p>                                             
                    </div>
                </div>
            </div>
        )
    }
}

export default Clock;