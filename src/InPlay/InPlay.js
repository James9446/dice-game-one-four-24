import React from 'react';
import Dice from '../Dice/Dice';
import './InPlay.css';

const InPlay = (props) => (
  <div className='InPlay'>
    {/* <h1> Select Dice To Keep </h1> */}
    {props.inPlay.map((dice, index) => {
      if (props.selected[index] === true) {
        return <Dice isSelected={true} number={dice} key={index} select={props.select.bind(null, [index, dice])} />
      } else {
        return <Dice isSelected={false} number={dice} key={index} select={props.select.bind(null, [index, dice])} />
      }
    })}
  </div>
);

export default InPlay;