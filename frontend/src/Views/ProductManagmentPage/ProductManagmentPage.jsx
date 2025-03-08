import AppSidebar from '@/components/CommonComponents/AppSidebar/AppSidebar';
import Footer from '@/components/CommonComponents/Footer/Footer';
import HomePageNavbar from '@/components/HomePageComponents/HomePageNavbar';
import OnSellProduct from '@/components/ProductMangmentCompo/OnSellProduct';
import ProducManageGrid from '@/components/ProductMangmentCompo/ProducManageGrid';
import SoldProduct from '@/components/ProductMangmentCompo/SoldProduct';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
        <div className='h-screen'>
            <SidebarProvider defaultOpen={false}>
                <AppSidebar>
                    <div className='w-full sticky top-0 z-50'>
                        <HomePageNavbar />
                    </div>
                    <div className='p-4'>
                        <div>
                            <ProducManageGrid />
                        </div>
                        <Separator className='my-4' />
                        <div>
                            <h2 className='text-3xl text-center mb-5'>Your Products</h2>
                            <Tabs defaultValue="onsell">
                                <TabsList className='h-fit md:w-1/2 mx-auto'>
                                    <TabsTrigger value="onsell" className='text-xl'>Product on Sell</TabsTrigger>
                                    <TabsTrigger value="sold" className='text-xl'>Sold Product</TabsTrigger>
                                </TabsList>
                                <TabsContent value="onsell" className='mx-auto'>
                                    <OnSellProduct />
                                </TabsContent>
                                <TabsContent value="sold" className='mx-auto'>
                                    <SoldProduct />
                                </TabsContent>
                            </Tabs>
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

export default ProductManagmentPage
