import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    return (
        <div className='grid md:grid-cols-4 gap-4'>
            {
                arr.map((_, index) => (
                    index !== 4 && index !== 5 ? <ProductCard key={index} /> :
                        <div className='md:col-span-2' key={index}>
                            <ProductCard />
                        </div>
                ))
            }
        </div>
    )
}

export default ProductGrid
