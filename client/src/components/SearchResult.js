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
import difficultyLogo from "./img/difficulty.png"
import clock from "./img/clock.png"
import calorie from "./img/calorie.png"
import seasonLogo from "./img/season.png"
import noResult from "./img/not-found.gif"
import filter from "./img/filter.png"
import Star from './Star'

export default function SearchResult() {
    let { searchtype, searchvalue } = useParams()
    const navigate = useNavigate()

    const [minCost, setMinCost] = useState(0)
    const [maxCost, setMaxCost] = useState(10000000)
    const [minRating, setMinRating] = useState(0)
    const [maxRating, setMaxRating] = useState(5)
    const [minTime, setMinTime] = useState(0)
    const [maxTime, setMaxTime] = useState(10000000)
    const [minCalorie, setMinCalorie] = useState(0)
    const [maxCalorie, setMaxCalorie] = useState(10000000)

    const [difficulty, setDifficulty] = useState(['Easy', 'Intermediate', 'Hard'])
    const [tempDifficulty, setTempDifficulty] = useState(['Easy', 'Intermediate', 'Hard'])

    const [season, setSeason] = useState(['Summer', 'Winter', 'Rainy', 'Spring', 'Autumn'])
    const [tempSeason, setTempSeason] = useState(['Summer', 'Winter', 'Rainy', 'Spring', 'Autumn'])

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    var currMnCost = 0, currMxCost = 10000000, currMnRate = 0, currMxRate = 5, currMnTime = 0, currMxTime = 10000000, currMnCalorie = 0, currMxCalorie = 10000000;
    const goToHome = () => {
        navigate('/home')
    }

    const moveToItem = (itemId) => {
        navigate('/item/' + itemId)
    }

    const loadResult = () => {
        setLoading(true)
        axios.post("http://localhost:3001/searchresult", {
            searchtype: searchtype,
            searchvalue: searchvalue,
            mnCost: parseFloat(currMnCost),
            mxCost: parseFloat(currMxCost),
            mnRating: parseFloat(currMnRate),
            mxRating: parseFloat(currMxRate),
            mnTime: parseFloat(currMnTime),
            mxTime: parseFloat(currMxTime),
            mnCalorie: parseFloat(currMnCalorie),
            mxCalorie: parseFloat(currMxCalorie),
            difficulty: tempDifficulty,
            season: tempSeason
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
                    setMinCost()
                    setMinCost(currMnCost);
                    setMaxCost(currMxCost);
                    setMinRating(currMnRate);
                    setMaxRating(currMxRate);
                    setMinTime(currMnTime);
                    setMaxTime(currMxTime);
                    setMinCalorie(currMnCalorie);
                    setMaxCalorie(currMxCalorie);
                    setDifficulty(tempDifficulty);
                    setSeason(tempSeason);
                }
                setLoading(false)
            })
    }

    useEffect(() => {
        loadResult();
    }, [searchtype, searchvalue])

    const openModal = () => {
        document.getElementById('cost-from').value = minCost
        document.getElementById('cost-to').value = maxCost
        document.getElementById('rating-from').value = minRating
        document.getElementById('rating-to').value = maxRating
        document.getElementById('time-from').value = minTime
        document.getElementById('time-to').value = maxTime
        document.getElementById('calorie-from').value = minCalorie
        document.getElementById('calorie-to').value = maxCalorie
        setTempDifficulty(difficulty);
        setTempSeason(season)
    }

    const handleCheckboxChangeForDifficulty = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setTempDifficulty([...tempDifficulty, value])
        } else {
            setTempDifficulty(tempDifficulty.filter((item) => item !== value))
        }
    }

    const handleCheckboxChangeForSeason = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setTempSeason([...tempSeason, value])
        } else {
            setTempSeason(tempSeason.filter((item) => item !== value))
        }
    }

    const applyFilter = () => {
        const regex = /^-?\d+(\.\d+)?$/;
        currMnCost = document.getElementById('cost-from').value;
        currMxCost = document.getElementById('cost-to').value;

        currMnRate = document.getElementById('rating-from').value;
        currMxRate = document.getElementById('rating-to').value;

        currMnTime = document.getElementById('time-from').value;
        currMxTime = document.getElementById('time-to').value;

        currMnCalorie = document.getElementById('calorie-from').value;
        currMxCalorie = document.getElementById('calorie-to').value;

        if (!regex.test(currMnCost) || !regex.test(currMxCost)) {
            swal({
                title: "Failed!",
                text: "Provide proper input for cost!!",
                icon: "warning",
                timer: 5000,
                button: false
            });
        } else if (!regex.test(currMnRate) || !regex.test(currMxRate)) {
            swal({
                title: "Failed!",
                text: "Provide proper input for rating!!",
                icon: "warning",
                timer: 5000,
                button: false
            });
        } else if (!regex.test(currMnTime) || !regex.test(currMxTime)) {
            swal({
                title: "Failed!",
                text: "Provide proper input for time!!",
                icon: "warning",
                timer: 5000,
                button: false
            });
        } else if (!regex.test(currMnCalorie) || !regex.test(currMxCalorie)) {
            swal({
                title: "Failed!",
                text: "Provide proper input for calorie!!",
                icon: "warning",
                timer: 5000,
                button: false
            });
        } else {
            loadResult()
        }

        // console.log(currMnCost, currMxCost);
        // console.log(currMnRate, currMxRate);
        // console.log(currMnTime, currMxTime);
        // console.log(currMnCalorie, currMxCalorie);
        // console.log(tempDifficulty, tempSeason);
    }

    return (
        <div className='SearchResult'>
            {
                loading === true ?
                    <Spinner />
                    :
                    <div className='mainarea-searchresult'>
                        <button type="button" className="btn btn-dark btn-sm" onClick={goToHome}>&larr;Go back</button>
                        <div className="searchresult-filter" style={{marginTop: '20px'}}>
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#filterModal" onClick={openModal}>
                                <img src={filter} alt="Filter" style={{ height: '25px', width: '25px' }} />
                                <span style={{ fontWeight: 'bold' }}>FILTER</span>
                            </button>

                            <div className="modal fade modal-lg" id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="filterModalLabel">Apply Filters</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="cost-filter filter-single">
                                                <h6>Cost</h6>
                                                <div className="row">
                                                    <p className="col-sm-6">
                                                        <label htmlFor="cost-from">From:</label>
                                                        <input type="text" id="cost-from" placeholder='Minimum Cost' name="cost-from" ></input>
                                                    </p>

                                                    <p className="col-sm-6">
                                                        <label htmlFor="cost-to">To:</label>
                                                        <input type="text" id="cost-to" placeholder='Maximum Cost' name="cost-to" ></input>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="rating-filter filter-single">
                                                <h6>Rating</h6>
                                                <div className="row">
                                                    <p className="col-sm-6">
                                                        <label htmlFor="rating-from">From:</label>
                                                        <input type="text" id="rating-from" placeholder='Minimum Rating' name="rating-from" ></input>
                                                    </p>

                                                    <p className="col-sm-6">
                                                        <label htmlFor="rating-to">To:</label>
                                                        <input type="text" id="rating-to" placeholder='Maximum Rating' name="rating-to" ></input>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="time-filter filter-single">
                                                <h6>Total time</h6>
                                                <div className="row">
                                                    <p className="col-sm-6">
                                                        <label htmlFor="time-from">From:</label>
                                                        <input type="text" id="time-from" placeholder='Minimum Time' name="time-from" ></input>
                                                    </p>

                                                    <p className="col-sm-6">
                                                        <label htmlFor="time-to">To:</label>
                                                        <input type="text" id="time-to" placeholder='Maximum Time' name="time-to" ></input>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="calorie-filter filter-single">
                                                <h6>Calories</h6>
                                                <div className="row">
                                                    <p className="col-sm-6">
                                                        <label htmlFor="calorie-from">From:</label>
                                                        <input type="text" id="calorie-from" placeholder='Minimum Calories' name="calorie-from" ></input>
                                                    </p>

                                                    <p className="col-sm-6">
                                                        <label htmlFor="calorie-to">To:</label>
                                                        <input type="text" id="calorie-to" placeholder='Maximum Calories' name="calorie-to" ></input>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="difficulty-filter filter-single">
                                                <h6>Difficulty</h6>
                                                <div className="row">
                                                    <p className="col-sm-4">
                                                        <input type="checkbox" id="easy-diff" name="easy" value="Easy" checked={tempDifficulty.includes("Easy")} onChange={handleCheckboxChangeForDifficulty} />
                                                        <label htmlFor="easy-diff" style={{ color: 'green' }}>&nbsp;Easy</label><br></br>
                                                    </p>
                                                    <p className="col-sm-4">
                                                        <input type="checkbox" id="intermediate-diff" name="intermediate" value="Intermediate" checked={tempDifficulty.includes("Intermediate")} onChange={handleCheckboxChangeForDifficulty} />
                                                        <label htmlFor="intermediate-diff" style={{ color: 'orange' }}>&nbsp;Intermediate</label><br></br>
                                                    </p>
                                                    <p className="col-sm-4">
                                                        <input type="checkbox" id="hard-diff" name="hard" value="Hard" checked={tempDifficulty.includes("Hard")} onChange={handleCheckboxChangeForDifficulty} />
                                                        <label htmlFor="hard-diff" style={{ color: 'red' }}>&nbsp;Hard</label><br></br>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="season-filter filter-single">
                                                <h6>Season</h6>
                                                <div className="row">
                                                    <p className="col-sm">
                                                        <input type="checkbox" id="summer-season" name="summer" value="Summer" checked={tempSeason.includes("Summer")} onChange={handleCheckboxChangeForSeason} />
                                                        <label htmlFor="summer-season">&nbsp;Summer</label><br></br>
                                                    </p>
                                                    <p className="col-sm">
                                                        <input type="checkbox" id="winter-season" name="winter" value="Winter" checked={tempSeason.includes("Winter")} onChange={handleCheckboxChangeForSeason} />
                                                        <label htmlFor="winter-season">&nbsp;Winter</label><br></br>
                                                    </p>
                                                    <p className="col-sm">
                                                        <input type="checkbox" id="rainy-season" name="rainy" value="Rainy" checked={tempSeason.includes("Rainy")} onChange={handleCheckboxChangeForSeason} />
                                                        <label htmlFor="rainy-season">&nbsp;Rainy</label><br></br>
                                                    </p>
                                                    <p className="col-sm">
                                                        <input type="checkbox" id="spring-season" name="spring" value="Spring" checked={tempSeason.includes("Spring")} onChange={handleCheckboxChangeForSeason} />
                                                        <label htmlFor="spring-season">&nbsp;Spring</label><br></br>
                                                    </p>
                                                    <p className="col-sm">
                                                        <input type="checkbox" id="autumn-season" name="autumn" value="Autumn" checked={tempSeason.includes("Autumn")} onChange={handleCheckboxChangeForSeason} />
                                                        <label htmlFor="autumn-season">&nbsp;Autumn</label><br></br>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={applyFilter} data-bs-dismiss="modal">Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
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
                                                    <button type="button" className="btn btn-success btn-lg btn-block" onClick={() => { moveToItem(item.id) }}>
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

                                                        {item.payment === 0 ?
                                                            <span className="badge bg-success">FREE</span> :
                                                            <span style={{ fontWeight: 'bold' }}>
                                                                <img src={payment} alt="payment" style={{ height: '20px', width: '16px' }} /> <span> </span>
                                                                Cost: <span className="badge bg-primary">&#8377;{item.payment}</span>
                                                            </span>
                                                        }
                                                    </p>
                                                    <p>
                                                        <Star rating={item.rating} itemId={item.id} />
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="single-result-section section-2 row">
                                                <div className="section-21 col-sm-3">
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}><img src={difficultyLogo} alt="difficulty" style={{ height: '20px', width: '16px' }} /> Difficulty: </span>
                                                    </p>
                                                    <p style={{ color: item.difficulty === 'Easy' ? 'Green' : item.difficulty === 'Hard' ? 'Red' : 'Orange', fontWeight: 'bold', fontStyle: 'italic' }}>{item.difficulty}</p>
                                                </div>
                                                <div className="section-22 col-sm-9">
                                                    <div className="row">
                                                        <span className='col-4' style={{ textAlign: 'center' }}>
                                                            <span className="badge rounded-pill bg-info">Prep time:</span>
                                                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.prep_time} mins</p>
                                                        </span>
                                                        <span className='col-4' style={{ textAlign: 'center' }}>
                                                            <span className="badge rounded-pill bg-info">Cook time:</span>
                                                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.cook_time} mins</p>
                                                        </span>
                                                        <span className='col-4' style={{ textAlign: 'center' }}>
                                                            <span className="badge rounded-pill bg-info">Rest time:</span>
                                                            <p style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.rest_time} mins</p>
                                                        </span>
                                                    </div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <span style={{ textAlign: 'center' }}>
                                                            <span className="badge rounded-pill bg-success" style={{ marginTop: '5px' }}>
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
                                                        <span style={{ fontWeight: 'bold' }}><img src={seasonLogo} alt="season" style={{ height: '20px', width: '20px' }} /> Best Season: </span>
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
