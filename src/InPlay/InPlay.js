import React from 'react';
import Dice from '../Dice/Dice';
import './InPlay.css';

const InPlay = (props) => (
  <div className='InPlay'>
    <h1> Select Dice To Keep </h1>
    {props.inPlay.map((dice, index) => {
      return <Dice number={dice} key={index} select={props.select.bind(null, dice)} />
    })}
  </div>
);

export default InPlay;