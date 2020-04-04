import React, { Component } from 'react';

function runClock() {
    const clock = document.querySelector('#root .App clock #clock');
    console.log(clock);
    const clockTitle = clock.querySelector('.container .clock');
    console.log(clockTitle)

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

class Clock extends Component {
    render() {
        console.log('this is Clock.js - Third')
        return(
            <clock>
                <div id="clock">
                    <div class="container">
                        <div class="clock" onLoad = {() => {
                            init();
                        }}>                            
                        </div>
                    </div>
                </div>
            </clock>
        )
    }
}

export default Clock;