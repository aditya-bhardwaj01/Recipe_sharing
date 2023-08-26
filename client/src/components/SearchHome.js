import React, { useState } from 'react'
import './styling/SearchHome.css'
import axios from 'axios'
import swal from "sweetalert";

export default function SearchHome() {
    const [searchState, setSearchState] = useState("")
    const [display, setDisplay] = useState("")
    const [searchMatch, setSearchMatch] = useState([])

    const searchBy = (state) => {
        setSearchState(state)
        if(state === "username") setDisplay("User name")
        if(state === "name") setDisplay("Name")
        if(state === "recipename") setDisplay("Recipe name")
        if(state === "recipetype") setDisplay("Recipe type")
    }

    const unsetSearchState = () => {
        document.getElementById('search-home').disabled = true;
        setSearchState("")
    }

    const fetchMatchedSearch = (event) => {
        document.getElementById('search-home').disabled = true;
        const searchVal = event.target.value;
        // console.log(val);
        axios.post("http://localhost:3001/search/"+searchState, {
            search: searchVal
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
                setSearchMatch(response.data.result);
              }
        })
    }

    return (
        <div>
            <div className="home-search-region">
                <h5 style={{ padding: "1vh" }}>Search your favourite cook/recipe</h5>
                {
                    searchState === "" ?
                        <div className='searchstate-buttons d-flex justify-content-around'>
                            <button type="button" className="btn btn-outline-primary" style={{ margin: "10px" }} onClick={() => searchBy('username')}>
                                Search by User name
                            </button>
                            <button type="button" className="btn btn-outline-success" style={{ margin: "10px" }} onClick={() => searchBy('name')}>
                                Search by Name
                            </button>
                            <button type="button" className="btn btn-outline-danger" style={{ margin: "10px" }} onClick={() => searchBy('recipename')}>
                                Search by Recipe name
                            </button>
                            <button type="button" className="btn btn-outline-dark" style={{ margin: "10px" }} onClick={() => searchBy('recipetype')}>
                                Search by Recipe type
                            </button>
                        </div>
                        :
                        <div className='searchrecipe-box'>
                            <div className='searchrecipe-box-searchregion'>
                                <input type="text" placeholder={"Search "+display} onChange={fetchMatchedSearch} />
                                <button type="button" className="btn btn-success" id='search-home' disabled>Search</button>
                                <button type="button" className="btn btn-dark" onClick={unsetSearchState}>&larr;Go back</button>
                            </div>
                            <div className="searchrecipe-box-matchsearch">
                                <p>hfherf</p>
                                <p>fver</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
