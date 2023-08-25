import React, { useState } from 'react'
import './styling/SearchHome.css'

export default function SearchHome() {
    const [searchState, setSearchState] = useState("")

    const searchBy = (state) => {
        setSearchState(state)
    }

    return (
        <div>
            <div className="home-search-region">
                <h5 style={{ padding: "1vh" }}>Search your favourite cook/recipe</h5>
                {
                    searchState == "" ?
                        <div className='searchstate-buttons d-flex justify-content-around'>
                            <button type="button" className="btn btn-outline-primary" style={{ margin: "10px" }} onClick={searchBy('username')}>
                                Search by User name
                            </button>
                            <button type="button" className="btn btn-outline-success" style={{ margin: "10px" }} onClick={searchBy('name')}>
                                Search by Name
                            </button>
                            <button type="button" className="btn btn-outline-danger" style={{ margin: "10px" }} onClick={searchBy('recipename')}>
                                Search by Recipe name
                            </button>
                            <button type="button" className="btn btn-outline-dark" style={{ margin: "10px" }} onClick={searchBy('recipetype')}>
                                Search by Recipe type
                            </button>
                        </div>
                        :
                        <div className='searchrecipe-box'>bbbb</div>
                }
            </div>
        </div>
    )
}
