import React from 'react'
import ReactStars from 'react-rating-stars-component'

function Review({rev}) {
    const options ={
        edit:false,
        activeColor:'yellow',
        color:"grey",
        value:rev.rating,
        isHalf:true,
        size:12
      }
  return (
    <div className='review-container'>
        
        <div className='review'>
            <h5>{rev.name}</h5>
            <p>{rev.comment}</p>
          <ReactStars {...options}/>

        </div>
    </div>
  )
}

export default Review