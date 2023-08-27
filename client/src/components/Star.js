import React, { useEffect } from 'react'
import "./styling/Star.css";

export default function Star(props) {
    useEffect(() => {
        let rateInt = Math.floor(props.rating)
        let partialRate = Math.ceil((props.rating-rateInt)*100);
        var starHtml = ""
        for(let i = 0; i<rateInt; i++){
            starHtml += "<i className='fa fa-star single-star'></i>";
        }
        if(partialRate !== 0){
            starHtml += "<i className='fa fa-star-half-full partial-star'></i>";
            rateInt = rateInt+1;
        }
        for(let i=0; i<5-rateInt; i++){
            starHtml += "<i className='fa fa-star'></i>";
        }
        document.getElementById("star"+props.itemId).innerHTML = starHtml
        // console.log(document.getElementById("star"+props.itemId).innerHTML)
    }, [props.itemId, props.rating])

    return (
        <div>
            <div className="star-rating">
                <span style={{fontSize: "16px"}}>{props.rating} </span>
                <span id={"star"+props.itemId}></span>
                {/* <span classname="fa fa-star"></span> */}
                {/* <i className='fa fa-star-half-full partial-star'></i> */}
                {/* <i className='fa fa-star single-star'></i> */}
            </div>
        </div>
    )
}
