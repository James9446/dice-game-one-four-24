import React from 'react';
import Dice from '../Dice/Dice';
import './ToBeSaved.css';

const ToBeSaved = (props) => (
  <div className='ToBeSaved'>
    <h1> Dice To Be Saved </h1>
    {props.toBeSaved.map((dice, index) => {
      return <Dice number={dice} key={index} undo={props.undo.bind(null, dice)}/>
    })}
  </div>
);

export default ToBeSaved;