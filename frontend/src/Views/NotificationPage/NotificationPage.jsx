import AppSidebar from '@/components/CommonComponents/AppSidebar/AppSidebar'
import HomePageNavbar from '@/components/HomePageComponents/HomePageNavbar'
import { Card } from '@/components/ui/card'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

function NotificationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar>
          <div className="w-full sticky top-0 z-50">
            <HomePageNavbar />
          </div>
          
          <h1 className='scroll-m-20 text-4xl font-extrabold lg:text-5xl'>Notifications:</h1>

          <div className='m-2'>
            
          </div>
        </AppSidebar>
      </SidebarProvider>
    </div>
  )
}

export default NotificationPage