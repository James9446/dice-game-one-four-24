import React, { Component } from 'react';
import './Dots.css';

class Dots extends Component {
  render() {
    if (this.props.number === 1) {
      return (
        <div>
          <div className='row1'>
            <div className='blank'></div>
            <div className='blank'></div>
            <div className='blank'></div>
          </div>
          <div className='row2'>
            <div className='blank'></div>
            <div className='dot'></div>
            <div className='blank'></div>
          </div>
          <div className='row3'>
            <div className='blank'></div>
            <div className='blank'></div>
            <div className='blank'></div>
          </div>
        </div>
      );
    } else if (this.props.number === 2) {
      return (
        <div className='pad'>
          <div className='row1'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='blank'></div>
          </div>
          <div className='row3'>
            <div className='blank'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
        </div>
      );
    } else if (this.props.number === 3) {
      return (
        <div>
          <div className='row1'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='blank'></div>
          </div>
          <div className='row2'>
            <div className='blank'></div>
            <div className='dot'></div>
            <div className='blank'></div>
          </div>
          <div className='row3'>
            <div className='blank'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
        </div>
      );
    } else if (this.props.number === 4) {
      return (
        <div className='pad-low'>
          <div className='row1'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
          <div className='pad'></div>
          <div className='row3'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
        </div>
      );
    } else if (this.props.number === 5) {
      return (
        <div>
          <div className='row1'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
          <div className='row2'>
            <div className='blank'></div>
            <div className='dot'></div>
            <div className='blank'></div>
          </div>
          <div className='row3'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
        </div>
      );
    } else if (this.props.number === 6) {
      return (
        <div>
          <div className='row1'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
          <div className='row2'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
          <div className='row3'>
            <div className='dot'></div>
            <div className='blank'></div>
            <div className='dot'></div>
          </div>
        </div>
      );
    }
  }
}
  


export default Dots;