import React, { Component } from 'react';
import Dots from '../Dots/Dots';
import './Dice.css';

class Dice extends Component {
  render() {
    if (this.props.select) {
      return (
          <div className='Dice' onClick={this.props.select} >
            <Dots number={this.props.number}/>
          </div>
      );
    } else if (this.props.undo) {
      return (
          <div className='Dice' onClick={this.props.undo}>
            <Dots number={this.props.number}/>
          </div>
      );
    } else {
      if (this.props.qualifier === true) {
        return (
          <div className='Dice qualifier'>
            <Dots number={this.props.number}/>
          </div>
        );
      } else {
        return (
          <div className='Dice'>
            <Dots number={this.props.number}/>
          </div>
        );
      }
    }
  }
} 

export default Dice;