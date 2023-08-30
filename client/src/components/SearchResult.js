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
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                        }
                    </div>
            }

        </div>
    )
}
