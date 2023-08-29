import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

export default function SearchResult() {
    let { searchtype, searchvalue } = useParams()

    useEffect(() => {
        axios.post("http://localhost:3001/searchresult", {
            searchtype: searchtype,
            searchvalue: searchvalue
        })
        .then((response) => {
            console.log(response.data);
        })
    }, [searchtype, searchvalue])

    return (
        <div className='SearchResult'>
            {searchtype}
            {searchvalue}
        </div>
    )
}
