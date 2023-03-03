import React from 'react';
import  {Button}  from './Button';
import map from "../../Assests/map.png";
import { Image } from "primereact/image";
import { BsPlayCircleFill } from "react-icons/bs";
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <Image
              src={map}
              alt="Image"
              width="100%"
                className="hero-image"
            />
      <h1>GO PAPERLESS!</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH DEMO VIDEO <BsPlayCircleFill />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;