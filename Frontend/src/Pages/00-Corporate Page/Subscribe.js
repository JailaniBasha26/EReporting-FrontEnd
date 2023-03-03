import React from 'react';
import './Subscribe.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Subscribe() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Sign Up for our free Newsletter 
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <center>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Enter Your Email'
            />
            </center>
            <center>
            <Button buttonStyle='btn--outline'>Subscribe</Button>
            </center>
          </form>
        </div>
      </section><br></br><br></br>
    </div>
  );
}

export default Subscribe;