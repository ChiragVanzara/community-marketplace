import AppSidebar from '@/components/CommonComponents/AppSidebar/AppSidebar'
import Footer from '@/components/CommonComponents/Footer/Footer'
import HomePageNavbar from '@/components/HomePageComponents/HomePageNavbar'
import ProductGrid from '@/components/HomePageComponents/ProductGrid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider } from '@/components/ui/sidebar'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const HomePage = () => {

    const [filter, setFilter] = useState("");

    return (
        <div className='h-screen'>
            <SidebarProvider defaultOpen={false} >
                <AppSidebar>
                    <div className='w-full sticky top-0'>
                        <HomePageNavbar />
                    </div>
                    <div className='p-4'>
                        <div>
                            <div className='flex justify-center items-center'>
                                <Input className='md:w-1/4' placeholder="Search Product..." />
                                <Button variant='secondary'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </div>
                            <Select onValueChange={(v) => setFilter(v)}>
                                <SelectTrigger className="w-[180px] md:mx-0 mx-auto md:my-auto mt-2">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="laptop">Laptop</SelectItem>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                    <SelectItem value="watch">Watch</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator className='my-4' />
                        <div className='flex justify-center items-center'>
                            <ProductGrid />
                        </div>
                        <Separator className='my-4' />
                        <div>
                            <Footer />
                        </div>
                    </div>
                </AppSidebar>
            </SidebarProvider>
        </div>
    )
}

export default HomePage
