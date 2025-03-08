import Navbar from '@/components/CommonComponents/Navbar/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'

const SellProductPage = () => {

    const inputRef = useRef();

    const [price, setPrice] = useState(0);
    const [name, setName] = useState();
    const [images, setImages] = useState([]);
    const [details, setDetails] = useState([]);
    const [files, setFiles] = useState([]);

    const addDetail = () => {
        const input = document.getElementById('details');
        setDetails([...details, input.value]);
    }

    const addImages = (e) => {
        setFiles([...files, e.target.files[0]]);
        setImages([...images, URL.createObjectURL(e.target.files[0])]);
    }

    return (
        <div className='h-screen'>
            <Navbar />
            <div className='h-fit grid md:grid-cols-2 mx-auto my-auto p-4 gap-2'>
                <Card className='p-4'>
                    <CardHeader>
                        <h1 className='text-2xl text-center'>Sell Your Product</h1>
                        <CardDescription className='text-center'>Provide Your Product Information</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <Input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Product Name' />
                        <Input type='number' name='price' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Product Price' />
                        <div className='flex items-center'>
                            <Input type='text' id='details' name='details' placeholder='Add Product Detail' />
                            <Button variant='outline' onClick={addDetail}>
                                <FontAwesomeIcon icon={faPlus} />Add
                            </Button>
                        </div>
                        <div className='space-x-2'>{details.map((item, index) => (
                            <Badge className='text-xs' key={index}>{index + 1}{item}</Badge>
                        ))}</div>
                    </CardContent>
                    <CardFooter className='flex justify-around items-center'>
                        <Button>
                            Add Product<FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </CardFooter>
                </Card>
                <Card className='h-fit'>
                    <CardHeader>
                        <h1 className='text-2xl text-center'>Product Images</h1>
                        <CardDescription className='text-center'>
                            Add Image of Your Product from multiple side
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex items-center justify-center'>
                        <div className='grid grid-cols-1 gap-2 w-full'>
                            {
                                images.map((image, index) => (
                                    <div key={index} className='h-fit w-1/2 mx-auto'>
                                        <img src={image} className='h-[100px] w-[200px] mx-auto' />
                                    </div>
                                ))
                            }
                            <div className='border-2 border-dashed h-[100px] w-full flex items-center justify-center' onClick={() => inputRef.current.click()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                        <Input type='file' id='images' onChange={addImages} name='productImage' ref={inputRef} className='hidden' />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SellProductPage
