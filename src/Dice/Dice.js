import React, { Component } from 'react';
import './Dice.css';

class Dice extends Component {
  render() {
    if (this.props.select) {
      return (
          <div className='Dice' onClick={this.props.select} >
            <p> {this.props.number} </p>
          </div>
      );
    } else if (this.props.undo) {
      return (
          <div className='Dice' onClick={this.props.undo}>
            <p> {this.props.number} </p>
          </div>
      );
    } else {
      return (
        <div className='Dice'>
          <p> {this.props.number} </p>
        </div>
    );
    }
  }
} 

export default Dice;