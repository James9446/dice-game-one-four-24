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
    console.log(selection);
    let selected = this.state.toBeSaved.slice(0);
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
      toBeSaved: selected,
      inPlay: currentDiceInPlay,
      dicePool: 6 - (selected.length + this.state.saved.length)
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.takeTurn}>Roll</button>
        <Saved saved={this.state.saved} />
        <ToBeSaved toBeSaved={this.state.toBeSaved} />
        <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} />
      </div>
    );
  }
}

export default App;
