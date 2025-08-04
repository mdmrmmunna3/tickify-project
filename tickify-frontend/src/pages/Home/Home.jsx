import React from 'react';
import HeroSection from './HeroSection';
import Offerings from './Offerings';
import Faqs from './Faqs';
import Flagship from './Flagship';
import SlideCategory from './SlideCategory';
import Upcomings from './Upcomings';

const Home = () => {
    return (
        <div className='bg-[--primary-color]'>
            <HeroSection></HeroSection>
            <SlideCategory></SlideCategory>
            <Upcomings></Upcomings>
            <Flagship></Flagship>
            <Offerings></Offerings>
            <Faqs></Faqs>
        </div>
    );
};

export default Home;