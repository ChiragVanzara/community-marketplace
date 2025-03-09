import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import image from '@/assets/laptop.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <div>
            <Card className='w-full'>
                {/* {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="aspect-video w-full object-cover rounded-t-md"
                    />
                )} */}
                <img
                    src={product && product?.images[0]}
                    alt='Image'
                    className="aspect-video w-full object-cover rounded-t-md"
                />
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    {/* {description && <CardDescription>{description}</CardDescription>} */}
                    {/* <CardDescription className='line-clamp-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, architecto.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe reiciendis ratione molestiae inventore blanditiis accusantium, natus velit hic ipsam dolorum. Doloremque sequi, suscipit ipsam dolorum voluptatibus minima ducimus vel modi obcaecati ut cumque officiis explicabo.
                    </CardDescription> */}
                </CardHeader>
                <CardContent className="space-y-2 space-x-1">
                    <p className="text-lg font-semibold">₹{" "}{product.price}</p>
                    {/* {category && <Badge variant="secondary">{category}</Badge>} */}
                    <Badge variant="secondary">{product.category || "N/A"}</Badge>
                    {/* {!isAvailable && (
                        <Badge variant="destructive">Out of Stock</Badge>
                    )} */}
                    <Badge variant="destructive">Out of Stock</Badge>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                    {/* {isAvailable && onAddToCart && (
                        <Button onClick={onAddToCart}>Add to Cart</Button>
                    )} */}
                    {/* <Button asChild variant='outline' className='hover:ring-white hover:ring-1'>
                        <Link>
                            <FontAwesomeIcon icon={faCartPlus} />Add to Cart
                        </Link>
                    </Button> */}
                    <Button asChild>
                        <Link to={`/products/${product._id}`} className=''>
                            <FontAwesomeIcon icon={faArrowRight} />Product
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProductCard
