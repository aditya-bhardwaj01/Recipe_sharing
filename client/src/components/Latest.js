import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import "./styling/Latest.css";
import no_profile_pic from "./img/no_profile_pic.png"

export default function Latest(props) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const carouselRef = useRef(null);

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
      else {
        setPosts(response.data.items)
        var elem = document.querySelector('.main-carousel');
        var flkty = new Flickity( elem, {
          cellAlign: 'left',
          wrapAround: true,
          freeScroll: true
        });
      }
    })
  }, [props.dishType])

  useEffect(() => {
    if (carouselRef.current && posts.length > 0) {
      var flkty = new Flickity(carouselRef.current, {
        cellAlign: 'left',
        wrapAround: true,
        freeScroll: true
      });
    }
  }, [posts]);

  const moveToProfile = (profile) => {
    navigate('/profile/'+profile);
  }

  const moveToItem = (itemId) => {
    navigate('/item/'+itemId)
  }

  return (
    <div className='Latest'>
      {
        posts.length > 0 &&
        <div className='latest-items'>
          <h5>{props.dishType}</h5>
          <div className="main-carousel" ref={carouselRef}>
            {
              posts.map((item, index) => {
                return <div key={index} className="latest-item-single">
                  <p onClick={(() => {moveToProfile(item.username)})} style={{cursor: "pointer"}}>
                    <img src={item.profile_pic == null ? no_profile_pic : item.profile_pic} alt="Recipe picture" style={{height: "40px", width: "40px", marginRight: "5px"}} />
                    <span className='home-username'>{item.username}</span>
                  </p>
                  <img src={item.photo} alt="Recipe picture" className='img-fluid item-image' onClick={() => {moveToItem(item.id)}} />
                  <p className='home-title' style={{cursor: "pointer"}} onClick={() => {moveToItem(item.id)}}>{item.title}</p>
                  <span>{item.rating}</span>
                </div>
              })
            }
          </div>
        </div>
      }
    </div>
  )
}
