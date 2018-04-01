import React, { Component } from 'react';
import InPlay from '../InPlay/InPlay';
import Saved from '../Saved/Saved';
import ToBeSaved from '../ToBeSaved/ToBeSaved';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dicePool: 6,
      diceActive: false,
      inPlay: [],
      selected: [false, false, false, false, false, false],
      saved: [],
      qualified: false,
      total: null
    };
  }
  componentWillMount() {
    this.setState({ dicePool: 6 });
  }
  componentDidMount() {
    this.rollDice();
  }
  
  diceRoll = () => {
    let randomNumber = Math.floor(Math.random() * (6)) + 1;
		return randomNumber;
  };

  bankDice = () => {
    if (this.state.selected.indexOf(true) > -1 && this.state.diceActive) {
      let currentSaved = this.state.saved.slice(0);
      let currentInPlay = this.state.inPlay.slice(0);
      let currentSelected = this.state.selected.slice(0);
      let currentDicePool = this.state.dicePool;
      let selections = [];

      currentInPlay.forEach((dice, index, collection) => {
        if (currentSelected[index]) {
          selections.push(dice);
          collection[index] = null;
          currentDicePool--;
        }
      })
      while(currentInPlay.indexOf(null) > -1) {
        for (let i = 0; i < currentInPlay.length; i++) {
          if (currentInPlay[i] === null) {
            currentInPlay.splice(i, 1);
          }
        }
      }
      
      currentSaved = this.sortSaved(currentSaved.concat(selections));
      this.setState({
        diceActive: false,
        inPlay: currentInPlay,
        selected: [false, false, false, false, false, false],
        dicePool: currentDicePool,
        saved: currentSaved
      });
    }
  };

  rollDice = () => {
    if (!this.state.diceActive) {
      let currentInPlay = this.state.inPlay.slice(0);
      let currentDicePool = this.state.dicePool;
      let roll = [];
      for (let i = 0; i < currentDicePool; i++) {
        roll.push(this.diceRoll());
      }
      this.setState({
        diceActive: true,
        inPlay: roll,
      });
    }
  }

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
    let currentSelected = this.state.selected.slice(0);
    currentSelected[selection] = !currentSelected[selection];
    this.setState({
      selected: currentSelected
    });
  };

  render() {
    if (this.state.diceActive && this.state.selected.indexOf(true) === -1) {
      return (
        <div>
          <div className='App-nav'>
            {/* <p>{this.state.total}</p> */}
          </div>
          <div className='App-container'>
            <div className="App">
              <div className='App-saved-container'>
                <Saved saved={this.state.saved} />
              </div>
              <div className='App-play-container'>
                <InPlay diceActive={!this.state.diceActive} select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
              </div>
              <div className='App-btn-container'>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.diceActive) {
      return (
        <div>
          <div className='App-nav'>
            {/* <p>{this.state.total}</p> */}
          </div>
          <div className='App-container'>
            <div className="App">
              <div className='App-saved-container'>
                <Saved saved={this.state.saved} />
              </div>
              <div className='App-play-container'>
                <InPlay diceActive={!this.state.diceActive} select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
              </div>
              <div className='App-btn-container'>
                <button className='App-btn-bank' onClick={this.bankDice}>Bank</button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='App-nav'>
            {/* <p>{this.state.total}</p> */}
          </div>
          <div className='App-container'>
            <div className="App">
              <div className='App-saved-container'>
                <Saved saved={this.state.saved} />
              </div>
              <div className='App-play-container'>
                <InPlay diceActive={!this.state.diceActive} select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
              </div>
              <div className='App-btn-container'>
                <button className='App-btn-roll' onClick={this.rollDice}>Roll</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
