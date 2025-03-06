import React from 'react'

const AboutUs = () => {
    return (
        <>
            <div className='p-8'>
                <div>
                    <h1 className='text-3xl md:text-4xl mb-3 text-end'>About Us</h1>
                </div>
                <div className='flex justify-end items-center md:text-2xl text-xl mb-4'>
                    <p className='w-3/4 text-end'>We believe in the power of community.
                        LocalHive is a platform designed to
                        connect neighbors and facilitate local commerce.
                        Whether you're looking for handcrafted goods,
                        pre-loved treasures, or essential services, you'll find it here.</p>
                </div>
                <div className='flex justify-end items-center md:text-2xl text-xl mb-4'>
                    <p className='w-3/4 text-end'>Our mission is to empower local sellers and provide a
                        convenient and trustworthy marketplace for buyers.
                        We're building a community where everyone can thrive.</p>

                </div>
            </div>
        </>
    )
}

export default AboutUs
