import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"

const HeroBanner = ({ heroBanner}) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className="top-small-text">
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <p className='old-price'>$320</p>
        <p className='new-price'>$159.99</p>
        <img src={urlFor(heroBanner.image)} alt="headphones" className='hero-banner-image' />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
          <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className='hero-product-name'>{heroBanner.product}</div>
          <FaChevronRight className='right-icon' />
          <FaChevronLeft className='left-icon' />
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner