import React, { Component } from 'react';

class Todolist extends Component {
    render() {
        return (
            <div id="manageTask">
                <div id="todo">
                    <div className="todo_title">
                        <h2>TO DO LIST</h2>
                    </div>
                    <form className="todo_list">
                        <input type="text" placeholder="type what you have to do"/>
                    </form>
                    <ul className="todo_content"></ul>
                </div>

                <div id="doing">
                    <div className="doing_title">
                        <h2>DOING</h2>
                    </div>
                    <form className="doing_list">
                    </form>
                    <ul className="doing_content"></ul>
                </div>

                <div id="done">
                    <div className="done_title">
                        <h2>DONE</h2>
                    </div>
                    <form className="done_list">
                    </form>
                    <ul className="done_content"></ul>
                </div>
            </div>
        )
    }
}

export default Todolist;