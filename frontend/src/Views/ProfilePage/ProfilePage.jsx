import React from 'react';
import AppSidebar from '@/components/CommonComponents/AppSidebar/AppSidebar';
import Footer from '@/components/CommonComponents/Footer/Footer';
import HomePageNavbar from '@/components/HomePageComponents/HomePageNavbar';
import ProfileGrid from '@/components/ProfilePageComponents/ProfileGrid';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider } from '@/components/ui/sidebar';
import Request from '@/components/ProfilePageComponents/Request';

const ProfilePage = () => {
    return (
        <div className='h-screen'>
            <SidebarProvider defaultOpen={false}>
                <AppSidebar>
                    <div className='w-full sticky top-0 z-50'>
                        <HomePageNavbar />
                    </div>
                    <div className="p-4">
                        <div>
                            <ProfileGrid />
                        </div>
                        <Separator className='my-4' />

                        <h3 className='text-2xl mb-3 font-bold'>Request</h3>
                        <div className='grid grid-cols-1'>
                            <div className='border p-3'>
                                <Request request="rejected" />
                            </div>
                            <div className='border p-3'>
                                <Request request="accepted" />
                            </div>
                            <div className='border p-3'>
                                <Request request="rejected" />
                            </div>
                            <div className='border p-3'>
                                <Request request="pending" />
                            </div>
                            <div className='border p-3'>
                                <Request request="pending" />
                            </div>
                            <div className='border p-3'>
                                <Request request="accepted" />
                            </div>
                            <div className='border p-3'>
                                <Request request="rejected" />
                            </div>
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

export default ProfilePage
