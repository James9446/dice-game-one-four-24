import React from 'react';
import Dice from '../Dice/Dice';
import './InPlay.css';

const InPlay = (props) => (
  <div className='InPlay'>
    {props.inPlay.map((dice, index) => {
      return <Dice number={dice} key={index}/>
    })}
  </div>
);

export default InPlay;