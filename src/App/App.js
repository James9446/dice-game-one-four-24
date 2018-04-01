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
      qualified: false,
      total: null
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
      let currentToBeSaved = this.state.toBeSaved.slice(0);
      let roll = [];
      for (let i = 0; i < this.state.dicePool; i++) {
        roll.push(this.diceRoll());
      }
      currentSaved = this.sortSaved(currentSaved.concat(currentToBeSaved));
      this.setState({
        inPlay: roll,
        toBeSaved: [],
        saved: currentSaved
      });
    }
  };

  sortSaved = ( array ) => {
    array = array.splice(0);
    let hasOne = false;
    let hasFour = false;

    if (array.indexOf(1) > -1) {
      hasOne = true;
      array.splice(array.indexOf(1), 1)
    }
    if (array.indexOf(4) > -1) {
      hasFour = true;
      array.splice(array.indexOf(4), 1)
    }
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i];
    }
    array.sort((a, b) => b - a);
    if (hasFour) {
      array.unshift(4);
    }
    if (hasOne) {
      array.unshift(1);
    }
    if (hasOne && hasFour && !this.state.qualified) {
      this.setState({ qualified: true });
    }
    this.setState({ total: total })
    return array;
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
        <div>
          <div className='App-nav'>

          </div>
          <div className='App-container'>
            <div className="App">
              <Saved saved={this.state.saved} />
              <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} />
              <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
              <button onClick={this.takeTurn}>Get final score</button>
              <p>{this.state.total}</p>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.toBeSaved.length) {
      return (
        <div>
          <div className='App-nav'>

          </div>
          <div className='App-container'>
            <div className="App">
              <Saved saved={this.state.saved} />
              <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} />
              <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
              <p>{this.state.total}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='App-nav'>

          </div>
          <div className='App-container'>
            <div className="App">
              <Saved saved={this.state.saved} />
              <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} />
              <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
              <button onClick={this.takeTurn}>Roll</button>
              <p>{this.state.total}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
