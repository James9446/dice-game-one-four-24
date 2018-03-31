import React, { Component } from 'react';
import InPlay from '../InPlay/InPlay';
import Saved from '../Saved/Saved';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dicePool: null,
      inPlay: [],
      saved: [],
      qualified: false
    };
  }
  componentWillMount() {
    this.setState({dicePool: 6 - this.state.saved.length});
  }
  componentDidMount() {
    this.takeTurn();
  }
  
  diceRoll = () => {
    let randomNumber = Math.floor(Math.random() * (6)) + 1;
		return randomNumber;
  };

  takeTurn = () => {
    let roll = [];
    for (let i = 0; i < this.state.dicePool; i++) {
      roll.push(this.diceRoll());
    }
    this.setState({inPlay: roll});
  };

  selectDice = (selection) => {
    console.log(selection);
    let selected = this.state.saved.slice(0);
    selected.push(selection);

    let currentDiceInPlay = this.state.inPlay.slice(0);
    let spliced = false;
    for (let i = 0; i < currentDiceInPlay.length; i++) {
      if (selection === currentDiceInPlay[i] && !spliced) {
        currentDiceInPlay.splice(i, 1);
        spliced = true;
      }
    }

    this.setState({
      saved: selected,
      inPlay: currentDiceInPlay,
      dicePool: 6 - selected.length
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.takeTurn}>Roll</button>
        <Saved saved={this.state.saved} />
        <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
      </div>
    );
  }
}

export default App;
