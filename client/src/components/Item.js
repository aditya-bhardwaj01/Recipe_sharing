import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import swal from 'sweetalert'
import './styling/Item.css'
import Spinner from './Spinner';
import cooking_method from "./img/cooking_methods.png"
import cuisines from "./img/cuisines.png"
import courses from "./img/courses.png"
import payment from "./img/payment.png"
import difficultyLogo from "./img/difficulty.png"
import clock from "./img/clock.png"
import calorie from "./img/calorie.png"
import seasonLogo from "./img/season.png"
import category from "./img/category.png"
import time from "./img/time.png"
import Star from './Star'

export default function Item() {
  const navigate = useNavigate()
  let { item_id } = useParams()
  const [loading, setLoading] = useState(true);
  const [specifications, setSpecifications] = useState();
  const [showRecipe, setShowRecipe] = useState(false);

  const goToHome = () => {
    navigate('/home')
  }

  const formDate = (inputDate) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const shortMonthName = months[monthIndex];

    const formattedDate = `${day} ${shortMonthName} ${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  const moveToProfile = (profile) => {
    navigate('/profile/' + profile);
  }

  useEffect(() => {
    axios.post("http://localhost:3001/itemspec/itemDetails", {
      item_id: item_id
    })
      .then((response) => {
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
          setSpecifications(response.data.item[0])
        }
        setLoading(false)
      })

      axios.post("http://localhost:3001/itemspec/getRecipe", {
        item_id: item_id,
        accessToken: sessionStorage.getItem("accessToken")
      })
      .then((response) => {
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
          console.log(response.data)
        }
      })
  }, [])

  return (
    <div className='Item'>
      {
        loading === true ?
          <Spinner />
          :
          <div className='itemspec-main'>
            <button type="button" className="btn btn-dark btn-sm" onClick={goToHome} style={{ margin: '5px 0' }}>
              &larr;Home
            </button>
            <div className="itemspec-prelim row">
              <div className="itemspec-prelim-left col-md-5">
                <img src={specifications.photo} alt="Item photo" className='img-fluid' />
              </div>

              <div className="itemspec-prelim-right col-md-7">
                <div>
                  <h3>{specifications.title}</h3>

                  <hr style={{ marginBottom: '25px' }} />

                  <div className="item-prelim-right-top">
                    <div className="single-item-detail-top">
                      <div>

                        {specifications.payment === 0 ?
                          <span className="badge bg-success">FREE</span> :
                          <span style={{ fontWeight: 'bold' }}>
                            <img src={payment} alt="payment" style={{ height: '20px', width: '16px' }} /> <span> </span>
                            Cost: <span className="badge bg-primary">&#8377;{specifications.payment}</span>
                          </span>
                        }
                      </div>
                    </div>

                    <div className="single-item-detail-top">
                      <Star rating={specifications.rating} itemId={specifications.id} />
                    </div>

                    <div className="single-item-detail-top">
                      <img src={time} alt="time" style={{ height: '20px', width: '20px' }} /> <b>Posted on: </b>
                      <span style={{ color: 'blue', fontWeight: 'bold' }}>{formDate(specifications.date_time)}</span>
                    </div>


                  </div>


                  <div className="single-item-detail">
                    <i className='bx bxs-user'></i> <b>Recipe by: </b>
                    <span onClick={(() => { moveToProfile(specifications.username) })} style={{ cursor: 'pointer', color: '#187185' }}>
                      {specifications.username} ({specifications.name})
                    </span>
                  </div>

                  <div className='single-item-detail'>
                    <img src={seasonLogo} alt="season" style={{ height: '20px', width: '20px' }} /> <b>Suitable season: </b> {specifications.best_season}
                  </div>

                  <div className="single-item-detail">
                    <img src={category} alt="category" style={{ height: '20px', width: '20px' }} /> <b>Type: </b> {specifications.category}
                  </div>

                  <div className="single-item-detail">
                    <img src={calorie} alt="calorie" style={{ height: '20px', width: '20px' }} /> <b>Calories: </b> <span style={{ color: '#E45953' }}>{specifications.calories}</span>
                  </div>

                  <div className="single-item-detail">
                    <img src={cooking_method} alt="cooking_method" style={{ height: '20px', width: '20px' }} /> <b>Cooking method: </b> {specifications.cooking_method}
                  </div>

                  <div className="single-item-detail">
                    <img src={courses} alt="courses" style={{ height: '20px', width: '20px' }} /> <b>Courses: </b> {specifications.courses}
                  </div>

                  <div className="single-item-detail">
                    <img src={cuisines} alt="cuisines" style={{ height: '20px', width: '20px' }} /> <b>Cuisines: </b> {specifications.cuisines}
                  </div>



                  <div className="single-item-detail">
                    <img src={difficultyLogo} alt="difficultyLogo" style={{ height: '20px', width: '20px' }} /> <b>Difficulty: </b>
                    <span style={{ color: specifications.difficulty === 'Easy' ? 'Green' : specifications.difficulty === 'Hard' ? 'Red' : 'Orange', fontWeight: 'bold', fontStyle: 'italic' }}>{specifications.difficulty}</span>
                  </div>

                  <div className="single-item-detail">
                    
                    {/* <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{specifications.total_time} minutes</span> */}
                    <span className="hover-element">
                    <img src={clock} alt="clock" style={{ height: '20px', width: '20px' }} /> <b>Total time: </b>
                      <span style={{ color: '#FFA41C', cursor: 'pointer' }}>{specifications.total_time} minutes</span>
                      <div className="hover-text">

                        <div className="row">
                          <span className='col-4' style={{ textAlign: 'center' }}>
                            <span className="badge rounded-pill bg-info">Prep time:</span>
                            <p style={{ fontStyle: 'italic' }}>{specifications.prep_time} mins</p>
                          </span>
                          <span className='col-4' style={{ textAlign: 'center' }}>
                            <span className="badge rounded-pill bg-info">Cook time:</span>
                            <p style={{ fontStyle: 'italic' }}>{specifications.cook_time} mins</p>
                          </span>
                          <span className='col-4' style={{ textAlign: 'center' }}>
                            <span className="badge rounded-pill bg-info">Rest time:</span>
                            <p style={{ fontStyle: 'italic' }}>{specifications.rest_time} mins</p>
                          </span>
                        </div>
                      </div>
                    </span>
                  </div>

                </div>
              </div>
            </div>

            
          </div>
      }
    </div>
  )
}
