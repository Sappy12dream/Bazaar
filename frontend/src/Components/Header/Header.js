import React from 'react'
import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <div className='Header'>
        <div className='Search_tab'>
            <FiSearch/>
            <input type='text' placeholder='search'/>
        </div>
        <div className='user_profile'>
            <div className='user_pic'></div>
            <div className='user_name'>sappy12dream</div>
        </div>
    </div>
  )
}

export default Header