import React, { useState, useEffect } from 'react'
import axios from "axios";
import swal from "sweetalert";
import "./styling/Latest.css";

export default function Latest(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:3001/home", {
      dishtype: props.dishType
    }).then((response) => {
      if (response.data.error) {
        swal({
          title: "Failed!",
          text: response.data.error,
          icon: "warning",
          timer: 5000,
          button: false
        });
      }
      else{
        // setPosts(response.data)
        console.log(response.data);
      }
    })
  }, [])

  return (
    <div className='Latest'>
      {
        posts.length > 0 &&
        <h5>{props.dishType}</h5>
      }
    </div>
  )
}
