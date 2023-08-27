import React, { useRef, useEffect } from 'react'
import Navbar from './Navbar'
import './styling/Home.css'
import Typed from 'typed.js';
import 'aos/dist/aos.css';
import Latest from './Latest';
import SearchHome from './SearchHome';

export default function Home() {
  const typedTextRef = useRef(null);

  const dishes = ["Appetizers", "Main Course", "Side Dishes", "Soups and Stews", "Desserts", "Beverages"];

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

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className='Home'>
      <div className="top-home">
        <Navbar />
        <h1><span ref={typedTextRef}></span></h1>
      </div>

      <div className="bottom-home">
        <SearchHome />
        {dishes.map((dish, index) => (
          <div key={index} className="single-dish">
            <Latest dishType={dish} />
          </div>
        ))}
      </div>

      <div style={{ height: "10vh" }}></div>
    </div>
  )
}
