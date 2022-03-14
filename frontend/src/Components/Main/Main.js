import React, { useState } from 'react'
import ProductScreen from '../ProductScreen/ProductScreen'
import SubHeader from '../SubHeader/SubHeader'


function Main() {
  const [price, setprice] = useState()
  const [ratings, setratings] = useState()
  const [category, setcategory] = useState()
  console.log(price)
  return (
    <div className='Main'>
        <SubHeader  setprice={setprice} setratings={setratings} setcategory={setcategory}/>
        <ProductScreen price={price} ratings={ratings} category={category}/>
    </div>
  )
}

export default Main