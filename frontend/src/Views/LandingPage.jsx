import AboutUs from '@/components/LandingPageComponents/AboutUs/AboutUs'
import Features from '@/components/LandingPageComponents/Features/Features'
import Footer from '@/components/CommonComponents/Footer/Footer'
import GetApp from '@/components/LandingPageComponents/GetApp/GetApp'
import Navbar from '@/components/CommonComponents/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const LandingPage = () => {
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {

            navigate('/home');
        }
    }, [])
    return (
        <div className='h-svh'>
            <Navbar />
            <div className='flex flex-col justify-center items-center h-100 space-y-5 mb-6'>
                <div>
                    <h2 className='text-3xl md:text-5xl'>Welcome to Cypher.</h2>
                </div>
                <div>
                    <p className='text-2xl md:text-3xl'>Shop Small, Support Big.</p>
                </div>
                <div className='p-2'>
                    <p className='text-center text-xl md:text-2xl'>Discover unique items, support local sellers, and connect with your neighbors. </p>
                    <p className='text-center text-xl md:text-2xl'>Buy, sell, and trade with ease, right in your community.</p>
                </div>
                <div className='pt-6'>
                    {!accessToken && <Button><Link to='/sign-in'>Sign In</Link><FontAwesomeIcon icon={faRightToBracket} /></Button>}
                </div>
            </div>
            <Separator className='my-4' />
            <Features />
            <Separator className='my-4' />
            <AboutUs />
            <Separator className='my-4' />
            <GetApp />
            <Separator className='my-8' />
            <Footer />
        </div>
    )
}

export default LandingPage
