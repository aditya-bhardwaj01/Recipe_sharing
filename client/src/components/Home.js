import React, { useRef, useEffect } from 'react'
import Navbar from './Navbar'
import './styling/Home.css'
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Latest from './Latest';

export default function Home() {
  const typedTextRef = useRef(null);

  const dishes = ["Appetizers", "Main Course", "Side Dishes", "Soups and Stews", "Desserts", "Beverages"];
  // const dishes = ["Side Dishes"];

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
        {dishes.map((dish, index) => (
          <div key={index} className="single-dish" data-aos="zoom-in">
            <Latest dishType={dish} />
          </div>
        ))}
      </div>

      <div style={{ height: "10vh" }}></div>
    </div>
  )
}
