import React from 'react'
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

function Header() {
  return (
    <div className='Header'>
        <div className='Search_tab'>
            <FiSearch/>
            <input type='text' placeholder='search'/>
        </div>
        <div className='user_profile'>
            <div className='user_pic'></div>
            <p className='user_name'>sappy12dream</p>
            <IoIosArrowDown/>
        </div>
    </div>
  )
}

export default Header