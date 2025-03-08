import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const OnSellProduct = () => {
  return (
    <div>
      <Button asChild className='mx-auto' variant='ghost'>
        <Link to='/sell-product'>
          <FontAwesomeIcon icon={faPlus} size='lg' />
          Sell Product
        </Link>
      </Button>
    </div>
  )
}

export default OnSellProduct
