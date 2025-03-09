import { faApple, faGooglePlay, faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const GetApp = () => {
  return (
    <>
      <div className='text-center md:text-3xl text-2xl mb-6'>Get Our App</div>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-6 md:space-y-0 text-2xl">
                <div className='border p-2'>
                    <FontAwesomeIcon icon={faGooglePlay} />
                    <a href='/' className='mx-2' target='_blank'>
                        Play Store
                    </a>
                </div>
                <div className='border p-2'>
                    <FontAwesomeIcon icon={faApple} />
                    <a href='/' className='mx-2' target='_blank'>
                        Apple Store
                    </a>
                </div>
                <div className='border p-2'>
                    <FontAwesomeIcon icon={faMicrosoft} />
                    <a href='/' className='mx-2' target='_blank'>
                        Microsoft Store
                    </a>
                </div>
            </div>
    </>
  )
}

export default GetApp
