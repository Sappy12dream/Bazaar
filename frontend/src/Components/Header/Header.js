import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import {useNavigate} from 'react-router-dom';



function Header() {
  const navigate = useNavigate();

  const [keyword, setkeyword] = useState('')
  const handleSubmit=(event)=>{
    event.preventDefault()
    if(keyword.trim()){

      console.log(keyword)
      navigate(`/products/${keyword}`);

    }else{
      navigate('/')
    }

  }
  return (
    <div className='Header'>
        <form className='Search_tab' >
            <FiSearch/>
            <input type='text' placeholder='Type here...' value={keyword} onChange={(event)=>setkeyword(event.target.value)} />
            <button type='submit' onClick={handleSubmit}>search</button>
        </form>
        <div className='user_profile'>
            <div className='user_pic'></div>
            <p className='user_name'>sappy12dream</p>
            <IoIosArrowDown/>
        </div>
    </div>
  )
}

export default Header