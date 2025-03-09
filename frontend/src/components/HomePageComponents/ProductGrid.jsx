import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useProductContext } from '@/context/ProductProvider';

const ProductGrid = () => {
    const { getAllProducts, allProducts } = useProductContext();
    useEffect(()=> {
        getAllProducts();
    }, [])
    // console.log(allProducts)
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    return (
        <div className='grid md:grid-cols-8 gap-4'>
            {
                allProducts.map((product, index) => (
                    // index !== 4 && index !== 5 ? <ProductCard key={index} /> :
                        <div className='md:col-span-2' key={index}>
                            <ProductCard product={product}/>
                        </div>
                ))
            }
        </div>
    )
}

export default ProductGrid
