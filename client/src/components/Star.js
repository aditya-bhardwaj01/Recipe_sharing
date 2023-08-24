import React, { useEffect } from 'react'
import "./styling/Star.css";

export default function Star(props) {
    useEffect(() => {
        let rateInt = Math.floor(props.rating)
        let partialRate = Math.ceil((props.rating-rateInt)*100);
        // console.log(partialRate)
        var starHtml = ""
        for(let i = 0; i<rateInt; i++){
            starHtml += "<span class='fa fa-star single-star'></span>";
        }
        if(partialRate != 0){
            starHtml += "<i class='fa fa-star-half-full partial-star'></i>";
            rateInt = rateInt+1;
        }
        for(let i=0; i<5-rateInt; i++){
            starHtml += "<span class='fa fa-star'></span>";
        }
        document.getElementById("star"+props.itemId).innerHTML = starHtml
    }, [])

    return (
        <div>
            <div className="star-rating">
                <span style={{fontSize: "16px"}}>{props.rating} </span>
                <span id={"star"+props.itemId}></span>
            </div>
        </div>
    )
}
