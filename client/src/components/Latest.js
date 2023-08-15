import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./styling/Latest.css";

export default function Latest(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
  }, [])

  return (
    <div className='Latest'>
        <h5>{props.dishType}</h5>


    </div>
  )
}
