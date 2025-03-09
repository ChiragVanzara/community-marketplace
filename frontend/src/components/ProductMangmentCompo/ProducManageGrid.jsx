import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthProvider'
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';

const ProducManageGrid = ({ products }) => {
    const { user } = useContext(AuthContext);
    const rating = ((user.rating) * 100) / 5;

    return (
        <div>
            <div className='grid md:grid-cols-2'>
                <div className='px-4 py-2 space-y-2'>
                    <h3 className='text-3xl font-semibold'>Seller Contact Details</h3>
                    <Label className='font-bold'>User Name</Label>
                    <div className='text-2xl font-light'>@{user?.username}</div>
                    <Label className='font-bold'>User Phone</Label>
                    <div className='text-2xl font-light'>{user?.phone}</div>
                </div>
                <div className='px-4 py-2 space-y-2'>
                    <h3 className='text-3xl font-semibold'>Product Statistics</h3>
                    <Label className='font-bold'>Product For Sell</Label>
                    <div className='text-2xl font-light'>{products?.length}</div>
                    <Label className='font-bold'>Product Sold</Label>
                    <div className='text-2xl font-light'>{0}</div>
                </div>
            </div>
            <Separator className='my-4' />
            <div className='grid md:grid-cols-1'>
                <div className='px-4 py-2 space-y-2 md:w-1/2 md:mx-auto'>
                    <h3 className='text-3xl font-semibold mb-3 text-center'>Your Rating</h3>
                    <div className='text-3xl'>{user.rating}</div>
                    <Progress value={rating} />
                </div>
            </div>
        </div>
    )
}

export default ProducManageGrid
