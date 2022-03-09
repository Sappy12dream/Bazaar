import React from 'react'
import { MdOutlineAddBox } from "react-icons/md";
import DropDrown from '../DropDown/DropDrown';

function SubHeader() {
  return (
    <div className='Sub_header'>
      <div className='options'>
        <DropDrown name={'ratings'} list={['above 4', 'above 3', 'above 6']}/>
        <DropDrown name={'price'} list={['below 200', 'below 300', 'below 300']}/>
        <DropDrown name={'category'} list={['Home', 'Room', 'Other']}/>
      </div>
      <div className='add_btn'>
        <button><span><MdOutlineAddBox/></span>Add Product</button>
      </div>
    </div>
  )
}

export default SubHeader