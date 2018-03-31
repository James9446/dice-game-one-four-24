import React from 'react';
import Dice from '../Dice/Dice';
import './Saved.css';

const Saved = (props) => (
  <div className='Saved'>
    <h1> Dice saved </h1>
    {props.saved.map((dice, index) => {
      return <Dice number={dice} key={index}/>
    })}
  </div>
);

export default Saved;