import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import Product from '../Product/Product'
function ProductScreen() {
  return (
    <div className='Product_screen'>
      <div className='page'>
        <div className='info'>
          <p>Results: 1-10 of 2000</p>
        </div>
        <div className='page_fun'>
           <IoIosArrowBack/>
          <span>page 1</span>
          <IoIosArrowForward/>
        </div>
      </div>
      <div className='products-wrapper'>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
      </div>
    </div>
  )
}

export default ProductScreen