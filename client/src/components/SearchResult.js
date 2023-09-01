import React, { useEffect, useState } from 'react'
import './styling/SearchResult.css'
import axios from 'axios'
import swal from 'sweetalert'
import { useParams, useNavigate } from 'react-router'
import Spinner from './Spinner'
import cooking_method from "./img/cooking_methods.png"
import cuisines from "./img/cuisines.png"
import courses from "./img/courses.png"
import payment from "./img/payment.png"
import difficulty from "./img/difficulty.png"
import clock from "./img/clock.png"
import calorie from "./img/calorie.png"
import season from "./img/season.png"
import noResult from "./img/not-found.gif"

export default function SearchResult() {
    let { searchtype, searchvalue } = useParams()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const goToHome = () => {
        navigate('/home')
    }

    const moveToItem = (itemId) => {
        navigate('/item/' + itemId)
    }

    useEffect(() => {
        axios.post("http://localhost:3001/searchresult", {
            searchtype: searchtype,
            searchvalue: searchvalue
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
                    setItems(response.data.item);
                }
                setLoading(false)
            })
    }, [searchtype, searchvalue])

    return (
        <div className='SearchResult'>
            {
                loading === true ?
                    <Spinner />
                    :
                    <div className='mainarea-searchresult'>
                        <button type="button" className="btn btn-dark btn-sm" onClick={goToHome}>&larr;Go back</button>
                        {
                            items.length === 0 ?
                                <div className='not-found-search-result'>
                                    <h3>Sorry!! There is no recipe matching your search...</h3>
                                    <img src={noResult} alt="No result" />
                                </div>
                                :
                                <div className="searchresult-display">
                                    {items.map((item, index) => (
                                        <div key={index} className="searchresult-single">
                                            <div className="single-result-section section-1 row">
                                                <div className="section-11 col-sm-4">
                                                    <img src={item.photo} alt="" />
                                                    <button type="button" class="btn btn-success btn-lg btn-block" onClick={() => { moveToItem(item.id) }}>
                                                        View
                                                    </button>
                                                </div>
                                                <div className="section-12 col-sm-8">
                                                    <h2>{item.title}</h2>
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><i className='bx bxs-user'></i> Author: </span>
                                                        {item.name}
                                                    </p>
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><img src={cooking_method} alt="cooking_method" style={{ height: '20px', width: '16px' }} /> Cooking method: </span>
                                                        {item.cooking_method}
                                                    </p>
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><img src={cuisines} alt="cuisines" style={{ height: '20px', width: '16px' }} /> Cuisine: </span>
                                                        {item.cuisines}
                                                    </p>
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><img src={courses} alt="courses" style={{ height: '20px', width: '16px' }} /> Courses: </span>
                                                        {item.courses}
                                                    </p>
                                                    <p>

                                                        {item.payment == null ?
                                                            <span className="badge bg-success">FREE</span> :
                                                            <span style={{ fontWeight: 'bold' }}>
                                                                <img src={payment} alt="payment" style={{ height: '20px', width: '16px' }} /> <span> </span>
                                                                Cost: <span className="badge bg-primary">&#8377;{item.payment}</span>
                                                            </span>
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="single-result-section section-2 row">
                                                <div className="section-21 col-sm-3">
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><img src={difficulty} alt="difficulty" style={{ height: '20px', width: '16px' }} /> Difficulty: </span>
                                                    </p>
                                                    <p style={{ color: item.difficulty === 'Easy' ? 'Green' : item.difficulty === 'Hard' ? 'Red' : 'Orange', fontWeight: 'bold', fontStyle: 'italic' }}>{item.difficulty}</p>
                                                </div>
                                                <div className="section-22 col-sm-9">
                                                    <div className="row">
                                                        <span className='col-4' style={{ textAlign: 'center' }}>
                                                            <span class="badge rounded-pill bg-info">Prep time:</span>
                                                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.prep_time} mins</p>
                                                        </span>
                                                        <span className='col-4' style={{ textAlign: 'center' }}>
                                                            <span class="badge rounded-pill bg-info">Cook time:</span>
                                                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.cook_time} mins</p>
                                                        </span>
                                                        <span className='col-4' style={{ textAlign: 'center' }}>
                                                            <span class="badge rounded-pill bg-info">Rest time:</span>
                                                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.rest_time} mins</p>
                                                        </span>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <span style={{ textAlign: 'center' }}>
                                                            <span class="badge rounded-pill bg-success" style={{ marginTop: '5px' }}>
                                                                <img src={clock} alt="total time" style={{ height: '20px', width: '20px' }} />
                                                                Total time
                                                            </span>
                                                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.total_time} mins</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="single-result-section section-3 row">
                                                <div className="section-31 col-sm-3" style={{ textAlign: 'center' }}>
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><img src={calorie} alt="calorie" style={{ height: '20px', width: '20px' }} /> Calories: </span>
                                                    </p>
                                                    <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.calories}</p>
                                                </div>
                                                <div className="section-32 col-sm-9" style={{ textAlign: 'center' }}>
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><img src={season} alt="season" style={{ height: '20px', width: '20px' }} /> Best Season: </span>
                                                    </p>
                                                    <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.best_season}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        }
                    </div>
            }

        </div>
    )
}
