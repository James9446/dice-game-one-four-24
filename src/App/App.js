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
      let currentToBeSaved = this.state.toBeSaved.slice(0);
      let currentInPlay = this.state.inPlay.slice(0);
      let currentSelected = this.state.selected.slice(0);
      let currentDicePool = this.state.dicePool;
      let temp = [];

      currentInPlay.forEach((dice, index, collection) => {
        if (currentSelected[index]) {
          temp.push(dice);
          currentDicePool--;
          // collection.splice(index, 1)
        }
      })
      let roll = [];
      for (let i = 0; i < currentDicePool; i++) {
        roll.push(this.diceRoll());
      }
      currentSaved = this.sortSaved(currentSaved.concat(temp));
      this.setState({
        inPlay: roll,
        // toBeSaved: [],
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
    console.log(selection);
    let currentSelected = this.state.selected.slice(0);
    // currentSelected.push(selection);

    // let currentDiceInPlay = this.state.inPlay.slice(0);
    // let spliced = false;

    currentSelected[selection[0]] = !currentSelected[selection[0]];
    
    // for (let i = 0; i < currentDiceInPlay.length; i++) {
    //   if (selection === currentDiceInPlay[i] && !spliced) {
    //     currentDiceInPlay.splice(i, 1);
    //     spliced = true;
    //   }
    // }

    this.setState({
      selected: currentSelected
      // toBeSaved: currentToBeSaved,
      // inPlay: currentDiceInPlay,
      // dicePool: 6 - (this.state.saved.length)
    });
  };

  // undoSelection = (selection) => {
  //   let currentDiceInPlay = this.state.inPlay.slice(0);
  //   // currentDiceInPlay.push(selection);

  //   let currentToBeSaved = this.state.toBeSaved.slice(0);
  //   // let spliced = false;

  //   currentToBeSaved[selection[0]] = false;
  //   // for (let i = 0; i < currentToBeSaved.length; i++) {
  //   //   if (selection === currentToBeSaved[i] && !spliced) {
  //   //     currentToBeSaved.splice(i, 1);
  //   //     spliced = true;
  //   //   }
  //   // }

  //   this.setState({
  //     toBeSaved: currentToBeSaved,
  //     inPlay: currentDiceInPlay,
  //     dicePool: 6 - (this.state.saved.length)
  //   });
  // };

  render() {
    // if (this.state.toBeSaved.length + this.state.saved.length === 6) {
      return (
        <div>
          <div className='App-nav'>

          </div>
          <div className='App-container'>
            <div className="App">
              <Saved saved={this.state.saved} />
              <div className='App-play-area'>
                <InPlay select={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.selected} />
                {/* <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} /> */}
              </div>
              <button onClick={this.takeTurn}>Get final score</button>
              <p>{this.state.total}</p>
            </div>
          </div>
        </div>
      );
    // } else if (!this.state.toBeSaved.length) {
    //   return (
    //     <div>
    //       <div className='App-nav'>

    //       </div>
    //       <div className='App-container'>
    //         <div className="App">
    //           <Saved saved={this.state.saved} />
    //           <div className='App-play-area'>
    //             <InPlay selected={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.toBePlayed} />
    //             {/* <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} /> */}
    //           </div>
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
    //           <Saved saved={this.state.saved} />
    //           <div className='App-play-area'>
    //             <InPlay selected={this.selectDice.bind(this)} inPlay={this.state.inPlay} selected={this.state.toBePlayed} />
    //             {/* <ToBeSaved undo={this.undoSelection.bind(this)} toBeSaved={this.state.toBeSaved} /> */}
    //           </div>
    //           <button onClick={this.takeTurn}>Roll</button>
    //           <p>{this.state.total}</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  }
}

export default App;
