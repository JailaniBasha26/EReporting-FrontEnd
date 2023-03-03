import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import  Navbar from './Navbar';
import HeroSection from './HeroSection';
import Testimonial from './Testimonial';
import Subscribe from './Subscribe';
import Footer from './Footer';
import galaxy from '../../Assests/galaxy.jpg';
import simple from '../../Assests/simple.webp'
import afford from '../../Assests/afford.jpg';
import lock from '../../Assests/lock.jpg';
import ScrolltoTop from "../ScrollTop/ScrollTop";


function Cards() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <CardItem /> */}
    <div className='cards'>
      <h1>Check Out Our Services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {/* <ul className='cards__items'>
            <CardItem
              src={galaxy}
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src={galaxy}
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul> */}
          <ul className='cards__items'>
            <CardItem
              src={simple}
              text='Simple & complete reporting'
              label='SIMPLE'
              path='/services'
            />
            <CardItem
              src={lock}
              text={`Your Data is secured with us` }      
              label='SECURED'
              path='/products'
            />
            <CardItem
              src={afford}
              text='Service at an affordable price'
              label='AFFORDABLE'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
    
    <Testimonial />
    <Subscribe />
    <Footer />
    
    </div>
  );
}

export default Cards;