import React from 'react';
import Dice from '../Dice/Dice';
import './Saved.css';

const Saved = (props) => (
  <div className='Saved'>
    {props.saved.map((dice, index) => {
      if ((dice === 1 || dice === 4) && (index === 0 || index === 1)) {
        return <Dice number={dice} key={index} qualifier={true} />
      } else {
        return <Dice number={dice} key={index} qualifier={false} />
      }
    })}
  </div>
);

export default Saved;