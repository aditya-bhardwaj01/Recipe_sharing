import React, { useEffect, useState } from 'react'
import './styling/SearchResult.css'
import axios from 'axios'
import swal from 'sweetalert'
import { useParams, useNavigate } from 'react-router'
import Spinner from './Spinner'

export default function SearchResult() {
    let { searchtype, searchvalue } = useParams()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const goToHome = () => {
        navigate('/home')
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
                                <div>Kuch nhi hai</div>
                                :
                                <div className="searchresult-display">
                                    {items.map((item, index) => (
                                        <div key={index} className="searchresult-single">
                                            <div className="single-result-section section-1 row">
                                                <div className="section-11 col-sm-4">
                                                    <img src={item.photo} alt="" />
                                                    <button type="button" class="btn btn-success btn-lg btn-block">View</button>
                                                </div>
                                                <div className="section-12 col-sm-8">
                                                    <h2>{item.title}</h2>
                                                    <p>{item.name}</p>
                                                    <p>{item.cooking_method}</p>
                                                    <p>{item.cuisines}</p>
                                                    <p>{item.courses}</p>
                                                    <p>{item.payment == null ? 
                                                        <span className="badge bg-success">FREE</span> :
                                                        <span className="badge bg-primary">&#8377;{item.payment}</span>}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="single-result-section section-2 row">
                                                <div className="section-21 col-3">
                                                    {item.difficulty}
                                                </div>
                                                <div className="section-22 col-9">
                                                    <div className="row">
                                                        <span className='col-3' style={{textAlign: 'center'}}>
                                                            {item.prep_time}
                                                        </span>
                                                        <span className='col-3' style={{textAlign: 'center'}}>
                                                            {item.cook_time}
                                                        </span>
                                                        <span className='col-3' style={{textAlign: 'center'}}>
                                                            {item.rest_time}
                                                        </span>
                                                        <span className='col-3' style={{textAlign: 'center'}}>
                                                            {item.total_time
                                                        }</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="single-result-section section-3 row">
                                                <div className="section-31 col-3" style={{textAlign: 'center'}}>
                                                    {item.calories}
                                                </div>
                                                <div className="section-32 col-9" style={{textAlign: 'center'}}>
                                                    {item.best_season}
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
