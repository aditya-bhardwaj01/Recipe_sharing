import React, { useRef, useEffect } from 'react'
import Navbar from './Navbar'
import './styling/Home.css'
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Latest from './Latest';

export default function Home() {
  const typedTextRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Cook, Share, Delight - The Recipe Way!!", 
                "Sharing flavors, one recipe at a time!!",
                "Recipes that bring joy to your table!!",
                "From kitchens to hearts, with love and recipes!!",
                "Where ingredients meet inspiration - Recipe Sharing!!"
              ],
      typeSpeed: 80,
      backSpeed: 40,
      loop: true,
    };

    const typed = new Typed(typedTextRef.current, options);
    AOS.init({
      delay: 200,
      duration: 600,
      easing: 'ease',
      once: false,
      anchorPlacement: 'top-bottom', 
    
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className='Home'>
      <div className="top-home">
        <Navbar />
        {/* <h1>Cook, Share, Delight - The Recipe Way!!</h1> */}
        <h1><span ref={typedTextRef}></span></h1>
      </div>

      <div className="bottom-home">
        <div className="single-dish" data-aos="zoom-in">
          <Latest dishType={"Appetizers"} />
        </div>

        <div className="single-dish" data-aos="zoom-in">
          <Latest dishType={"Main Course"} />
        </div>

        <div className="single-dish" data-aos="zoom-in">
          <Latest dishType={"Side Dishes"} />
        </div>

        <div className="single-dish" data-aos="zoom-in">
          <Latest dishType={"Soups and Stews"} />
        </div>

        <div className="single-dish" data-aos="zoom-in">
          <Latest dishType={"Desserts"} />
        </div>

        <div className="single-dish" data-aos="zoom-in">
          <Latest dishType={"Beverages"} />
        </div>
      </div>

      <div style={{height: "10vh"}}></div>
    </div>
  )
}
