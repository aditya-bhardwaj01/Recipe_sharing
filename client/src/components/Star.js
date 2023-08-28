import React, { useEffect } from 'react';
import './styling/Star.css';

export default function Star(props) {
  useEffect(() => {
    let starHtml = '';
    let rateInt = Math.floor(props.rating);
    let partialRate = Math.ceil((props.rating - rateInt) * 100);

    for (let i = 0; i < rateInt; i++) {
      starHtml += '<span class="full-yellow"></span>';
    }

    if (partialRate !== 0) {
      starHtml += '<span class="half-yellow"></span>';
      rateInt = rateInt + 1;
    }

    for (let i = 0; i < 5 - rateInt; i++) {
      starHtml += '<span class="full-black"></span>';
    }

    if (starHtml !== '') {
      document.getElementById('star' + props.itemId).innerHTML = starHtml;
    }
  }, [props.itemId, props.rating]);

  return (
    <div>
      <div className="star-rating">
        <span style={{ fontSize: '16px' }}>{props.rating} </span>
        <span id={'star' + props.itemId}></span>
      </div>
    </div>
  );
}
