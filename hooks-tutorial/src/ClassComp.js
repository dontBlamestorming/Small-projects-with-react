import React from "react";

const classStyle = {
  componentWillMount: "color : red",
  render: "color : blue",
  componentDidMount: "color : yellow",
  shouldComponentUpdate: "color : green",
  componentWillUpdate: "color : black",
  componentDidUpdate: "color : gray",
  componentWillUnmount: "color : aqua"
};
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString()
  };

  componentWillMount() {
    console.log("%cclass => componentWillMount", classStyle.componentWillMount);
  }

  componentDidMount() {
    console.log("%cclass => componentDidMount", classStyle.componentDidMount);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "%cclass => shouldComponentUpdate",
      classStyle.shouldComponentUpdate
    );
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(
      "%cclass => componentWillUpdate",
      classStyle.componentWillUpdate
    );
  }

  componentDidUpdate(nextProps, nextState) {
    console.log("%cclass => componentDidUpdate", classStyle.componentDidUpdate);
  }

  componentWillUnmount() {
    console.log(
      "%cclass => componentWillUnmount",
      classStyle.componentWillUnmount
    );
  }

  render() {
    console.log("%cclass => redner()", classStyle.render);
    return (
      <div className="container">
        <h2>Class style Component</h2>
        <p>init Number : {this.state.number}</p>
        <input
          type="button"
          value="random"
          onClick={function() {
            this.setState({ number: Math.random() });
          }.bind(this)}
        />

        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="date"
          onClick={function() {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        />
      </div>
    );
  }
}

export default ClassComp;
