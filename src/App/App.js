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
    this.takeTurn();
  }
  
  diceRoll = () => {
    let randomNumber = Math.floor(Math.random() * (6)) + 1;
		return randomNumber;
  };

  takeTurn = () => {
    if (this.state.selected.indexOf(true) > -1 || !this.state.inPlay.length) {
      let currentSaved = this.state.saved.slice(0);
      let currentInPlay = this.state.inPlay.slice(0);
      let currentSelected = this.state.selected.slice(0);
      let currentDicePool = this.state.dicePool;
      let temp = [];

      currentInPlay.forEach((dice, index, collection) => {
        if (currentSelected[index]) {
          temp.push(dice);
          currentDicePool--;
        }
      })
      let roll = [];
      for (let i = 0; i < currentDicePool; i++) {
        roll.push(this.diceRoll());
      }
      currentSaved = this.sortSaved(currentSaved.concat(temp));
      this.setState({
        inPlay: roll,
        selected: [false, false, false, false, false, false],
        dicePool: currentDicePool,
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
    let currentSelected = this.state.selected.slice(0);
    currentSelected[selection] = !currentSelected[selection];
    this.setState({
      selected: currentSelected
    });
  };

  render() {
    // if (this.state.saved.length === 6 || this.state.selected.indexOf(true) === -1) {
    //   if (this.state.saved.length) {
      return (
        <div>
          <div className='App-nav'>

          </div>
          <div className='App-container'>
            <div className="App">
              <div className='App-saved-container'>
                <Saved saved={this.state.saved} />
              </div>
              <div className='App-play-container'>
                <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
              </div>
              <button onClick={this.takeTurn}>Bank</button>
              <p>{this.state.total}</p>
            </div>
          </div>
        </div>
      );
    // } else {
      // return (
      //   <div>
      //     <div className='App-nav'>

      //     </div>
      //     <div className='App-container'>
      //       <div className="App">
      //         <div className='App-saved-container'>

      //         </div>
      //         <div className='App-play-container'>
      //           <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
      //         </div>
      //         <button onClick={this.takeTurn}>Bank</button>
      //         <p>{this.state.total}</p>
      //       </div>
      //     </div>
      //   </div>
      // );
    // }
    // } else if (this.state.saved.length === 5 || (this.state.selected.indexOf(false) > this.state.inPlay.length && this.state.selected.indexOf(false) !== -1)) {
    //   return (
    //     <div>
    //       <div className='App-nav'>

    //       </div>
    //       <div className='App-container'>
    //         <div className="App">
    //           <div className='App-saved-container'>
    //             <Saved saved={this.state.saved} />
    //           </div>
    //           <div className='App-play-container'>
    //             <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
    //           </div>
    //           <button onClick={this.takeTurn}>Bank</button>
    //           <p>{this.state.total}</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <div className='App-nav'>

    //       </div>
    //       <div className='App-container'>
    //         <div className="App">
    //           <div className='App-saved-container'>
    //             <Saved saved={this.state.saved} />
    //           </div>
    //           <div className='App-play-container'>
    //             <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
    //           </div>
    //           <button onClick={this.takeTurn}>Bank & Roll</button>
    //           <p>{this.state.total}</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  }
}

export default App;
