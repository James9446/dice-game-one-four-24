import React, { Component } from 'react';
import InPlay from '../InPlay/InPlay';
import Saved from '../Saved/Saved';
import ToBeSaved from '../ToBeSaved/ToBeSaved';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dicePool: null,
      inPlay: [],
      toBeSaved: [],
      saved: [],
      qualified: false
    };
  }
  componentWillMount() {
    this.setState({ dicePool: 6 });
  }
  componentDidMount() {
    this.takeTurn();
  }
  
  diceRoll = () => {
    let randomNumber = Math.floor(Math.random() * (6)) + 1;
		return randomNumber;
  };

  takeTurn = () => {
    if (this.state.toBeSaved.length || !this.state.inPlay.length) {
      let currentSaved = this.state.saved.slice(0);
      let nowSaved = this.state.toBeSaved.slice(0);
      let roll = [];
      for (let i = 0; i < this.state.dicePool; i++) {
        roll.push(this.diceRoll());
      }
      this.setState({
        inPlay: roll,
        toBeSaved: [],
        saved: currentSaved.concat(nowSaved)
      });
    }
  };

  selectDice = (selection) => {
    let currentToBeSaved = this.state.toBeSaved.slice(0);
    currentToBeSaved.push(selection);

    let currentDiceInPlay = this.state.inPlay.slice(0);
    let spliced = false;

    for (let i = 0; i < currentDiceInPlay.length; i++) {
      if (selection === currentDiceInPlay[i] && !spliced) {
        currentDiceInPlay.splice(i, 1);
        spliced = true;
      }
    }

    this.setState({
      toBeSaved: currentToBeSaved,
      inPlay: currentDiceInPlay,
      dicePool: 6 - (currentToBeSaved.length + this.state.saved.length)
    });
  };

  undoSelection = (selection) => {
    let currentDiceInPlay = this.state.inPlay.slice(0);
    currentDiceInPlay.push(selection);

    let currentToBeSaved = this.state.toBeSaved.slice(0);
    let spliced = false;

    for (let i = 0; i < currentToBeSaved.length; i++) {
      if (selection === currentToBeSaved[i] && !spliced) {
        currentToBeSaved.splice(i, 1);
        spliced = true;
      }
    }

    this.setState({
      toBeSaved: currentToBeSaved,
      inPlay: currentDiceInPlay,
      dicePool: 6 - (currentToBeSaved.length + this.state.saved.length)
    });
  };

  render() {
    if (this.state.toBeSaved.length + this.state.saved.length === 6) {
      return (
        <div className="App">
          <Saved saved={this.state.saved} />
          <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} />
          <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
          <button onClick={this.takeTurn}>Get final score</button>
        </div>
      );
    } else if (!this.state.toBeSaved.length) {
      return (
        <div className="App">
          <Saved saved={this.state.saved} />
          <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} />
          <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Saved saved={this.state.saved} />
          <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} />
          <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
          <button onClick={this.takeTurn}>Roll</button>
        </div>
      );
    }
  }
}

export default App;
