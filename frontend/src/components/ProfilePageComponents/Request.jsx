import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Loader2 } from 'lucide-react'
import image from '@/assets/user.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faHourglassEnd } from '@fortawesome/free-solid-svg-icons'

const Request = (props) => {
    const { request } = props;
    return (
        <div className='md:flex items-center justify-between px-1'>
            <div className='flex items-center justify-between space-x-5'>
                <Avatar className='size-12'>
                    <AvatarImage src={image} />
                    <AvatarFallback><Loader2 className='animate-spin text-3xl' /></AvatarFallback>
                </Avatar>
                <div>
                    User Name
                </div>
            </div>
            <div className='space-x-6 flex justify-between items-center'>
                <div>
                    3 min ago
                </div>
                <div>
                    {request === "pending" && <Button variant='ghost' className='text-yellow-400'>Pending<FontAwesomeIcon icon={faHourglassEnd} spin /></Button>}
                    {request === "rejected" && <Button className='border border-red-600 text-red-600 bg-transparent hover:bg-transparent'>Rejected<FontAwesomeIcon icon={faBan} /></Button>}
                    {request === "accepted" && <Button className='bg-green-600 text-white hover:bg-green-500'>Accepted<FontAwesomeIcon icon={faCheck} /></Button>}
                </div>
            </div>
        </div>
    )
}

export default Request
