import React, { Component } from 'react';
import InPlay from '../InPlay/InPlay';
import Saved from '../Saved/Saved';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inPlay: [1, 2, 3],
      saved: [3, 4, 5],
      qualified: false
    };
  }
 
  rollDice = () => {
    let randomNumber = Math.floor(Math.random() * (6)) + 1;
		return randomNumber;
  };

  render() {
    return (
      <div className="App">
        <Saved saved={this.state.saved} />
        <InPlay inPlay={this.state.inPlay} />
      </div>
    );
  }
}

export default App;
