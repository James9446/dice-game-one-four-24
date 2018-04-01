import React from 'react';
import Dice from '../Dice/Dice';
import './InPlay.css';

const InPlay = (props) => (
  <div className='InPlay'>
    {props.inPlay.map((dice, index) => {
      if (props.selected[index] === true) {
        return <Dice isSelected={true} number={dice} key={index} select={props.select.bind(null, index)} />
      } else {
        return <Dice isSelected={false} number={dice} key={index} select={props.select.bind(null, index)} />
      }
    })}
  </div>
);

export default InPlay;