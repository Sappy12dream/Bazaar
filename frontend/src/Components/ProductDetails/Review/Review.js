import React from 'react'
import ReactStars from 'react-rating-stars-component'

function Review() {
    const options ={
        edit:false,
        activeColor:'yellow',
        color:"grey",
        value:4,
        isHalf:true,
        size:12
      }
  return (
    <div className='review-container'>
        <div className='review'>
            <h5>sappy12dream</h5>
            <p>It's good</p>
          <ReactStars {...options}/>
        </div>
    </div>
  )
}

export default Review