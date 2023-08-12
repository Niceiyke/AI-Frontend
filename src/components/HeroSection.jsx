// HeroSection.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";



function HeroSection() {
  return (
    <header className="bg-hero-pattern bg-cover bg-center text-white py-24">
      <div className="container mx-auto text-center">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000} // Change the interval time as needed
        >
          <div>
            <img src='' alt="Image 1" className="mx-auto max-w-3xl" />
          
          </div>
          <div>
            <img src='' alt="Image 2" className="mx-auto max-w-3xl" />
          
          </div>
          <div>
            <img src='' alt="Image 3" className="mx-auto max-w-3xl" />
            
          </div>
        </Carousel>
        <h2 className="text-4xl font-semibold mb-4">Discover Amazing Things</h2>
        <p className="text-lg mb-8">
          Explore the world with us and find your passion.
        </p>
        <a
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded"
          href="#"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}

export default HeroSection;
