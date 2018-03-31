import React from 'react';
import './Dice.css';

const Dice = (props) => (
  <div className='Dice' onClick={props.select}>
    <p> {props.number} </p>
  </div>
)

export default Dice;