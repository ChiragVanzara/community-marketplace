import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductManagmentPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/sign-in');
        }
    }, [])
    return (
        <div className='h-screen flex items-center justify-center'>
            Product Management.
        </div>
    )
}

export default ProductManagmentPage
